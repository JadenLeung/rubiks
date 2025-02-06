

export function getMove(MAXX, CUBYESIZE, SIZE) {
    const midarr = SIZE % 2 == 1 ? [0] : [-CUBYESIZE / 2, CUBYESIZE / 2];
	const midwide = SIZE % 2 == 1 ? [-CUBYESIZE, 0, CUBYESIZE] : [-CUBYESIZE / 2, CUBYESIZE / 2];
    const moveMap = {
        "D'":  ['x', [MAXX], -1],
        "D":   ['x', [MAXX],  1],
        "U":   ['x', [-MAXX], -1],
        "U'":  ['x', [-MAXX],  1],
        "F":   ['y', [MAXX], -1],
        "F'":  ['y', [MAXX],  1],
        "B'":  ['y', [-MAXX], -1],
        "B":   ['y', [-MAXX],  1],
        "R'":  ['z', [MAXX], -1],
        "R":   ['z', [MAXX],  1],
        "L":   ['z', [-MAXX], -1],
        "L'":  ['z', [-MAXX],  1],
        "d'":  ['x', [MAXX - CUBYESIZE], -1],
        "d":   ['x', [MAXX - CUBYESIZE],  1],
        "u":   ['x', [CUBYESIZE - MAXX], -1],
        "u'":  ['x', [CUBYESIZE - MAXX],  1],
        "f":   ['y', [MAXX - CUBYESIZE], -1],
        "f'":  ['y', [MAXX - CUBYESIZE],  1],
        "b'":  ['y', [CUBYESIZE - MAXX], -1],
        "b":   ['y', [CUBYESIZE - MAXX],  1],
        "r'":  ['z', [MAXX - CUBYESIZE], -1],
        "r":   ['z', [MAXX - CUBYESIZE],  1],
        "l":   ['z', [CUBYESIZE - MAXX], -1],
        "l'":  ['z', [CUBYESIZE - MAXX],  1],
        "M'":  ['z', midarr,  1],
        "M":   ['z', midarr, -1],
        "E":   ['x', midarr,  1],
        "E'":  ['x', midarr, -1],
        "S":   ['y', midarr, -1],
        "S'":  ['y', midarr,  1],
        "Lw":  ['z', [-MAXX, CUBYESIZE - MAXX], -1],
        "Lw'": ['z', [-MAXX, CUBYESIZE - MAXX],  1],
        "Rw'": ['z', [MAXX, MAXX - CUBYESIZE], -1],
        "Rw":  ['z', [MAXX, MAXX - CUBYESIZE],  1],
        "Fw":  ['y', [MAXX, MAXX - CUBYESIZE], -1],
        "Fw'": ['y', [MAXX, MAXX - CUBYESIZE],  1],
        "Bw'": ['y', [-MAXX, CUBYESIZE - MAXX], -1],
        "Bw":  ['y', [-MAXX, CUBYESIZE - MAXX],  1],
        "Uw":  ['x', [-MAXX, CUBYESIZE - MAXX], -1],
        "Uw'": ['x', [-MAXX, CUBYESIZE - MAXX],  1],
        "Dw'": ['x', [MAXX, MAXX - CUBYESIZE], -1],
        "Dw":  ['x', [MAXX, MAXX - CUBYESIZE],  1],
        "Mw'":  ['z', midwide,  1],
        "Mw":   ['z', midwide, -1],
        "Ew":   ['x', midwide,  1],
        "Ew'":  ['x', midwide, -1],
        "Sw":   ['y', midwide, -1],
        "Sw'":  ['y', midwide,  1]
    };
    return moveMap;
}

