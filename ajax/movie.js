// 오늘 날짜 확인 -1 == 어제 날짜를 화면에 보여주기

// 년, 월, 일 요소 찾아오기
const ty = document.querySelector("#txtYear");
const sm = document.querySelector("#selMon");
const sd = document.querySelector("#selDay");

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
init();
