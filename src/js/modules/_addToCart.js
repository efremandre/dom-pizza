'use strict'
import { setColorBtn } from './_setColorBtn.js'

export function addToCart() {

	const forCart = {
		addBtnCard: document.querySelectorAll('.add-order'),
		showTotlalQuantity: document.querySelector('.cart__current'),
		categoryWrapper: document.querySelector('.menu__category-wrapper'),
	}

	const showTotalQuantityCartButton = () => {
		const totalCurrentData = JSON.parse(localStorage.getItem('totalCurrentDataDOM')) || {}
		const totalQuantity = totalCurrentData.totalCurrent || 0
		forCart.showTotlalQuantity.innerText = totalQuantity
	}

	showTotalQuantityCartButton()

	forCart.addBtnCard.forEach(el => {
		el.addEventListener('click', (e) => {
			const targetBtn = e.currentTarget
			const productId = targetBtn.dataset.productId

			const prevElement = targetBtn.previousElementSibling
			const nextElement = targetBtn.nextElementSibling

			const productImgSrc = targetBtn.parentNode.querySelector('a img').src || prevElement.querySelector('img').src
			const productName = (targetBtn.parentNode.querySelector('.add-to-order__card-name') || {}).innerText || (nextElement.querySelector('.card__name') || {}).innerText
			const productWeight = targetBtn.parentNode.querySelector('.card__weight span').innerText
			const productPrice = targetBtn.parentNode.querySelector('.card__price span').innerText
			const productPriceSumm = targetBtn.parentNode.querySelector('.card__price span').innerText
			const productPriceNum = Number(productPrice)
			const productPriceSummNum = Number(productPriceSumm)
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
		})
	})
}