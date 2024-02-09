/// https://michalsnik.github.io/aos/

'use strict'

export function modal() {

	const body = document.querySelector('body')
	const navigation = document.querySelector('.header')
	const paddingRightValue = `${window.innerWidth - document.documentElement.clientWidth}px`

	const modal = {
		modalOpenBtn: document.querySelector('.cart'),
		modalCloseBtn: document.querySelector('.modal-order__close'),
		modalOrder: document.querySelector('.modal-order'),
		modalProductsWrapper: document.querySelector('.modal-order__order-items'),
		modalTotalSumm: document.querySelector('.form__price span'),
	}

	if (modal.modalOpenBtn) {
		const getOpenModal = () => {
			modal.modalOrder.classList.remove('_hidden')
			body.style.paddingRight = paddingRightValue
			navigation.style.paddingRight = paddingRightValue
			body.classList.add('stop-scroll')

			const productList = JSON.parse(localStorage.getItem('addToCartProductsDOM'))
			const totalData = JSON.parse(localStorage.getItem('totalCurrentDataDOM'));

			(totalData === null) ? modal.modalTotalSumm.innerText = 0 : modal.modalTotalSumm.innerText = totalData.totalSum;

			(productList === null) ?
				modal.modalProductsWrapper.innerHTML = `<div class="modal-order__order-item order-item">Корзина пока пуста :(</div>` :
				productList.forEach(product => {
					modal.modalProductsWrapper.innerHTML += `
			
			<div class="modal-order__order-item order-item">
						<div class="order-item__image-wrapper">
							<div class="order-item__image">
								<img
									src=${product.productImgSrc}
									alt=${product.productName} loading="lazy"
									width="200">
							</div>
							<button class="order-item__close order-item__close_mobile">
								<img src="../../assets/images/icon/close.svg" alt="Х">
							</button>
						</div>
						<div class="order-item__description">
							<div class="order-item__name">${product.productName}</div>
							<div class="order-item__description-wrapper">
								<div class="order-item__weight">${product.productWeight}г</div>
								<div class="order-item__price order-item__price_mobile">${product.productPriceNum}</div>
							</div>
						</div>
						<div class="order-item__current">
							<div class="order-item__current-wrapper">
								<div class="order-item__price">${product.productPriceNum}</div>
								<button class="order-item__close">
									<img src="../../assets/images/icon/close.svg" alt="Х">
								</button>
							</div>
							<div class="order-item__quantity quantity">
								<button class="quantity__minus">-</button>
								<span class="quantity__current">${product.productCurrent}</span>
								<button class="quantity__plus">+</button>
							</div>
						</div>
					</div>

			`
				})
		}

		const getCloseModal = () => {
			modal.modalOrder.classList.add('_hidden')
			body.style.paddingRight = '0'
			navigation.style.paddingRight = '0'
			body.classList.remove('stop-scroll')
		}

		modal.modalOpenBtn.addEventListener('click', getOpenModal)
		modal.modalCloseBtn.addEventListener('click', getCloseModal)
	}
}