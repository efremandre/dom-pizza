'use strict'
import Swiper, { Autoplay, Lazy, FreeMode, Navigation } from 'swiper'

export function initSlider() {
	const sliderSection = document.querySelector('.slider')
	const slides = document.querySelectorAll('.swiper-slide')
	const meniNavItems = document.querySelectorAll('.menu-navigation__link')

	if (sliderSection && slides.length > 1) {
		const port = new Swiper('.mySwiper', {
			modules: [Autoplay, Lazy, FreeMode],
			lazy: true,
			speed: 1000,
			slidesPerView: 1,
			autoplay: {
				delay: 7000,
			},
		})
	}

	if (meniNavItems.length > 1) {
		const port2 = new Swiper('.menuNav', {
			modules: [FreeMode, Navigation],
			speed: 1000,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			slidesPerView: "auto",
			breakpoints: {
				1400: {
					slidesPerView: "auto",
					spaceBetween: 10,
				},
				639: {
					slidesPerView: "auto",
					spaceBetween: 15,
				},
				220: {
					slidesPerView: "auto",
					spaceBetween: 5,
				}
			},

		})
	}
}