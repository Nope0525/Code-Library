import subprocess
import os, sys

# 경로
PATH = "D:/SteamLibrary/steamapps/common/World of Tanks Blitz/Data/3d/Tanks"
OUTPUT_PATH = "D:/Repository/NOPE"
# 파일 카운트
filecount = 0
endfilecount = 0

for (path, dir, files) in os.walk(PATH):
    for filename in files:
        ext = os.path.splitext(filename)[-1]
        if ext == '.dds':
            endfilecount = endfilecount + 1

def progressBar(value, endvalue, bar_length=20):
    percent = float(value) / endvalue
    arrow = '=' * int(round(percent * bar_length) - 1) + '>'
    spaces = ' ' * (bar_length - len(arrow))

    sys.stdout.write("\r({0} / {1}) [{2}] {3}%".format(value, endvalue, arrow + spaces, int(round(percent * 100))))
    sys.stdout.flush()

for (path, dir, files) in os.walk(PATH):
    for filename in files:
        ext = os.path.splitext(filename)[-1]
        if ext == '.dds':
            print("%s/%s" % (path, filename))
            Tmp = path.split("D:/SteamLibrary/steamapps/common/World of Tanks Blitz/Data/3d/Tanks/")[-1]
            if not os.path.isdir(Tmp):
                os.makedirs(Tmp)

            progressBar(filecount, endfilecount)
            subprocess.call("D:/Repository/NOPE-Library/CODE/Python/PVRTexToolCLI.exe " + "-f r8g8b8 -i " + path + "/" + filename + " -d " + OUTPUT_PATH + Tmp + "/" + os.path.splitext(filename)[0] + ".png")
            subprocess.call("D:/Repository/NOPE-Library/CODE/Python/waifu2x-caffe/waifu2x-caffe-cui.exe -p cpu -m scale -i " + OUTPUT_PATH + Tmp + "/" + os.path.splitext(filename)[0] + ".png" + " --scale_ratio 2.0 -n 0 -o " + OUTPUT_PATH + Tmp + "/" + os.path.splitext(filename)[0] + ".png")
            filecount = filecount + 1