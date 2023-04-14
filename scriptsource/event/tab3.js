// tab.js를 <이벤트 버블링>으로 변경
// 이벤트 버블링: 자식에서 발생한 이벤트가 부모로 전달되는 것
// e.target: 이벤트가 일어난 대상
// e.currentTarget: 이벤트가 일어난 대상 + 버블링 된 대상

// 이벤트 대상(tab-button) => 부모(ul)에게 이벤트가 전달됨.
const tabParent = document.querySelector(".list");
const tabBtns = document.querySelectorAll(".tab-button");
const tabConts = document.querySelectorAll(".tab-content");

// tabBtns.forEach((tabBtn) => {
//   // 배열(tabBtns)에는 addEventListener를 쓰지 못하므로 이렇게 forEach를 돌린다.
//   tabBtn.addEventListener("click", (e) => {
//     console.log(e.currentTarget.className);
//   });
// });

function tabOpen(idx) {
  // 모든 tab-button의 orange 클래스명 제거
  tabBtns.forEach((item) => {
    item.classList.remove("orange");
  });

  // 모든 tab-content의 show 클래스명 ㄴ제거
  tabConts.forEach((item2) => {
    item2.classList.remove("show");
  });

  // 현재 클릭이 된 tab-button만 orange 부착
  tabBtns[idx].classList.add("orange");

  // 현재 클릭이 된 tab-content만 show 부착
  tabConts[idx].classList.add("show");
}

// 어차피 자식이 클릭되도 부모가 버블링으로 인해 클릭을 감지하므로 부모에 이벤트 리스너를 달아준다.
// tabParent.addEventListener("click", (e) => {
//   // console.log(e.currentTarget.className);
//   // console.log(e.target);
//   if (e.target == tabBtns[0]) {
//     tabOpen(0);
//   } else if (e.target == tabBtns[1]) {
//     tabOpen(1);
//   } else {
//     tabOpen(2);
//   }
// });

// if문을 사용하지 않고 'data-'를 이용하는 방법
// 'data-': 전역 속성
// '-' 다음에 오는 이름은 자유롭게 작성(대문자는 사용 불가)
// ex) data-index-number(지정 시): dataset.indexNumber(접근 시)
// => 스크립트에서 접근하는 법:
// const h1=document.querySelector("h1")
// h1.dataset.indexNumber
tabParent.addEventListener("click", (e) => {
  // 이벤트가 일어난 대상의 'data-' 값 가져오기
  tabOpen(e.target.dataset.id);
});
