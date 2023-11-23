import { allImg } from "./img-data.js";

const data = allImg;

const swiperWrapper = document.querySelector(".swiper-wrapper");

function renderSlide() {
  let str = "";
  data.forEach((img) => {
    str += `<div class="swiper-slide"><img src="${img.imgUrl}"></div>`;
  });
  swiperWrapper.innerHTML = str;
}

renderSlide();

//產生 swiper 內容
const swiper = new Swiper(".swiper", {
  //   direction: "vertical",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
