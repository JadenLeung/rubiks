// BFS to find largest connected component size (4-neighbor) in a layer
function largestComponentSize(occupiedSet) {
    const seen = new Set();
    let best = 0;
    for (const key of occupiedSet) {
        if (seen.has(key)) continue;
        // start BFS
        const [sx, sy] = key.split(",").map(Number);
        const q = [[sx, sy]];
        seen.add(key);
        let size = 0;
        while (q.length) {
            const [x, y] = q.shift();
            size++;
            const neighbors = [
                (x+1) + "," + y,
                (x-1) + "," + y,
                x + "," + (y+1),
                x + "," + (y-1)
            ];
            for (const n of neighbors) {
                if (occupiedSet.has(n) && !seen.has(n)) {
                    seen.add(n);
                    const [nx, ny] = n.split(",").map(Number);
                    q.push([nx, ny]);
                }
            }
        }
        best = Math.max(best, size);
    }
    return best;
}

/*
 Revised buildGridFromDir:
 - collects occupied integer indices per layer as before
 - computes which global row indices (ix) and column indices (iy) are completely empty across all layers
 - compresses indices by removing those empty rows/cols (re-indexing everything)
 - returns layers with compressed ix/iy keys so bbox calculations ignore empty rows/cols
*/
function buildGridFromDir(dir, getCubyFromPos, MAXX, CUBYESIZE) {
    const layers = []; // each: { layerPos, occupied: Set("ix,iy"), rawIndices: Set of original indices, count, layerIndex }
    const coords = [];
    for (let a = -MAXX; a <= MAXX; a += CUBYESIZE) coords.push(a);
    const minCoord = Math.min(...coords);

    // We'll collect all raw ix/iy that appear anywhere
    const globalRows = new Set();
    const globalCols = new Set();

    for (let a = -MAXX; a <= MAXX; a += CUBYESIZE) {
        const occupied = new Set();
        let count = 0;
        for (let b = -MAXX; b <= MAXX; b += CUBYESIZE) {
            for (let c = -MAXX; c <= MAXX; c += CUBYESIZE) {
                let cuby;
                if (dir === "x") cuby = getCubyFromPos(a, b, c);
                if (dir === "y") cuby = getCubyFromPos(c, a, b);
                if (dir === "z") cuby = getCubyFromPos(b, c, a);

                if (cuby !== -1) {
                    const rawIx = Math.round((b - minCoord) / CUBYESIZE);
                    const rawIy = Math.round((c - minCoord) / CUBYESIZE);
                    occupied.add(rawIx + "," + rawIy);
                    globalRows.add(rawIx);
                    globalCols.add(rawIy);
                    count++;
                }
            }
        }
        if (count > 0) {
            layers.push({
                layerPos: a,
                occupied,   // raw index keys
                count
            });
        }
    }

    // If no layers with cubes, return empty
    if (layers.length === 0) return { layers: [] };

    // Build sorted arrays of global rows/cols that have at least one cubie anywhere
    const rowsArr = Array.from(globalRows).sort((a,b) => a-b);
    const colsArr = Array.from(globalCols).sort((a,b) => a-b);

    // Build maps from raw index -> compressed index (0..n-1)
    const rowMap = new Map();
    const colMap = new Map();
    rowsArr.forEach((r, i) => rowMap.set(r, i));
    colsArr.forEach((c, i) => colMap.set(c, i));

    // Now create compressed layers with min/max computed using compressed indices
    const compressedLayers = layers.map(L => {
        const compressedSet = new Set();
        let minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;
        for (const key of L.occupied) {
            const [rawx, rawy] = key.split(",").map(Number);
            // If row/col wasn't present globally (shouldn't happen) skip
            if (!rowMap.has(rawx) || !colMap.has(rawy)) continue;
            const cx = rowMap.get(rawx);
            const cy = colMap.get(rawy);
            compressedSet.add(cx + "," + cy);
            minx = Math.min(minx, cx);
            maxx = Math.max(maxx, cx);
            miny = Math.min(miny, cy);
            maxy = Math.max(maxy, cy);
        }
        return {
            layerPos: L.layerPos,
            occupied: compressedSet,
            count: L.count,
            minx: isFinite(minx) ? minx : 0,
            maxx: isFinite(maxx) ? maxx : 0,
            miny: isFinite(miny) ? miny : 0,
            maxy: isFinite(maxy) ? maxy : 0
        };
    });

    return {
        layers: compressedLayers,
        gridShape: { rows: rowsArr.length, cols: colsArr.length }
    };
}

/*
 computePrismScore:
 returns { score, components: { x:{score, details}, y:..., z:... } }

 This version uses the revised buildGridFromDir which ignores globally empty rows/cols,
 so intermediate empty columns/rows will not inflate bbox areas.
*/
export function computeCubeScore(getCubyFromPos, MAXX, CUBYESIZE) {
    const ALPHA = 0.6; // hole / fill penalty weight
    const BETA  = 0.3; // disconnectedness penalty weight
    const GAMMA = 0.1; // centroid shift penalty weight

    function scoreForDir(dir) {
        const res = buildGridFromDir(dir, getCubyFromPos, MAXX, CUBYESIZE);
        const layers = res.layers;
        if (!layers || layers.length === 0) return { score: 0, details: null };

        // compute bounding-box area per layer & connectivity
        let weightedSum = 0;
        let weightTotal = 0;
        const centroids = [];
        const layerDetails = [];

        // Find max bbox area for normalization, but now bbox is based on compressed indices
        let maxBBoxArea = 1;
        for (const L of layers) {
            const w = L.maxx - L.minx + 1;
            const h = L.maxy - L.miny + 1;
            const area = Math.max(1, w * h);
            maxBBoxArea = Math.max(maxBBoxArea, area);
        }

        for (const L of layers) {
            const w = L.maxx - L.minx + 1;
            const h = L.maxy - L.miny + 1;
            const bboxArea = Math.max(1, w * h);
            const occupied = L.occupied;
            const occCount = L.count;

            // fill ratio (how many cells in bbox are occupied)
            const fillRatio = occCount / bboxArea;

            // largest connected component / occCount (1=all connected)
            const largest = largestComponentSize(occupied);
            const compRatio = occCount > 0 ? (largest / occCount) : 1;

            // centroid (in compressed grid indices)
            let sumx = 0, sumy = 0;
            for (const k of occupied) {
                const [ix, iy] = k.split(",").map(Number);
                sumx += ix; sumy += iy;
            }
            const cx = sumx / occCount;
            const cy = sumy / occCount;
            centroids.push([cx, cy]);

            const holePenalty = 1 - fillRatio;            // 0 when perfect fill
            const disconnectPenalty = 1 - compRatio;      // 0 when single component

            // weight layers by bboxArea so bigger compact layers matter more
            const layerWeight = bboxArea;
            weightedSum += layerWeight * (ALPHA * holePenalty + BETA * disconnectPenalty);
            weightTotal += layerWeight;

            layerDetails.push({
                layerPos: L.layerPos,
                occCount,
                bboxArea,
                fillRatio,
                compRatio,
                holePenalty,
                disconnectPenalty
            });
        }

        // centroid shift penalty (normalized by sqrt(maxBBoxArea))
        let cxMean = 0, cyMean = 0;
        for (const c of centroids) { cxMean += c[0]; cyMean += c[1]; }
        cxMean /= centroids.length; cyMean /= centroids.length;
        let varSum = 0;
        for (const c of centroids) {
            const dx = c[0] - cxMean;
            const dy = c[1] - cyMean;
            varSum += dx*dx + dy*dy;
        }
        const centroidStd = Math.sqrt(varSum / centroids.length);
        const centroidPenalty = Math.min(1, centroidStd / Math.sqrt(maxBBoxArea) );

        const layerPenalty = weightTotal > 0 ? (weightedSum / weightTotal) : 0;
        const combined = Math.min(1, layerPenalty + GAMMA * centroidPenalty);

        return {
            score: combined,
            details: {
                layerCount: layers.length,
                avgLayerPenalty: layerPenalty,
                centroidPenalty,
                layerDetails,
                gridShape: res.gridShape
            }
        };
    }

    const rx = scoreForDir("x");
    const ry = scoreForDir("y");
    const rz = scoreForDir("z");

    const final = (rx.score + ry.score + rz.score) / 3;
    return {
        score: final,
        adjustedScore: closenessToScore(final),
    };
}


function closenessToScore(value) {
    const maxDistance = 0.3;
    if (value >= maxDistance) return 0;
    if (value < 0) return 100; 

    // This is the normalized "distance" (0 to 1)
    const distance_t = value / maxDistance; 
    
    // This is the normalized "closeness" (1 to 0)
    // We apply the curve to the distance, then subtract from 1
    const t = 1 - distance_t * distance_t; 

    return Math.round(t * 100);
}
