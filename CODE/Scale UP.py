import subprocess
import os, sys

# 경로
PATH = "T:/git/CODE/SKIN/Camouflages"
OUTPUT_PATH = "T:/OUTPUT/"
# 파일 카운트
filecount = 0
endfilecount = 0

for (path, dir, files) in os.walk(PATH):
    for filename in files:
        ext = os.path.splitext(filename)[-1]
        if ext == '.png':
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
        print(ext)
        if ext == '.png':
            print("%s/%s" % (path, filename))
            Tmp = path.split("T:/git/CODE/SKIN/")[-1]
            if not os.path.isdir("T:/OUTPUT/" + Tmp):
                os.makedirs("T:/OUTPUT/" + Tmp)

            progressBar(filecount, endfilecount)
            subprocess.call("T:/git/Util/Img-Scaling/waifu2x-caffe-cui.exe -p cpu -m scale -i " + path + "/" + filename + " --scale_ratio 2.0 -n 0 -o " + OUTPUT_PATH + Tmp + "/" + os.path.splitext(filename)[0] + ".png")
            filecount = filecount + 1