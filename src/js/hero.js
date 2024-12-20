import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

const swiper = new Swiper('.hero__slider', {
  modules: [Autoplay],
  slidesPerView: 1,
  autoHeight: true,
  // autoplay: {
  //   delay: 10000,
  //   disableOnInteraction: false,
  // },
  loop: true,
});
