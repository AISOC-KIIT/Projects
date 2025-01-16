# import curses

# def main(stdscr):
#     # curses.start_color()
#     curses.use_default_colors()
#     for i in range(256):
#         curses.init_pair(i, i, -1)
#     # try:
#     #     for i in range(0, 255):
#     #         stdscr.addstr(f"{i} ", curses.color_pair(i))
#     # except curses.error:
#     #     # End of screen reached
#     #     pass

#     for i in range(256):
#         stdscr.addstr(f"{i} ", curses.color_pair(i))

#     stdscr.getch()

# curses.wrapper(main)

# # print(curses.COLORS)


import curses

def main(stdscr):
    # curses.start_color()
    curses.use_default_colors()
    for i in range(255):
        curses.init_pair(i+1, i, -1)
    # try:
    #     for i in range(0, 255):
    #         stdscr.addstr(f"{i} ", curses.color_pair(i))
    # except curses.error:
    #     # End of screen reached
    #     pass

    for i in range(256):
        stdscr.addstr(f"{i} ", curses.color_pair(i))
    # stdscr.addstr("0", curses.color_pair(0))
    stdscr.getch()
    

curses.wrapper(main)

# print(curses.COLORS)