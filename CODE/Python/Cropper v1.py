from PIL import Image
import os
import re
txt_p = re.compile('.*[.](?=txt$).*$')

PATH_LIST_TXT = []
frame_x = []
#==================================
# Program Setting
WEBP_PATH = "W:/Mod/Repository/repo/script/Data/Gfx2/UI/BattleScreenHUD/tournament_hud/texture0.dx11.webp "
FOLDER_PATH = "W:/Mod/Repository/repo/script/Data/Gfx2/UI/BattleScreenHUD/tournament_hud/"
#==================================

TXT_ALL = os.listdir(FOLDER_PATH)
print(TXT_ALL)

for n in TXT_ALL:
    PATH = FOLDER_PATH + n
    if txt_p.match(PATH):
        PATH_LIST_TXT.append(PATH)

img = Image.open(WEBP_PATH)
print(range(len(PATH_LIST_TXT)))

for num in range(len(PATH_LIST_TXT)):
    txt = open(PATH_LIST_TXT[num], 'r')
    list = txt.readlines()
    txt.close()
    temp_list = list[4:]
    name = os.path.basename(PATH_LIST_TXT[num])
    name = os.path.splitext(name)
    print(name[0])

    for i in range(len(temp_list)):
        data = temp_list[i].split(' ')
        print(data)
        frame_x = data[7].split('frame')
        frame_x = frame_x[1].split('\n')
        frame_x = frame_x[0]

        x_pos = int(data[0])
        y_pos = int(data[1])
        x_leg = int(data[0]) + int(data[2])
        y_len = int(data[1]) + int(data[3])

        print(x_pos, y_pos, x_leg, y_len, frame_x)

        img2 = img.crop((x_pos, y_pos, x_leg, y_len))
        num1 = str(num)
        img2.save(name[0] + frame_x + ".png","png")
