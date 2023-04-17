// 오늘 날짜 확인 -1 == 어제 날짜를 화면에 보여주기

// 년, 월, 일 요소 찾아오기
const ty = document.querySelector("#txtYear");
const sm = document.querySelector("#selMon");
const sd = document.querySelector("#selDay");

// 박스 오피스 순위 보여줄 영역 가져오기
const msg = document.querySelector("#msg");

// 영화 상세 정보 보여줄 영역 가져오기
const boxbox = document.querySelector(".box3");

function init() {
  // 오늘 날짜
  const e = new Date();
  // 년
  let year = e.getFullYear();
  // 월(0부터 시작)
  let month = e.getMonth() + 1;
  // 일-1(어제 날짜)
  let date = e.getDate() - 1;
  // 화면에 각각 세팅해주기
  ty.value = year;

  // 01, 02 이런 식이라서 이렇게 조건식을 추가해줌.
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }

  sm.value = month;
  sd.value = date;
}
function show(movieCd) {
  console.log("movieCd", movieCd);

  // 영화 상세 정보 요청하기
  let url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=";

  url += movieCd;

  console.log("영화상세정보 ", url);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("데이터가 없습니다.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const movieInfo = data.movieInfoResult.movieInfo;
      console.log(movieInfo);

      // movieInfo에서 movieNm, movieNmEn, showTm, directors, actors
      let result = "<ul>";

      result += "<li>영화제목 : " + movieInfo.movieNm + "</li>";
      result += "<li>영어제목 : " + movieInfo.movieNmEn + "</li>";
      result += "<li>상영시간 : " + movieInfo.showTm + "분" + "</li>";
      // 감독은 1명만 추출
      if (movieInfo.directors.length > 0) {
        result += "<li>감독 : " + movieInfo.directors[0].peopleNm + "</li>";
      } else {
        result += "<li>감독 : 없음 </li>";
      }

      // 배우는 전부 추출
      const length = movieInfo.actors.length;
      let peopleNm = "";
      movieInfo.actors.forEach((actor, idx) => {
        if (idx == length - 1) {
          // 맨 마지막 사람 다음에는 쉼표를 넣지 않기 위해
          peopleNm += actor.peopleNm;
        } else {
          peopleNm += actor.peopleNm + ", ";
        }
      });
      result += "<li>출연배우 : " + peopleNm + "</li>";
      result += "</ul>";

      boxbox.innerHTML = result;
    })
    .catch((err) => {});
}

init();

// 확인 버튼 클릭 시 전일자 영화 순위 가져오기
document.querySelector("#btn1").addEventListener("click", () => {
  let url =
    "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=";

  // 사용자가 선택한 날짜 가져오기
  let dayday = txtYear.value + selMon.value + selDay.value;
  // url과 연결
  url += dayday;
  // console.log() 확인
  console.log(url);

  // 데이터만 요청 => ajax로 요청
  // fetch
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("주소를 확인해주세요.");
      }
      // 서버에서 오는 데이터는 json => 스크립트 형태로 객체 처리
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // dailyBoxOfficeList 가져오기
      const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
      console.log(dailyBoxOfficeList);

      // data에서 rank(rankInten): movieNm 추출
      // movieCd 추출(영화 상세 정보 요청하는 데 필요)
      let result = "";
      dailyBoxOfficeList.forEach((item) => {
        // 순위
        result += item.rank + "위";
        // 전일자 증감
        const rankInten = parseInt(item.rankInten);
        if (rankInten > 0) result += "(▲";
        else if (rankInten < 0) result += "(▼";
        else result += "(";
        result += rankInten + ") : ";
        // 영화명
        result +=
          // 이거는 지금 자바스크립트의 show라는 함수를 부르는 거야~
          // <a href="#" onclick="show">
          "<a href='#' onclick='javascript:show(" +
          item.movieCd +
          ")'>" +
          item.movieNm +
          "</a><br>";
      });
      // 박스 영역 안에 보여주기
      msg.innerHTML = result;
    })
    .catch((err) => {
      msg.innerHTML = err;
    });
});
