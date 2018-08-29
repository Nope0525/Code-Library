/*
KakaoTalk_Division_BOT
By NOPE

version 2.1.0

설명
공백 두칸이 기준입니다.

/파티c [파티제목]  [파티시작시간]  [파티설명]	- 파티만들기

/파티j [파티제목]	[슬롯번호]				- 파티참가하기

/파티d [파티제목]						- 파티삭제하기

/파티e [파티제목]						- 파티나가기

/파티x [파티제목]						- 파티정보

/파티l								- 파티리스트
*/

var PartyList = {};
var PartyMember = {};

function isExistParty(name) {
	
	if(name in PartyList) {
		
		return true;
		
	} else {
		
		return false;
		
	}
	
}

function CountUser(name) {
	
	if(isExistParty(name)) {
	
		return PartyMember[name][0];
	
	}
	
}

function isExistMember(name, user) {
	
	if(isExistParty(name)) {
		
		if(PartyMember[name].indexOf(user) != -1) {
		
			return true;
		
		} else {
		
			return false;
		
		}
		
	}
	
}

function isLeader(name, user) {
	
	if(isExistParty(name)) {
		
		if(user == PartyMember[name][1]) {
		
			return true;
		
		} else {
		
			return false;
		
		}
		
	}
	
}

function crea(name, time, discription, user, replier) {

	if(!isExistParty(name)) {

		PartyList[name] = [time, discription, user];
		PartyMember[name] = [1, user, "비어있음", "비어있음", "비어있음", "예비", "예비"];

		replier.reply("==파티생성완료==\n파티제목 - " + name + "\n파티시작시간 - " + PartyList[name][0] + "\n파티설명 - " + PartyList[name][1] + "\n==============\n리더. " + PartyList[name][2]);
		
	} else {

		replier.reply("==파티생성실패==\n이미 있는 파티입니다!");

	}

}

function dele(name, user, replier) {

	if(isExistParty(name)) {

		if(isLeader(name, user)) {
	
			delete PartyList[name];
			delete PartyMember[name];
			replier.reply("==파티삭제완료==");

		} else {
			
			replier.reply("==파티삭제실패==\n리더가 아닙니다!");
			
		}
		
	} else {
		
		replier.reply("==파티삭제실패==\n없는 파티 입니다!");
		
	}
	
}

function join(name, slotnum, user, replier) {
	
	if(isExistParty(name)) {
		
		if(isExistMember(name, user)) {
			
			if(CountUser(name) < 7) {
				
				PartyMember[name][0]++;
				PartyList[name][slotnum] = user;
				replier.reply("==파티참가완료==\n파티제목 - " + name + "\n파티시작시간 - " + PartyList[name][0] + "\n파티설명 - " + PartyList[name][1] + "\n==============\n리더. " + PartyMember[name][1] + "\n1. " + PartyMember[name][2] + "\n2. " + PartyMember[name][3] + "\n3. " + PartyMember[name][4] + "\n4. " + PartyMember[name][5] + "\n5. " + PartyMember[name][6]);
				
			} else {
				
				replier.reply("==파티참가실패==\n파티가 다 찼습니다!");
				
			}
			
		} else {
			
			if(isLeader(name, user)) {
				
				replier.reply("==파티참가실패==\n이미 파티에 있습니다!");
				
			}
			
			replier.reply("==파티참가실패==\n리더 입니다!");
			
		}
		
	} else {
		
		replier.reply("==파티참가실패==\n없는 파티 입니다!");
		
	}
	
}

function exit(name, user, replier) {

	if(isExistParty(name)) {
		
		if(!isLeader(name, user)) {
			
			if(isExistMember(name, user)) {
				
				PartyMember[name][PartyMember[name].indexOf(user)] = ""
				PartyMember[name][0]--;
				replier.reply("==파티나가기완료==");

			} else {
				
				replier.reply("==파티나가기실패==\n파티에 없습니다!");
				
			}
			
		} else {
			
			replier.reply("==파티나가기실패==\n당신은 리더입니다!");
			
		}
		
	} else {
		
		replier.reply("==파티나가기실패==\n없는 파티 입니다!");
		
	}
	
}

function list(replier) {
	
	var lst = "==파티==\n";
		
	for (var key in PartyList) {
			
		lst = lst + key + "(" + PartyMember[key][0] + " / 5)\n";
			
	}
		
	replier.reply(lst);

}

function exte(name, replier) {
	
	if(isExistParty(name)) {
		
		var partyname = name;
		var partyinfo_time = PartyList[name][0];
		var partyinfo_discription = PartyList[name][1];
		var partyinfo_leader = PartyList[name][2];
		
		replier.reply("==파티정보==\n파티제목 - " + partyname + "\n파티시작시간 - " + partyinfo_time + "\n파티설명 - " + partyinfo_discription + "\n========\n리더 - " + partyinfo_leader + "\n1. " + PartyMember[name][2] + "\n2. " + PartyMember[name][3] + "\n3. " + PartyMember[name][4] + "\n4. " + PartyMember[name][5] + "\n5. " + PartyMember[name][6]);
		
	} else {
		
		replier.reply("==파티불러오기실패==\n없는 파티 입니다!");
		
	}
	
}

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
	
	if(room == "TEST0525") {
		
		var DATA = msg.split("  ");
		
		switch(DATA[0]) {
			
			case "/파티c":
				crea(DATA[1], DATA[2], DATA[3], sender, replier);	// 파티c [파티제목] [파티시작시간]  - 파티만들기
			break;
			
			case "/파티j":
				join(DATA[1], DATA[2], sender, replier);			// 파티j [파티제목] [슬롯번호]	- 파티참가하기
			break;
			
			case "/파티d":
				dele(DATA[1], sender, replier);						// 파티d [파티제목]				- 파티삭제하기
			break;
		
			case "/파티e":
				exit(DATA[1], sender, replier);						// 파티e [파티제목]				- 파티나가기
			break;
			
			case "/파티x":
				exte(DATA[1], replier);								// 파티x [파티제목]				- 파티정보
			break;
			
			case "/파티l":
				list(replier);										// 파티l						- 파티리스트
			break;	
			
		}
		
	}
	
}