'use strict';
import Swiper, {Navigation, Pagination, Autoplay, FreeMode, Lazy} from 'swiper';
export function initSlider() {
	const catalog = document.querySelector('.catalog__slider-container');
	if (catalog) {
		const port = new Swiper('.mySwiper', {
			modules:[Navigation, Pagination, Autoplay, FreeMode, Lazy],
			lazy: true,
			loop: true,
			speed: 1000,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				dynamicBullets: true
			},
			autoplay: {
				delay: 10000,
			},
			breakpoints: {
				319: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				569: {
					slidesPerView: 2,
				},
				989: {
					slidesPerView: 3,
					spaceBetween: 30,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}
				},
			},
		});
	}
}