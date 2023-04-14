// tab.js를 <for each>로 변경

// const arr = [1, 2, 3, 4];
// for (let index = 0; index < array.length; index++) {
//   // 첫번째 요소 가져오기
//   let 가져온요소=배열명[i];
//   console.log(가져온요소)
// };

// array.forEach((item,i) => {
//   console.log(item)
// });

const tabBtns = document.querySelectorAll(".tab-button");
const tabConts = document.querySelectorAll(".tab-content");

tabBtns.forEach((tabBtn, idx) => {
  tabBtn.addEventListener("click", (e) => {
    // 모든 tab-button의 orange 클래스명 제거
    tabBtns.forEach((item) => {
      item.classList.remove("orange");
    });
    // 현재 클릭이 된 tab-button만 orange 부착
    e.target.classList.add("orange"); // 이벤트 대상으로 걸어준 것은 이 아이이므로 얘는 e.target을 사용할 수 있지만,
    // 모든 tab-content의 show 제거
    tabConts.forEach((item2) => {
      item2.classList.remove("show");
    });
    // 현재 클릭이 된 tab-content만 show 부착
    tabConts[idx].classList.add("show"); // 얘는 그렇지 않기 때문에 idx로 돌려준 것이다.
  });
});
