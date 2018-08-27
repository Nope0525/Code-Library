/*
KakaoTalk_Division_BOT
By NOPE

version 2.0.0

/파티c [파티제목] [파티시작시간]	- 파티만들기

/파티j [파티제목]			- 파티참가하기

/파티d [파티제목]			- 파티삭제하기

/파티x [파티제목]			- 파티정보

/파티l					- 파티리스트

/NOPEBOTDEBUG			- 디버깅

PartyList 	= PartyName, Time, Leader
PartyMember	= PartyName, num, Leader, 빈슬롯_1, 빈슬롯_2, 빈슬롯_3, Empty 4, 예비_1, 예비_2, 예비_3
*/
var PartyList = [];
var PartyMember = [];
function response(room, msg, sender, isGroupChat, replier, ImageDB) {
	if(room == "TEST0525") { // room 일 경우 실행
	
		var SplitData = msg.split(" "); // 공백을 기준으로 나눔
		
		// 파티c [파티제목] [파티시작시간]	- 파티만들기s
		if(SplitData[0] == "/파티c") { // 나눈 문장에 첫번째가 /파티c 일 경우 실행
			
			if(PartyList.indexOf(SplitData[1]) == -1) { // 파티가 존재하지 않을 경우
				PartyList.push(SplitData[1], SplitData[2], sender);
				PartyMember.push(SplitData[1], 1, sender, "빈슬롯_1", "빈슬롯_2", "빈슬롯_3", "예비_1", "예비_2", "예비_3");
				replier.reply("==파티생성완료==\n파티제목 - " + SplitData[1] + "\n파티시작시간 - " + SplitData[2] + "\n==============\n리더. " + sender);
			} else { // 파티가 존재 할 경우
				replier.reply("==파티생성실패==\n이미 있는 파티입니다!");
			}
		}
		
		// 파티j [파티제목]			- 파티참가하기
		if(SplitData[0] == "/파티j") { // 나눈 문장에 첫번째가 /파티j 일 경우 실행
			
			if(PartyList.indexOf(SplitData[1]) != -1) { 	// 파티가 존재 할 경우
						var NPartyNum = PartyList.indexOf(SplitData[1]); 								// PartyList 배열에서 파티에 위치를 찾음
						var MPartyNum = PartyMember.indexOf(SplitData[1]); 								// PartyMember 배열에서 파티에 위치를 찾음
						var locate = PartyMember.indexOf(SplitData[1]) + Number(PartyMember[1]) + 1;	// 배열에서 파티에 슬롯부분을 찾음
						
				if(PartyMember[MPartyNum + 1] != 6) { 					// 파티슬롯이 꽉차지 않았을 경우
					if(PartyMember.indexOf(sender) == -1) {	// 중복되지 않을 경우
						PartyMember.splice(locate + 1, 1, sender);
						replier.reply("==파티참가완료==\n파티제목 - " + PartyList[NPartyNum] + "\n파티시작시간 - " + PartyList[NPartyNum + 1] + "\n==============\n리더. " + PartyMember[locate + 1] + "\n1. " + PartyMember[locate + 2] + "\n2. " + PartyMember[locate + 3] + "\n3. " + PartyMember[locate + 4] + "\n4. " + PartyMember[locate + 5] + "\n5. " + PartyMember[locate + 6] + "\n6. " + PartyMember[locate + 7]);
					} else { // 중복 될 경우
						replier.reply("==파티참가실패==\n이미 파티에 있습니다!");
					}
				} else { // 파티가 다 찼을 경우
					replier.reply("==파티참가실패==\n파티가 다 찼습니다!");
				} 
			} else { // 파티가 없을 경우
				replier.reply("==파티참가실패==\n없는 파티 입니다!");
			}
		}
		
		// 파티d [파티제목]			- 파티삭제하기
		if(SplitData[0] == "/파티d") { // 나눈 문장에 첫번째가 /파티d 일 경우 실행
			
			if(PartyList.indexOf(SplitData[1]) != -1) { // 파티가 존재 할 경우
				var locate = PartyMember.indexOf(SplitData[1]) + Number(PartyMember[1]) + 1;	// 배열에서 파티에 슬롯부분을 찾음
				var NPartyNum = PartyList.indexOf(SplitData[1]); 								// PartyList 배열에서 파티에 위치를 찾음
				var MPartyNum = PartyMember.indexOf(SplitData[1]); 								// PartyMember 배열에서 파티에 위치를 찾음
				
				if(PartyMember[locate + 1] == sender) { // 리더일 경우
					PartyList.splice(locate + 1, 3);
					PartyMember.splice(locate + 1, 9);
					replier.reply("==파티삭제완료==");
				} else { // 리더가 아닐 경우
					replier.reply("==파티삭제실패==\n리더가 아닙니다!");
				}
			} else { // 파티가 존재하지 않을 경우
				replier.reply("==파티삭제실패==\n없는 파티 입니다!");
			}
		}
		
		// NOPEBOTDEBUG			- 디버깅
		if(SplitData[0] == "NOPEBOTDEBUG") { // 변수등 정보를 표시하기 위해 만듬
				var locate = PartyMember.indexOf(SplitData[1]) + Number(PartyMember[1]) + 1;
				var NPartyNum = PartyList.indexOf(SplitData[1]);
				var MPartyNum = PartyMember.indexOf(SplitData[1]);
				replier.reply("==DEBUG==" + "\nlocate::" + locate + "\nNPartyNum::" + NPartyNum + "\nMPartyNum::" + MPartyNum + "\n========\nPartyList\n" + PartyList + "\n========\nPartyMember\n" + PartyMember);
		}
	}
}
/*
/파티c TEST 12:30
num = 1
[TEST, 12:30, NOPE]
[TEST, 1, NOPE]

LOL: /파티j TEST
num = 1
locate = 2
[TEST, 1, NOPE]
*/