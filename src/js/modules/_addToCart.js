'use strict'
import { setColorBtn } from './_setColorBtn.js'

export function addToCart() {

	const forCart = {
		addBtnCard: document.querySelectorAll('.add-order'),
		showTotlalQuantity: document.querySelector('.cart__current'),
		categoryWrapper: document.querySelector('.menu__category-wrapper'),
	}

	const getCards = async () => {
		const response = await fetch('../../files/cards.json')
		const data = await response.json()
		return data
	}

	const creatCards = async () => {
		const DATA = await getCards()
		if (forCart.categoryWrapper) {
			forCart.categoryWrapper.innerHTML += DATA.map(category => `
		
			<div class="menu__category category">
				<h3 class="category__title">${category.categoryName}</h3>
				<div class="category__cards">
				${category.productList.map(product => `
				<div class="category__card card">
						<div class="card__image">
						${(product.nameplate) ? `<div class="card__nameplate">
						<span class="card__nameplate-img">
							<img src="../../assets/images/icon/hit.svg" alt="Хит">
						</span>
						<span>Хит</span>
					</div>` : ``}
							<a data-fancybox data-caption="${product.name}"
								data-src="${product.imageSrc}">
								<img class="img"
									src="${product.imageSrc}"
									alt="${product.name}" loading="lazy"
									width="385" height="385">
							</a>
						</div>
						<button data-product-id="${product.id}" class="card__button-add add-order">
							<img src="../../assets/images/icon/add.svg" alt="+" width="42">
						</button>
						<div class="card__description">
							<h4 class="card__name">${product.name}</h4>
							<div class="card__characteristics">
								<span class="card__weight"><span>${product.weight}</span>г</span>
								<span class="card__solid"></span>
								<span class="card__price"><span>${product.price}</span>р</span>
							</div>
						</div>
					</div>
				`).join('')}
				</div>
			</div>	
		`).join('')
		}
	}

	creatCards()

	const showTotalQuantityCartButton = () => {
		const totalCurrentData = JSON.parse(localStorage.getItem('totalCurrentDataDOM')) || {}
		const totalQuantity = totalCurrentData.totalCurrent || 0
		forCart.showTotlalQuantity.innerText = totalQuantity
	}

	showTotalQuantityCartButton()

	forCart.categoryWrapper.addEventListener('click', (e) => {
		const target = e.currentTarget
		const addBtn = target.querySelector('.add-order')
		if (addBtn) {
			const targetBtnAdd = e.currentTarget
			const productId = targetBtnAdd.dataset.productId

			const totalCurrentData = JSON.parse(localStorage.getItem('totalCurrentDataDOM')) || {}
			const productsList = JSON.parse(localStorage.getItem('addToCartProductsDOM')) || []

			let foundProduct = productsList.find(product => product.productId === productId)

			if (foundProduct) {
				foundProduct.productCurrent++
				foundProduct.productPriceSummNum = productPriceNum * foundProduct.productCurrent
			} else {
				const product = {
					productCurrent: 1,
					productId,
					productName,
					productWeight,
					productPriceNum,
					productPriceSummNum,
					productImgSrc,
				}

				productsList.push(product)
			}

			let totalSum = 0
			let totalCurrent = 0

			productsList.forEach(product => {
				totalSum += parseFloat(product.productPriceSummNum)
				totalCurrent += parseFloat(product.productCurrent)
			})

			totalCurrentData.totalSum = totalSum
			totalCurrentData.totalCurrent = totalCurrent

			localStorage.setItem('totalCurrentDataDOM', JSON.stringify(totalCurrentData))
			localStorage.setItem('addToCartProductsDOM', JSON.stringify(productsList))

			showTotalQuantityCartButton()
			setColorBtn()
		}
	})

	// forCart.addBtnCard.forEach(el => {
	// 	el.addEventListener('click', (e) => {
	// 		const targetBtn = e.currentTarget
	// 		const productId = targetBtn.dataset.productId

	// 		const prevElement = targetBtn.previousElementSibling
	// 		const nextElement = targetBtn.nextElementSibling

	// 		const productImgSrc = targetBtn.parentNode.querySelector('a img').src || prevElement.querySelector('img').src
	// 		const productName = (targetBtn.parentNode.querySelector('.add-to-order__card-name') || {}).innerText || (nextElement.querySelector('.card__name') || {}).innerText
	// 		const productWeight = targetBtn.parentNode.querySelector('.card__weight span').innerText
	// 		const productPrice = targetBtn.parentNode.querySelector('.card__price span').innerText
	// 		const productPriceSumm = targetBtn.parentNode.querySelector('.card__price span').innerText
	// 		const productPriceNum = Number(productPrice)
	// 		const productPriceSummNum = Number(productPriceSumm)
	// 		const totalCurrentData = JSON.parse(localStorage.getItem('totalCurrentDataDOM')) || {}
	// 		const productsList = JSON.parse(localStorage.getItem('addToCartProductsDOM')) || []

	// 		let foundProduct = productsList.find(product => product.productId === productId)

	// 		if (foundProduct) {
	// 			foundProduct.productCurrent++
	// 			foundProduct.productPriceSummNum = productPriceNum * foundProduct.productCurrent
	// 		} else {
	// 			const product = {
	// 				productCurrent: 1,
	// 				productId,
	// 				productName,
	// 				productWeight,
	// 				productPriceNum,
	// 				productPriceSummNum,
	// 				productImgSrc,
	// 			}

	// 			productsList.push(product)
	// 		}

	// 		let totalSum = 0
	// 		let totalCurrent = 0

	// 		productsList.forEach(product => {
	// 			totalSum += parseFloat(product.productPriceSummNum)
	// 			totalCurrent += parseFloat(product.productCurrent)
	// 		})

	// 		totalCurrentData.totalSum = totalSum
	// 		totalCurrentData.totalCurrent = totalCurrent

	// 		localStorage.setItem('totalCurrentDataDOM', JSON.stringify(totalCurrentData))
	// 		localStorage.setItem('addToCartProductsDOM', JSON.stringify(productsList))

	// 		showTotalQuantityCartButton()
	// 		setColorBtn()
	// 	})
	// })
}