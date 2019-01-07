/*
!전적 <ASIA / NA> <닉네임>

[TOG 봇] <ASIA, NA> 서버 전적 검색 결과!
<USER ID> 님의 전적이에요!
=========================
전투 수: <총 전투 수>

승리: <승리 횟수>
패배: <패배 횟수>
승률: <승리 횟수> / <총 전투 수>

입힌 피해: <입힌 피해>
받은 피해: <받은 피해>
평딜: <입힌 피해> / <총 전투 수>

살아남은 횟수: <살아 남은 횟수>
산체로 이긴 횟수: <살아서 이긴 횟수>

파괴한 총 전차 수: <파괴한 총 전차 수>

제일 많이 얻은 XP 양: <제일 많이 얻은 XP 양>

토그봇은 랭크전투 전적을 포함시키지 않아요!"

*/

function ID_PARSE(nickname, nation) { // 플래이어 ID 검색 & 파싱 함수

	var URL;
	var ID;
	var ID_ARY = [];

	switch(nation) { // 서버 위치

		case 'NA': URL = 'https://api.wotblitz.com/wotb/account/list/?application_id=40cc6985f9dc173690c3a94696959ebe&search='; break; 
		// 북미 API

		case 'ASIA': URL = 'https://api.wotblitz.asia/wotb/account/list/?application_id=40cc6985f9dc173690c3a94696959ebe&search='; break;
		// 아시아 API

		default: return 'NATION_ERROR'; break;
		// 오타 예외 처리

	}

	var TMP = Utils.getHtmlFromWeb(URL + nickname); // 파싱
	var ARY = JSON.parse(TMP); // 변환

	if(ARY['status'] == 'ok') { // API 상태가 OK 일 경우

		if(ARY['meta']['count'] == 1) { // meta 가 1, 즉 한명이 검색됬을 경우

			ID = ARY['data'][0]['account_id'];
			return ID;

		} else if(ARY['meta']['count'] == 0 || ARY['meta']['count'] == 'error')   {

			return 'ID_ERROR';

		} else { // meta 가 2 이상, 즉 한명 이상 검색됬을 경우

			var COUNT = ARY['meta']['count'];

			for(var i = 0; i < COUNT; i++) {

				ID_ARY.push(ARY['data'][i]['nickname']);

			}

			return ID_ARY;

		}

	} else { // API 상태가 ERROR 일 경우

		return 'API_ERROR';

	}

}

function STAT_PARSE(account_id, nation) { // 플래이어 전적 파싱 함수

	var URL;
	var STAT;

	switch(nation) { // 서버 위치

		case 'NA': URL = 'https://api.wotblitz.com/wotb/account/info/?application_id=40cc6985f9dc173690c3a94696959ebe&account_id='; break; 
		// 북미 API

		case 'ASIA': URL = 'https://api.wotblitz.asia/wotb/account/info/?application_id=40cc6985f9dc173690c3a94696959ebe&account_id='; break;
		// 아시아 API

		default: return 'NATION_ERROR'; break;
		// 오타 예외 처리

	}

	var TMP = Utils.getHtmlFromWeb(URL + account_id + "&fields=statistics.all");
	var ARY = JSON.parse(tmp);

	if(ARY['status'] == 'ok') { // API 상태가 OK 일 경우

		STAT = ARY['data'][account_id]['statistics']['all'];
		return STAT;

	} else { // API 상태가 ERROR 일 경우

		return 'API_ERROR';

	}

}

function response(room, msg, sender, isGroupChat, replier, imageDB) {

	var ID;
	var USER_ID;
	var ACCOUNT_ID;
	var NATION;
	var STAT;

	var SplitMsg = msg.split(" ");

	if(SplitMsg[0] == "!전적") { // 메세지 인식

		NATION = SplitMsg[1]; // 나라코드
		USER_ID = SplitMsg[2]; // 유저네임

		ID = ID_PARSE(USER_ID, NATION);

		if(ID == 'NATION_ERROR') {

			replier.reply("[TOG 봇]나라코드 에러가 났어요!");
			return;

		} else if(ID == 'API_ERROR') {

			replier.reply("[TOG 봇]API 에러가 났어요!");
			return;

		} else if(ID.length > 1) {

			replier.reply("[TOG 봇]닉네임이 두개 이상 검색됬어요!" + Utils.compress() + "\n\
			" + NATION + " 서버 닉네임 검색 결과에요!\n\
			" + ID);
			return;

		} else {

			STAT = STAT_PARSE(ID, NATION);
			return;

		}

	}

}