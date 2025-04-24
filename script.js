// 예시 가수 데이터 (16명)
const singers = [
    { id: 1, name: '나훈아' },
    { id: 2, name: '이미자' },
    { id: 3, name: '남진' },
    { id: 4, name: '김연자' },
    { id: 5, name: '설운도' },
    { id: 6, name: '주현미' },
    { id: 7, name: '태진아' },
    { id: 8, name: '송가인' },
    { id: 9, name: '임영웅' },
    { id: 10, name: '장윤정' },
    { id: 11, name: '진성' },
    { id: 12, name: '영탁' },
    { id: 13, name: '홍진영' },
    { id: 14, name: '박현빈' },
    { id: 15, name: '김용임' },
    { id: 16, name: '신유' },
];

// 예시 가수별 대표곡 데이터 (singer.js와 동일하게 가져옴)
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
};

const cardGrid = document.getElementById('cardGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// 한국어 가나다 순 정렬 함수
function koreanSort(a, b) {
    return a.localeCompare(b, 'ko');
}

// 가수 카드를 생성하고 그리드에 추가하는 함수
function displaySingers(singerList) {
    cardGrid.innerHTML = ''; // 기존 카드 제거
    singerList.forEach(singer => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        // 가수 이름만 추가
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('card-title');
        titleDiv.textContent = singer.name;
        
        // 카드에 이름만 추가
        card.appendChild(titleDiv);
        
        card.dataset.singerId = singer.id; // 데이터 속성으로 ID 저장
        card.dataset.singerName = singer.name; // 데이터 속성으로 이름 저장

        // 카드 클릭 시 상세 페이지로 이동
        card.addEventListener('click', () => {
            // 이름을 URL 파라미터로 전달
            window.location.href = `singer.html?name=${encodeURIComponent(singer.name)}`;
        });

        cardGrid.appendChild(card);
    });
}

// 검색 기능 함수 (가수 이름 + 노래 제목 검색)
function filterSingers() {
    const searchTerm = searchInput.value.toLowerCase().trim(); // 양 끝 공백 제거

    if (!searchTerm) {
        // 검색어가 없으면 전체 목록을 정렬하여 표시
        const sortedSingers = [...singers].sort((a, b) => koreanSort(a.name, b.name));
        displaySingers(sortedSingers);
        return;
    }

    const filteredSingers = singers.filter(singer => {
        // 1. 가수 이름 검색
        const nameMatch = singer.name.toLowerCase().includes(searchTerm);

        // 2. 노래 제목 검색
        const songs = songsBySinger[singer.name] || []; // 해당 가수의 노래 목록 가져오기
        const songMatch = songs.some(song => song.toLowerCase().includes(searchTerm));

        return nameMatch || songMatch; // 이름 또는 노래 제목 중 하나라도 맞으면 포함
    });

    // 검색 결과도 가나다 순으로 정렬
    const sortedFilteredSingers = filteredSingers.sort((a, b) => koreanSort(a.name, b.name));
    displaySingers(sortedFilteredSingers);
}

// 검색 버튼 클릭 이벤트
searchButton.addEventListener('click', filterSingers);

// Enter 키 입력 시 검색 실행
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        filterSingers();
    }
});

// 페이지 로드 시 정렬된 전체 가수 표시
const initialSortedSingers = [...singers].sort((a, b) => koreanSort(a.name, b.name));
displaySingers(initialSortedSingers); 