// 예시 가수별 대표곡 데이터
const songsBySinger = {
    '나훈아': ['테스형!', '무시로', '사랑', '갈무리', '울긴 왜 울어', '영영', '잡초', '고향역', '홍시', '사내' ],
    '이미자': ['동백아가씨', '섬마을 선생님', '기러기 아빠', '여자의 일생', '황포돛대', '흑산도 아가씨', '서울이여 안녕', '노래는 나의 인생', '아씨', '빙점'],
    '남진': ['님과 함께', '가슴 아프게', '빈잔', '둥지', '미워도 다시 한번', '그대여 변치마오', '모르리', '나야 나', '저리 가', '파트너'],
    '김연자': ['아모르 파티', '수은등', '십분 내로', '진정인가요', '정든 님', '밤열차', '천하장사', '씨름의 노래', '영동부르스', '가요 메들리'],
    '설운도': ['다함께 차차차', '사랑의 트위스트', '쌈바의 여인', '여자 여자 여자', '누이', '잃어버린 30년', '나침반', '보랏빛 엽서', '춘자야', '귀여운 여인'],
    '주현미': ['신사동 그 사람', '짝사랑', '비 내리는 영동교', '또 만났네요', '울면서 후회하네', '잠깐만', '정말 좋았네', '추억으로 가는 당신', '러브레터', '눈물의 부르스'],
    '태진아': ['사랑은 아무나 하나', '옥경이', '동반자', '미안 미안해', '잘 살거야', '진진자라', '거울도 안보는 여자', '노부부의 노래', '사모곡', '애인'],
    '송가인': ['가인이어라', '엄마 아리랑', '무명배우', '서울의 달', '트로트가 나는 좋아요', '한 많은 대동강', '용두산 엘레지', '단장의 미아리 고개', '이별의 부산 정거장', '월하가약'],
    '임영웅': ['이제 나만 믿어요', '별빛 같은 나의 사랑아', 'HERO', '사랑은 늘 도망가', '다시 만날 수 있을까', '우리들의 블루스', '무지개', '아버지', 'A bientot', 'London Boy'],
    '장윤정': ['어머나', '짠짜라', '꽃', '초혼', '이따 이따요', '첫사랑', '사랑아', '목포행 완행열차', '돼지토끼', '옆집 누나'],
    '진성': ['안동역에서', '보릿고개', '태클을 걸지마', '님의 등불', '가지마', '동전 인생', '내가 바보야', '잊을 수 없는 영아', '울 엄마', '님의 사랑'],
    '영탁': ['찐이야', '니가 왜 거기서 나와', '막걸리 한잔', '이불', '누나가 딱이야', '사내', '전복 먹으러 갈래', '신사답게', '한량가', '담'],
    '홍진영': ['사랑의 배터리', '잘가라', '오늘 밤에', '엄지 척', '산다는 건', '사랑은 꽃잎처럼', '따르릉', '부기맨', '사랑이 좋아', '월량대표아적심'],
    '박현빈': ['샤방샤방', '곤드레 만드레', '오빠만 믿어', '대찬 인생', '앗! 뜨거', '빠라빠빠', '춘향아', '넌 너무 예뻐', '한판 붙자', '모래시계'],
    '김용임': ['부초같은 인생', '사랑의 밧줄', '내 사랑 그대여', '빙빙빙', '오늘이 젊은 날', '열두 줄', '훨훨훨', '사랑님', '내장산', '고향 가는 길'],
    '신유': ['시계바늘', '꽃물', '잠자는 공주', '일소일소 일노일노', '반', '나쁜 남자', '토닥토닥', '사치기 사치기', '오르락 내리락', '애가'],
    // 다른 가수들의 데이터도 필요하다면 여기에 추가
};

// 한국어 가나다 순 정렬 함수
function koreanSort(a, b) {
    return a.localeCompare(b, 'ko');
}

document.addEventListener('DOMContentLoaded', () => {
    const singerNameElement = document.getElementById('singerName');
    const songListElement = document.getElementById('songList');

    // URL에서 가수 이름 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const singerName = urlParams.get('name');

    if (singerName) {
        // 가수 이름 표시 (HTML 인코딩된 것을 디코딩)
        const decodedSingerName = decodeURIComponent(singerName);
        singerNameElement.textContent = decodedSingerName;
        document.title = `${decodedSingerName} - 트로트 뮤직뱅크`; // 페이지 타이틀 변경

        // 해당 가수의 대표곡 목록 가져오기
        const songs = songsBySinger[decodedSingerName] || []; // 해당 가수 노래 없으면 빈 배열

        // 대표곡 목록 표시 (최대 10곡, 가나다 순 정렬)
        songListElement.innerHTML = ''; // 기존 목록 제거
        if (songs.length > 0) {
            const sortedSongs = [...songs].sort(koreanSort).slice(0, 10); // 정렬 후 10개 선택
            sortedSongs.forEach(song => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = song;
                // 임시로 Google 검색 URL 사용
                a.href = `https://www.google.com/search?q=${encodeURIComponent(decodedSingerName + ' ' + song)}`;
                a.target = '_blank'; // 새 탭에서 열기

                li.appendChild(a);
                songListElement.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = '대표곡 정보가 없습니다.';
            songListElement.appendChild(li);
        }
    } else {
        // 가수 이름 파라미터가 없는 경우
        singerNameElement.textContent = '가수 정보 없음';
        songListElement.innerHTML = '<li>올바른 접근이 아닙니다.</li>';
    }
}); 