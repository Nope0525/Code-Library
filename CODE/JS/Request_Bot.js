var list = []
function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    var Data = msg.split(" --");

    if (Data[0] == "n!리퀘스트" && room == "일러스트 공유방") {
    list.push(sender+"\n"+Data[1]+"\n"+Data[2]+"\n"+Data[3]+"\n");
    File.save("/storage/emulated/0/"+"Ani"+Data[1],sender+"`"+Data[1]+"`"+Data[2]+"`"+Data[3]);
    replier.reply("=리퀘스트 신청 완료!=\n신청인 - "+sender+"\n애니제목(출연작) - "+Data[1]+"\n풀네임 - "+Data[2]+"\n일본어네임 - "+Data[3]);
    }

    if (Data[0] == "n!리퀘스트리스트" && room == "일러스트 공유방") {
    if (list.length == 0) {
    replier.reply("없어! 퉤"); 
    } else {
    replier.reply(list);
        }
    }

    if (Data[0] == "n!리퀘스트삭제" && room == "일러스트 공유방") {
        if (File.read("/storage/emulated/0/"+"Ani"+Data[1]).split("`")[0] == sender && Data[1] == File.read("/storage/emulated/0/"+"Ani"+Data[1]).split("`")[1] && Data[2] == File.read("/storage/emulated/0/"+"Ani"+Data[1]).split("`")[2]) {
        list.splice(list.indexOf(Data[1]),3);
        File.remove("/storage/emulated/0/"+"Ani"+Data[1]);
        replier.reply("=리퀘스트삭제완료=");
        } else {
    replier.reply("퉤");
        }
    }
}