from PIL import Image
import sys, os

# 초기 변수
multi_array = False
tex_num = 0
webp_name = ""
spos_x = 0
spos_y = 0
fpos_x = 0
fpos_y = 0
frame = 0

# 경로
PATH = "T:/git/ETCOM/repo/script/Data/Gfx2/UI"
OUTPUT_PATH = "T:/OUTPUT"

# 파일 카운트
filecount = 0
endfilecount = 0

for (path, dir, files) in os.walk(PATH):
    for filename in files:
        ext = os.path.splitext(filename)[-1]
        if ext == '.txt':
            endfilecount = endfilecount + 1

def progressBar(text, value, endvalue, bar_length=20):
    percent = float(value) / endvalue
    arrow = '=' * int(round(percent * bar_length) - 1) + '>'
    spaces = ' ' * (bar_length - len(arrow))

    sys.stdout.write("\r{0} || ({1} / {2}) [{3}] {4}%".format(text, value, endvalue, arrow + spaces, int(round(percent * 100))))
    sys.stdout.flush()

for (path, dir, files) in os.walk(PATH):
    for filename in files:
        ext = os.path.splitext(filename)[-1]
        if ext == '.txt':
            FULL_PATH = os.path.abspath(path + "/" + filename)
            progressBar(FULL_PATH, filecount, endfilecount)

            Tmp = "T:/OUTPUT/" + path.split("T:/git/ETCOM/repo/script/Data/Gfx2/UI")[-1]

            if not os.path.isdir(Tmp):
                os.makedirs(Tmp)

            txt = open(FULL_PATH, 'r')
            list = txt.readlines()
            txt.close()

            tex_num = int(list[0])

            if tex_num == 1:
                pos_array = list[4:]
                multi_array = False
                webp_name = os.path.splitext(list[1])[0]  # webp 이름
                img1 = Image.open(path + "/" + webp_name + ".mali.webp")
                pos_array = list[4:]

            if tex_num == 2:
                pos_array = list[5:]
                multi_array = True
                webp_name = os.path.splitext(list[1])[0]  # webp 이름
                img1 = Image.open(path + "/" + webp_name + ".mali.webp")
                webp_name_1 = os.path.splitext(list[2])[0]  # webp 이름
                img2 = Image.open(path + "/" + webp_name_1 + ".mali.webp")
                pos_array = list[5:]

            for i in range(len(pos_array)):
                data = pos_array[i].split(' ')
                x_pos = int(data[0])
                y_pos = int(data[1])
                x_len = int(data[0]) + int(data[2])
                y_len = int(data[1]) + int(data[3])

                name = os.path.basename(FULL_PATH)

                img1 = img1.crop((x_pos, y_pos, x_len, y_len))
                img1.save(Tmp + "/" + name + str(i) + ".png", "png")

                if multi_array:
                    x_pos = int(data[0])
                    y_pos = int(data[1])
                    x_len = int(data[0]) + int(data[2])
                    y_len = int(data[1]) + int(data[3])

                    name = os.path.basename(FULL_PATH)

                    img2 = img2.crop((x_pos, y_pos, x_len, y_len))
                    img2.save(Tmp + "/" + name + str(i) + ".png")

            filecount = filecount + 1