import os
import time
import sys
import pyautogui

seconds = 5
pyautogui.click(pyautogui.size()[0]/2, pyautogui.size()[-1]/2)
for i in range(seconds, 0, -1):
    os.system('clear')
    print(f'starting in {i} seconds.')
    sys.stdout.flush()
    time.sleep(1)

texts = sys.argv[-1]
for text in texts:
    print(text, end='')
    pyautogui.press(text, pause=0.01)
    sys.stdout.flush()
exit()