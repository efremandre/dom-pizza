/// https://michalsnik.github.io/aos/

'use strict'

export function modal() {

	const body = document.querySelector('body')
	const header = document.querySelector('.logo')
	const navigation = document.querySelector('.navigation')
	const paddingRightValue = `${window.innerWidth - document.documentElement.clientWidth}px`

	const modal = {
		modalOpenBtn: document.querySelector('.cart'),
		modalCloseBtn: document.querySelector('.modal-order__close'),
		modalOrder: document.querySelector('.modal-order'),
	}

	if (modal.modalOpenBtn) {
		const getOpenModal = () => {
			modal.modalOrder.classList.remove('_hidden')
			body.style.paddingRight = paddingRightValue
			header.style.paddingRight = paddingRightValue
			navigation.style.paddingRight = paddingRightValue
			body.classList.add('stop-scroll')
		}

		const getCloseModal = () => {
			modal.modalOrder.classList.add('_hidden')
			body.style.paddingRight = '0'
			header.style.paddingRight = '0'
			navigation.style.paddingRight = '0'
			body.classList.remove('stop-scroll')
		}

		modal.modalOpenBtn.addEventListener('click', getOpenModal)
		modal.modalCloseBtn.addEventListener('click', getCloseModal)
	}
}