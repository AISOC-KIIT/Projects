# MINESWEEPER-CLI
The classic Minesweeper, written in **Python3**, designed for the command line.
<p align="center">
	<img src="assets/output.gif" />
</p>

## Dependencies
The project only depends on the `curses` library, which should be installed by default on almost all Linux distros.</br>
>Winbl*ws users can go cry inside a hole.</br>
*-Sun Tzu, Art Of War*

## Installation
Simply clone the repository, cd into it and run `minesweeper.py`
```sh
git clone https://github.com/DarkKnight450/minesweeper.git
cd minesweeper
python minesweeper.py
```

## Usage
```
usage: minesweeper.py [-h] [-v] [-r rows] [-c colums] [-m mines]

CLI Minesweeper written in Python3

options:
  -h, --help     show this help message and exit
  -v, --version  show program's version number and exit
  -r rows        Number of rows in the grid [Defaults to 10]
  -c colums      Number of columns in the grid [Defaults to 10]
  -m mines       Total number of mines [Defaults to 10].
                 If you set an abnormal value, the program 
                 will try to normalise the number of mines on its own.
```

## What next?
If you have suggestions, feel free to [open an issue](https://github.com/DarkKnight450/Minesweeper/issues) or [create a pr](https://github.com/DarkKnight450/Minesweeper/pulls).</br>
Feel free to contact me for further discussions at DarkKnight450@protonmail.com</br>

**PS:**</br>
Winbl*ws users can simply do the following to get the dependencies installed...
```sh
py -m pip install windows-curses
```
Lmao
