// orange 클래스명 붙였다가 떼었다가
// tab-버튼 0을 누르면 모든 버튼에 붙은 orange 클래스명 제거
// tab-버튼 0 orange 클래스명 부착
// 버튼 클릭에 맞춰 tab-content 보여주기
const tabBtn0 = document.querySelector(".list>li:first-Child");
const tabBtn1 = document.querySelector(".list>li:nth-Child(2)");
const tabBtn2 = document.querySelector(".list>li:last-Child");
const tabCont0 = document.querySelector(".container>div:nth-child(2)"); // 부모 container 기준으로는 둘째 자식임
const tabCont1 = document.querySelector(".container>div:nth-child(3)");
const tabCont2 = document.querySelector(".container>div:nth-child(4)");
tabBtn0.addEventListener("click", () => {
  tabBtn0.classList.add("orange");
  tabBtn1.classList.remove("orange");
  tabBtn2.classList.remove("orange");

  tabCont0.classList.add("show");
  tabCont1.classList.remove("show");
  tabCont2.classList.remove("show");
});

tabBtn1.addEventListener("click", () => {
  tabBtn0.classList.remove("orange");
  tabBtn1.classList.add("orange");
  tabBtn2.classList.remove("orange");

  tabCont0.classList.remove("show");
  tabCont1.classList.add("show");
  tabCont2.classList.remove("show");
});

tabBtn2.addEventListener("click", () => {
  tabBtn0.classList.remove("orange");
  tabBtn1.classList.remove("orange");
  tabBtn2.classList.add("orange");

  tabCont0.classList.remove("show");
  tabCont1.classList.remove("show");
  tabCont2.classList.add("show");
});
