'use strict'
import { setColorBtn } from './_setColorBtn.js'

export function modal() {

	/// variable
	const body = document.querySelector('body')
	const navigation = document.querySelector('.header')
	const paddingRightValue = `${window.innerWidth - document.documentElement.clientWidth}px`
	const showTotlalQuantity = document.querySelector('.cart__current')

	const modal = {
		form: document.querySelector('.modal-order__form'),
		formMobile: document.querySelector('.modal-order__form_mobile'),
		formPopupBodyOrder: document.querySelector('.modal-order__item-wrapper'),
		formPopupBodySuccess: document.querySelector('.messages-done'),
		formPopupBodyError: document.querySelector('.messages-error'),
		modalOpenBtn: document.querySelector('.cart'),
		modalCloseBtn: document.querySelector('.modal-order__close'),
		modalRemoveBtn: document.querySelectorAll('.order-item__close'),
		modalOrder: document.querySelector('.modal-order'),
		modalAddToOrder: document.querySelector('.add-to-order'),
		modalProductsWrapper: document.querySelector('.modal-order__order-items'),
		modalTotalSumm: document.querySelectorAll('.form__price span'),
		addBtnCard: document.querySelectorAll('.add-to-order__card-add.add-order'),
	}


	/// support function

	/// меняем значения общей суммы заказа и общего кол-ва товаров в корзине
	const setTotalData = (productsList, totalCurrentData) => {
		let totalSum = 0
		let totalCurrent = 0

		productsList.forEach(product => {
			totalSum += parseFloat(product.productPriceSummNum)
			totalCurrent += parseFloat(product.productCurrent)
		})

		totalCurrentData.totalSum = totalSum
		totalCurrentData.totalCurrent = totalCurrent
	}

	/// показываем кол-во товаров в корзине около кнопки "Корзина"
	const showTotalQuantityCartButton = () => {
		const totalCurrentData = JSON.parse(localStorage.getItem('totalCurrentDataDOM')) || {}
		const totalQuantity = totalCurrentData.totalCurrent || 0
		showTotlalQuantity.innerText = totalQuantity
	}

	/// показываем общую сумму в корзине
	const showTotalSumm = () => {
		const totalData = JSON.parse(localStorage.getItem('totalCurrentDataDOM'))
		modal.modalTotalSumm.forEach(el => {
			(totalData === null) ? el.innerText = 0 : el.innerText = totalData.totalSum
		})
	}

	/// сохраняем изменения в локальное хранилище
	const setLocalStorage = (productsList, totalCurrentData) => {
		localStorage.setItem('addToCartProductsDOM', JSON.stringify(productsList))
		localStorage.setItem('totalCurrentDataDOM', JSON.stringify(totalCurrentData))
	}

	/// рисуем список с товарами в корзине, при добавлении, удалении или изменении
	const getRenderProductItems = () => {
		const productList = JSON.parse(localStorage.getItem('addToCartProductsDOM'))

		if (productList === null || productList.length === 0) {
			modal.form.classList.add('_hidden')
			modal.formMobile.classList.add('_hidden')
			modal.modalAddToOrder.classList.add('_hidden')
			modal.modalProductsWrapper.innerHTML = `
			<div class="modal-order__cart-empty">
				<p>Корзина пока пуста :(</p>
				<div class="modal-order__cat">
					<video width="300" height="300" poster="./assets/images/order-modal/cat.png">
						<source src="./assets/images/order-modal/cat.mp4" type='video/mp4;'>
					</video>
				</div>
			</div>
			`
		} else {
			modal.form.classList.remove('_hidden')
			modal.formMobile.classList.remove('_hidden')
			modal.modalAddToOrder.classList.remove('_hidden')
			modal.modalProductsWrapper.innerHTML = productList.map(product =>
				`<div class="modal-order__order-item order-item">
				<div class="order-item__image-wrapper">
					<div class="order-item__image">
						<img
							src=${product.productImgSrc}
							alt=${product.productName} loading="lazy"
							width="200">
					</div>
					<button data-prod-id=${product.productId} class="order-item__close order-item__close_mobile">
						<img src="../../assets/images/icon/close.svg" alt="Х">
					</button>
				</div>
				<div class="order-item__description">
					<div class="order-item__name">${product.productName}</div>
					<div class="order-item__description-wrapper">
						<div class="order-item__weight">${product?.productWeight}г</div>
						<div class="order-item__price order-item__price_mobile">${product.productPriceSummNum}₽</div>
					</div>
				</div>
				<div class="order-item__current">
					<div class="order-item__current-wrapper">
						<div class="order-item__price">${product.productPriceSummNum}₽</div>
						<button data-prod-id=${product.productId} class="order-item__close">
							<img src="../../assets/images/icon/close.svg" alt="Х">
						</button>
					</div>
					<div class="order-item__quantity quantity">
						<button data-prod-id=${product.productId} class="quantity__minus">-</button>
						<span data-prod-id=${product.productId} class="quantity__current">${product.productCurrent}</span>
						<button class="quantity__plus">+</button>
					</div>
				</div>
			</div>`
			).join('')
		}
	}

	/// функция с помощь которой ищем в хранилище элемент, который нужно изменить
	const setFoundProductId = (productsList, element) => productsList.find(product => product.productId === element.dataset.prodId)

	/// удаляем товар из корзины
	const removeProductToCart = (target, productsList, totalCurrentData) => {

		if (target.classList.contains('order-item__close')) {
			const indexToRemove = productsList.findIndex(product => product.productId === target.dataset.prodId)

			if (indexToRemove !== -1) {
				productsList.splice(indexToRemove, 1)
				setTotalData(productsList, totalCurrentData)
				setLocalStorage(productsList, totalCurrentData)
				getRenderProductItems()
				showTotalSumm()
				showTotalQuantityCartButton()
				setColorBtn()
			}

			return
		}

		if (target.classList.contains('quantity__minus')) {
			const nextElement = target.nextElementSibling.innerText
			if (+nextElement <= 1) {
				const indexToRemove = productsList.findIndex(product => product.productId === target.dataset.prodId)

				if (indexToRemove !== -1) {
					productsList.splice(indexToRemove, 1)

					setTotalData(productsList, totalCurrentData)
					setLocalStorage(productsList, totalCurrentData)
					getRenderProductItems()
					showTotalSumm()
					showTotalQuantityCartButton()
				}

				return
			}
		}
	}

	/// function open and close modal cart
	if (modal.modalOpenBtn) {
		const getOpenModal = () => {
			modal.modalOrder.classList.remove('_hidden')
			body.style.paddingRight = paddingRightValue
			navigation.style.paddingRight = paddingRightValue
			body.classList.add('stop-scroll')

			showTotalSumm()
			getRenderProductItems()
		}

		const getCloseModal = () => {
			modal.modalOrder.classList.add('_hidden')
			modal.formPopupBodySuccess.classList.add('_hidden')
			modal.formPopupBodyError.classList.add('_hidden')
			modal.formPopupBodyOrder.classList.remove('_hidden')

			body.style.paddingRight = '0'
			navigation.style.paddingRight = '0'
			body.classList.remove('stop-scroll')
			setColorBtn()
			showTotalSumm()
		}

		modal.modalOpenBtn.addEventListener('click', getOpenModal)
		modal.modalCloseBtn.addEventListener('click', getCloseModal)
	}

	modal.addBtnCard.forEach(btn => {
		btn.addEventListener('click', () => {
			showTotalQuantityCartButton()
			showTotalSumm()
			getRenderProductItems()
		})
	})

	modal.modalProductsWrapper.addEventListener('click', (e) => {
		const target = e.target
		const nextElement = target.nextElementSibling
		const previousElement = target.previousElementSibling
		const productsList = JSON.parse(localStorage.getItem('addToCartProductsDOM'))
		const totalCurrentData = JSON.parse(localStorage.getItem('totalCurrentDataDOM'))

		/// удаление из корзины
		removeProductToCart(target, productsList, totalCurrentData)

		/// уменьаем кол-во позиции в корзине
		if (target.classList.contains('quantity__minus')) {
			const foundProduct = setFoundProductId(productsList, nextElement)

			if (nextElement.innerText < 1) {
				removeProductToCart(target, productsList, totalCurrentData)
				return
			}
			else if (nextElement.innerText > 1) {
				foundProduct.productCurrent--
				foundProduct.productPriceSummNum -= foundProduct.productPriceNum

				setTotalData(productsList, totalCurrentData)
				setLocalStorage(productsList, totalCurrentData)
				getRenderProductItems()
				showTotalQuantityCartButton()
				showTotalSumm()
			}
		}

		/// увеличиваем кол-во позиции в корзине
		if (target.classList.contains('quantity__plus')) {
			const foundProduct = setFoundProductId(productsList, previousElement)

			foundProduct.productCurrent++
			foundProduct.productPriceSummNum += foundProduct.productPriceNum

			setTotalData(productsList, totalCurrentData)
			setLocalStorage(productsList, totalCurrentData)
			getRenderProductItems()
			showTotalQuantityCartButton()
			showTotalSumm()
		}
	})
}