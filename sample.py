import argparse
import copy
import curses
import random
import time
from curses import wrapper

parser = argparse.ArgumentParser(description="CLI Minesweeper written in Python3")
parser.version = "1.0 [beta]"
parser.add_argument("-v", "--version", action="version")
parser.add_argument(
    "-r", metavar="rows", type=int, help="Number of rows in the grid [Defaults to 10]"
)
parser.add_argument(
    "-c",
    metavar="colums",
    type=int,
    help="Number of columns in the grid [Defaults to 10]",
)
parser.add_argument(
    "-m",
    metavar="mines",
    type=int,
    help="Total number of mines [Defaults to 10]. If you set an abnormal value, the program will try to normalise the number of mines on its own.",
)
args = parser.parse_args()
rows = args.r if args.r else 10
cols = args.c if args.c else 10
total_mines = args.m if args.m else 10
## normalize number of mines
total_mines = total_mines if total_mines <= rows * cols - 3 else rows * cols - 8


def get_neighbor_coords(board_, cell_x, cell_y):
    """
    Takes  in x, y format
    Returns in x, y format
    """
    rows_, cols_ = len(board_), len(board_[0])
    coords = []
    for i in range(-1, 2):
        for j in range(-1, 2):
            if i == j == 0:
                continue
            if (0 <= cell_y + i < rows_) and (0 <= cell_x + j < cols_):
                coords.append((cell_x + j, cell_y + i))
    return coords


def generate_board(
    rows_, cols_, total_mines_, starting_cell_x_, starting_cell_y_
) -> list:

    ## initialize empty board
    board_ = []
    for y_ in range(rows_):
        _ = []
        for x_ in range(cols_):
            _.append(" ")
        board_.append(_)

    available_cells_for_mines = []
    for y_ in range(rows_):
        for x_ in range(cols_):
            available_cells_for_mines.append((x_, y_))

    ## we want the starting cell to be always safe
    available_cells_for_mines.remove((starting_cell_x_, starting_cell_y_))
    for coord_ in get_neighbor_coords(board_, starting_cell_x_, starting_cell_y_):
        available_cells_for_mines.remove(coord_)

    ## place mines
    for _ in range(total_mines_):
        mine_coord = random.choice(available_cells_for_mines)
        board_[mine_coord[1]][mine_coord[0]] = "*"
        available_cells_for_mines.remove(mine_coord)
    for y_ in range(rows_):
        for x_ in range(cols_):
            if board_[y_][x_] == "*":
                continue
            mine_count = 0
            for coord_ in get_neighbor_coords(board_, x_, y_):
                if board_[coord_[1]][coord_[0]] == "*":
                    mine_count += 1
            board_[y_][x_] = mine_count

    return board_

cells_to_be_revealed = []

def floodfill(board_, x_, y_):
    ## generic floodfill algoritm - recurisively nukes cells with neighbors having zero mines
    for coord_ in get_neighbor_coords(board_, x_, y_):
        if board_[coord_[1]][coord_[0]] == 0:
            if coord_ not in cells_to_be_revealed:
                cells_to_be_revealed.append(coord_)
                floodfill(board_, coord_[0], coord_[1])
        if coord_ not in cells_to_be_revealed:
            cells_to_be_revealed.append(coord_)


def main(stdscr):
    curses.use_default_colors()
    ## initialize 256 colors
    for i in range(255):
        curses.init_pair(i+1, i, -1)    # pair_number, fg, bg
    
    stdscr.addstr(1, 0, r"█▀▄▀█ █ █▄░█ █▀▀ █▀ █░█░█ █▀▀ █▀▀ █▀█ █▀▀ █▀█")
    stdscr.addstr(2, 0, r"█░▀░█ █ █░▀█ ██▄ ▄█ ▀▄▀▄▀ ██▄ ██▄ █▀▀ ██▄ █▀▄")
    stdscr.refresh()

    def reveal(window, board_, j_, i_):
        if str(board_[j_][i_]) == "*":
            window.addch(j_, i_ * 4, "*", curses.color_pair(178))
        elif board_[j_][i_] == 0:
            window.addch(j_, i_ * 4, " ")
        elif board_[j_][i_] == 1:
            window.addch(j_, i_ * 4, "1", curses.color_pair(46))
        elif board_[j_][i_] == 2:
            window.addch(j_, i_ * 4, "2", curses.color_pair(47))
        elif board_[j_][i_] == 3:
            window.addch(j_, i_ * 4, "3", curses.color_pair(215))
        else:
            window.addch(j_, i_ * 4, "4", curses.color_pair(198))
        window.refresh()

    ## UNCOMMENT THS IF YOU'RE ON LINUX.. IT WORKS EVEN BETTER THAT WAY
    ## yeah, idc about the extra space that's being wasted
    # game_win = curses.newwin(2000, 2000, 5, 1)

    ## This restriction on screen size is mainly for windows, (sucks, yeah)
    game_win = curses.newwin(stdscr.getmaxyx()[0]-10, stdscr.getmaxyx()[1]-10, 6, 1)

    game_win.addstr(3, cols*4+4, "    W      │         UP        ")
    game_win.addstr(4, cols*4+4, " A   S   D │  LEFT  DOWN  RIGHT")
    game_win.addstr(5, cols*4+4, "           │                   ")
    game_win.addstr(6, cols*4+4, "   SPACE   │        MINE       ")
    game_win.addstr(7, cols*4+4, "           │                   ")
    game_win.addstr(8, cols*4+4, "     F     │    FLAG / UNFLAG  ")

    for y_ in range(rows):
        delta_x = 0
        for x_ in range(cols):
            game_win.addch(y_, x_ + delta_x, "•", curses.A_BOLD)
            game_win.refresh()
            delta_x += 3

    DED = False
    STARTED = False
    board_cache = []
    flag_board = []
    flag_counter = total_mines
    game_win.addstr(0, cols*4+4, f"▲ x {flag_counter}".center(31), curses.color_pair(209))
    game_win.move(0, 0)  ## reset cursor position

    while not DED:
        curses.noecho()
        curses.curs_set(1)
        game_win.nodelay(True)
        current_y, current_x = game_win.getyx()
        key_pressed = game_win.getch()

        try:
            if key_pressed in (ord("Q"), ord("q")):
                return
            elif key_pressed in (ord("W"), ord("w")):
                game_win.move(current_y - 1, current_x)
            elif key_pressed in (ord("A"), ord("a")):
                game_win.move(current_y, current_x - 4)
            elif key_pressed in (ord("S"), ord("s")) and current_y < rows - 1:
                game_win.move(current_y + 1, current_x)
            elif key_pressed in (ord("D"), ord("d")) and current_x < cols * 4 - 4:
                game_win.move(current_y, current_x + 4)

            elif key_pressed in (ord("F"), ord("f")):
                # for now, add the flag only on cells that haven't been revealed, and that too if the game has started
                if STARTED:
                    y_, x_ = game_win.getyx()
                    try:
                        _cell_ = board_cache[y_][x_ // 4]
                    except IndexError:
                        pass
                    
                    # do shit only when the cell isn't revealed
                    if _cell_ != "#":
                        if flag_board[y_][x_ // 4] != "F":  # if cell isn't already flagged
                            game_win.addch(y_, x_, "▲", curses.color_pair(198))
                            flag_board[y_][x_//4] = "F"
                            flag_counter -= 1

                        else: # if cell is already flagged, un-flippin-flag it
                            game_win.addch(y_, x_, "•")
                            flag_board[y_][x_//4] = "U" # should work.. right?
                            flag_counter += 1
                        
                        game_win.addstr(0, cols*4+4, f"▲ x {flag_counter}".center(31), curses.color_pair(209))
                        game_win.move(y_, x_) # reset cursor position
                
            
            ## key pressed is a space, essentially the whole gameplay takes there
            elif key_pressed == ord(" "):
                y_, x_ = game_win.getyx()
                if not STARTED:
                    ## generate the board only once - when the game starts, that is
                    board = generate_board(rows, cols, total_mines, x_ // 4, y_)
                    board_cache = copy.deepcopy(board)
                    flag_board = copy.deepcopy(board)
                    STARTED = True
                    START_TIME = time.perf_counter()

                try:
                    _cell_ = board[y_][x_ // 4]
                except IndexError:
                    pass

                if _cell_ == 0:
                    reveal(game_win, board, y_, x_ // 4)
                    board_cache[y_][x_ // 4] = "#"
                    floodfill(board, x_ // 4, y_)
                    for i in range(cols):
                        for j in range(rows):
                            if (i, j) in cells_to_be_revealed:
                                reveal(game_win, board, j, i)
                                board_cache[j][i] = "#"

                elif _cell_ == "*" and flag_board[y_][x_ // 4] != "F":  ## revealed cell is a mine and HASN'T been flagged
                    for i in range(cols):
                        for j in range(rows):
                            reveal(game_win, board, j, i)
                    game_win.nodelay(False)

                    game_win.addstr(rows + 2, 0, "U is DED xD", curses.color_pair(198))
                    game_win.addstr(10, cols * 4 + 4, f"Time elapsed: {round(time.perf_counter()-START_TIME)}s".center(31), curses.color_pair(178))
                    game_win.addstr(rows + 3, 0, "Press any key to continue...", curses.A_BOLD)
                    game_win.refresh()
                    game_win.getch()
                    DED = True

                elif str(_cell_).isdigit():  ## revealed cell is a number
                    reveal(game_win, board, y_, x_ // 4)
                    board_cache[y_][x_ // 4] = "#"
                game_win.move(y_, x_)

                ## check if player has won already
                cells_revealed = 0
                for i in range(cols):
                    for j in range(rows):
                        if board_cache[j][i] == "#":
                            cells_revealed += 1

                if cells_revealed == rows * cols - total_mines:
                    for i in range(cols):
                        for j in range(rows):
                            reveal(game_win, board, j, i)
                    game_win.nodelay(False)
                    game_win.addstr(rows + 2, 0, "You won!!", curses.color_pair(47))
                    game_win.addstr(10, cols * 4 + 4, f"Time elapsed: {round(time.perf_counter()-START_TIME)}s".center(31), curses.color_pair(178))
                    game_win.addstr(rows + 3, 0, "Press any key to continue...", curses.A_BOLD)
                    game_win.refresh()
                    game_win.getch()
                    DED = True

        except (curses.error, ValueError):
            pass


wrapper(main)
