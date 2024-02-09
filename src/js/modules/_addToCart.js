'use strict'

export function addToCart() {

	const forCart = {
		addBtnCard: document.querySelectorAll('.card__button-add'),
		showTotlalQuantity: document.querySelector('.cart__current'),
		totalCurrentData: JSON.parse(localStorage.getItem('totalCurrentDataDOM')) || {},
		productsList: JSON.parse(localStorage.getItem('addToCartProductsDOM')) || [],
		isActiveBtn: [],
	}

	const showTotalQuantityCartButton = () => {
		const totalQuantity = forCart.totalCurrentData.totalCurrent || 0
		forCart.showTotlalQuantity.innerText = totalQuantity
	}

	showTotalQuantityCartButton()

	forCart.addBtnCard.forEach(el => {

		el.addEventListener('click', (e) => {
			const targetBtn = e.currentTarget
			const productId = targetBtn.dataset.productId

			const prevElement = targetBtn.previousElementSibling
			const nextElement = targetBtn.nextElementSibling

			const productImgSrc = prevElement.querySelector('img').src
			const productName = nextElement.querySelector('.card__name').innerText
			const productWeight = nextElement.querySelector('.card__weight span').innerText
			const productPrice = nextElement.querySelector('.card__price span').innerText
			const productPriceNum = Number(productPrice)

			let foundProduct = forCart.productsList.find(product => product.productId === productId)

			if (foundProduct) {
				foundProduct.productCurrent++
				foundProduct.productPriceNum += productPriceNum
			} else {
				const product = {
					buttonAdd: true,
					productCurrent: 1,
					productId,
					productName,
					productWeight,
					productPriceNum,
					productImgSrc,
				}

				forCart.productsList.push(product)
			}

			let totalSum = 0
			let totalCurrent = 0

			forCart.productsList.forEach(product => {
				totalSum += parseFloat(product.productPriceNum) * product.productCurrent
				totalCurrent += parseFloat(product.productCurrent)
			})

			forCart.totalCurrentData.totalSum = totalSum
			forCart.totalCurrentData.totalCurrent = totalCurrent

			localStorage.setItem('totalCurrentDataDOM', JSON.stringify(forCart.totalCurrentData))
			localStorage.setItem('addToCartProductsDOM', JSON.stringify(forCart.productsList))

			console.log(forCart.productsList)
			console.log(forCart.totalCurrentData)

			showTotalQuantityCartButton()
		})

	})
}