'use strict'
import Swiper, { Autoplay, Lazy } from 'swiper'

export function initSlider() {
	const sliderSection = document.querySelector('.slider')
	if (sliderSection) {
		const port = new Swiper('.mySwiper', {
			modules: [Autoplay, Lazy],
			lazy: true,
			loop: true,
			speed: 1000,
			slidesPerView: 1,
			autoplay: {
				delay: 7000,
			},
		})
	}
}