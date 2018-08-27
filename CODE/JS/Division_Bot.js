var partylist = [];
var partymember = [];
var partynum = [];
var ary = [];
var num = 0
function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  if (room == "TEST0525") { 
    var Data = msg.split("//");
    replier.reply("asd"+ImageDB.getImage());
    

// n!파티 -c //파티이름//파티시작시간//파티설명
    if (Data[0] == "n!파티 --create ") { Data[0] = "n!파티 -c "; } // 명령 수정

    if (Data[0] == "n!파티 -c " && Data[1] != null && Data[2]  != null && Data[3] != null) {
      if (partylist.indexOf(Data[1]) != -1) {
        replier.reply("==파티생성실패==\n이미 있는 파티입니다!");
      } else {
        partynum[Data[1]] = [];
        partymember[Data[1]] = [];
        num++;
        partynum[Data[1]].push(num);
        partylist.push(Data[1],Data[2],Data[3]);
        partymember[Data[1]].push(sender);
        ary.push("파티제목 - "+Data[1],"파티시작시간 - "+Data[2],"파티장 - "+sender+"\n");
        replier.reply("==파티생성완료==\n파티제목 - " + Data[1] + "\n파티시작시간 - " + Data[2] + "\n파티설명 - " + Data[3]);
      }
    } else {
        if (Data[0] == "n!파티 -c ") {
        replier.reply("==파티생성실패==\n정확하게 입력되지 않았습니다!");
        }
    }

// n!파티 -j //파티이름
    if (Data[0] == "n!파티 --join ") { Data[0] = "n!파티 -j "; } // 명령 수정

    if (Data[0] == "n!파티 -j " && Data[1] != null) {
      if (partylist.indexOf(Data[1]) == -1) {
        replier.reply("==파티참가실패==\n없는 파티 입니다!");
      } else {
        if (partymember[Data[1]].indexOf(sender) == -1) {
          if (partynum[Data[1]].indexOf(5) == -1) {
            T = [partylist[partylist.indexOf(Data[1])],partylist[partylist.indexOf(Data[1])+1],partylist[partylist.indexOf(Data[1])+2]]
            num++;
            partynum[Data[1]].push(num);
            partymember[Data[1]].push(sender);
            replier.reply("==파티참가완료==\n파티제목 - " + T[0] + "\n파티시작시간 - " + T[1] + "\n파티설명 - " + T[2] + "\n==============\n1. " + partymember[Data[1]][0] + "\n2. " + partymember[Data[1]][1] + "\n3. " +  partymember[Data[1]][2] + "\n4. " +  partymember[Data[1]][3] + "\n5. " +  partymember[Data[1]][4]);
          } else {
          replier.reply("==파티참가실패==\n파티가 다 찼습니다!!");
          } 
        } else {
            replier.reply("==파티참가실패==\n중복됩니다!!");
        }
      }
    } else {
      if (Data[0] == "n!파티 -j ") {
        replier.reply("==파티참가실패==\n정확하게 입력되지 않았습니다!");
      }      
    }
// n!파티 -l(--list)
    if (Data[0] == "n!파티 --list ") { Data[0] = "n!파티 -l "; } // 명령 수정
    
    if (Data[0] == "n!파티 -l") {
      if (partylist.length == 0) {
        replier.reply("==파티가 없습니다==");
      } else {
        replier.reply("==파티리스트==\n"+ary.join("\n"));
      }
    }
    
// n!파티 -x(--extend) //파티제목
    if (Data[0] == "n!파티 --extend ") { Data[0] = "n!파티 -x "; } // 명령 수정

    if (Data[0] == "n!파티 -x ") {
      if (partylist.indexOf(Data[1]) == -1) {
        replier.reply("==파티참가실패==\n없는 파티 입니다!");
      } else {
          T = [partylist[partylist.indexOf(Data[1])],partylist[partylist.indexOf(Datsa[1])+1],partylist[partylist.indexOf(Data[1])+2]]
          replier.reply("==파티정보==\n파티제목 - " + T[0] + "\n파티시작시간 - " + T[1] + "\n파티설명 - " + T[2] + "\n==============\n1. " + partymember[Data[1]][0] + "\n2. " + partymember[Data[1]][1] + "\n3. " +  partymember[Data[1]][2] + "\n4. " +  partymember[Data[1]][3] + "\n5. " +  partymember[Data[1]][4]);
      }
    }
// n!파티 -d(--del) //파티제목
    if (Data[0] == "n!파티 --delete ") { Data[0] = "n!파티 -d "; } // 명령 수정
    
    if (Data[0] == "n!파티 -d ") {
      if (partymember[Data[1]][0] == sender) {
        if (partylist.indexOf(Data[1]) == -1) {
          replier.reply("==파티삭제실패==\n없는 파티 입니다!");
        } else {
          partymember.splice(Data[1], 1);
          partynum.splice(Data[1], 1);
          partylist.splice(Data[1],3);
          replier.reply("==파티삭제성공==");
        } 
      } else {
        replier.reply("==파티삭제실패==\n본인이 아닙니다!");
      }
    }
  }
}