[https://virtual-cube.net/](https://virtual-cube.net/)

<h1>Introducing ... virtual-cube.net!</h1>

<img width=50% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/415f8b2e-8ff3-48da-a485-73869e375c84">
<img width=50% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/91d85959-64df-4d0b-82d2-220dd6c61596">

virtual-cube.net is a passion project of mine that allows you to learn and practice your cubing skills virtually. I used [Antoine Gaubert’s cube](https://github.com/angauber/p5-js-rubik-s-cube) for the basic animation, but coded my own mouse and keyboard movements to support many features it doesn’t have. You can choose cubes of a variety of shapes: the traditional 2x2 and 3x3, as well as other cubes like the Sandwich Cube and bandaged cubes. You can use the Auto-Solver to solve any positions, input and test other algorithms, set turning/scrambling restrictions to challenge yourself, and analyze your own solve. It can also scan your physical 3x3 and transpose its position to the virtual cube.

<h1>Base features</h1>

<img width=50% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/99048330-a74c-477f-9c61-b66abe8959f0">

You can input an algorithm into the algorithm bar and the cube will perform it.
The Auto-Solve feature is my best attempt and making the cube solve using the CFOP method. You can adjust the turn speed to make it solve faster or slower.
There are undo and redo buttons in case you misturn.

<h1>Turning</h1>

<img width=20% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/628e787e-da03-458c-8e5e-478b9cd4554a">


The keyboard and button turning works with any cube. You can select between the default keyboard (which has the CS Timer keybinding) and a more beginner-friendly alternative keyboard. 
The mouse turning works on any non-shape/color mod.
For keyboard turning, you can give yourself restrictions, such as double turns only or making the cube turn like a 3x3x2. You can give yourself similar restrictions with the scrambling, such as making it only scramble the last layer.
Press Settings to see all the keyboard hotkeys.

<h1>Custom Bandage/Shape Mod</h1>
<div>
<img width=50% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/7bb6dead-0470-41ab-a8b1-d4af284cd516">
<p><i>Custom shape and color</i></p>
<img width=50% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/1d9727e0-a334-4d35-b3a6-73ead08091b4">
<p><i>Selecting cuby to bandage</i></p>
<img width=50% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/0610b1c8-b72a-488c-ac97-6c561c87dc17">
<p><i>Completed bandaging</i></p>
</div>




For the custom shape, you can adjust the color of a side and the appearance of a cuby.
For the custom bandaging, you can even create bandage cubies that usually cannot be physically bandaged. For example, you can bandage 2 corners together.

<h1>Stats Mode</h1>

<img width=15% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/ed34ec53-4d26-49bc-abbc-d55db600c781">

See, analyze, and delete your times.

<h1>Speed Mode</h1>

You are given 4 challenges, and your time is the sum of the times it takes to complete the 4 challenges. This is a good way to practice OLL/PLL.
Bot Racing: Race against the Auto-Solver with your own physical cube! You can adjust how fast the Auto-Solver solves, and it simulates a race.

<h1>Fewest Moves Challenge</h1>

Given a short scramble, you must figure out an efficient way to solve it.

<h1>Position ID</h1>

<img width=50% alt="image" src="https://github.com/JadenLeung/rubiks/assets/94010935/2269c74e-9593-490e-95ff-2274608f1313">


Every valid position is marked with an text-based ID. You can copy the ID and save it somewhere in case you want to get back the same position.
Use the ID generator to generate an ID for your **real cube**. The program will use the webcam to calibrate the colors and then take a picture of all the faces to generate it. If the camera incorrectly detected a color, you can press the detected color to manually adjust it.

<h1>Solve your physical cube</h1>

Use the ID generator to generate the corresponding position in the virtual cube and follow the Auto-Solver’s steps. You might want to add a bit of delay to make it easy to follow.

I made this cube because I wanted to an easy way to practice cubing online. Hope you find this fun/useful!

<h1>Login System</h1>

<img width="315" alt="image" src="https://github.com/user-attachments/assets/93f4377d-81b5-4754-a2ca-f76daef94a4a">

Log in to save your settings and high-score data! Passwords are encrypted using CryptoJS.




