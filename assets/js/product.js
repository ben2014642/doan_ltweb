var queryDict = [];
var imgProduct = document.querySelector(".product-info__img");
var nameProduct = document.querySelector(".product-info__intro-title");
var priceProduct = document.querySelector(".product-info__intro-price");
var btnAddCart = document.querySelector(".product-info__add");
var increase = document.querySelector(".increase");
var decrease = document.querySelector(".decrease");

var product = {
	idProduct: 1,
	products: [{
			id: 1,
			name: 'Royal Canin Maxi 5+',
			price: 22,
			img: 'assets/img/product/1.png'
		},
		{
			id: 2,
			name: 'Wet Cat Food',
			price: 46,
			img: 'assets/img/product/2.png'
		},
		{
			id: 3,
			name: 'Dry Dog Food',
			price: 15,
			img: 'assets/img/product/3.png'
		},
		{
			id: 4,
			name: 'Royal Canin Exigent Cats',
			price: 23,
			img: 'assets/img/product/4.png'
		},
		{
			id: 5,
			name: 'Rocco Classic',
			price: 25,
			img: 'assets/img/product/5.png'
		},
		{
			id: 6,
			name: 'Veterinary Diet Canine',
			price: 22,
			img: 'assets/img/product/6.png'
		},
		{
			id: 7,
			name: 'Wilderness Dry Dog Food',
			price: 43,
			img: 'assets/img/product/7.png'
		},
		{
			id: 8,
			name: 'Wellbeloved Dry Dog Food',
			price: 61,
			img: 'assets/img/product/8.png'
		},
	],
	getIdProduct: function() {
		// Stackoverflow
		location.search.substr(1).split("&").forEach(item => {
			let a = item.split("=")[1];
			queryDict.push(a);
		})

		this.idProduct = queryDict[0] ? queryDict[0] : 1;
	},
	renderProduct: function() {
		imgProduct.src = this.products[this.idProduct - 1].img;
		nameProduct.textContent = this.products[this.idProduct - 1].name;
		priceProduct.textContent = '$' + this.products[this.idProduct - 1].price + '.00';
	},
	addProductToCart: function() {
		var getProducts = JSON.parse(window.localStorage.getItem('myCart')) ?? [];
		var quantityValue = document.querySelector(".product-info__quantity-number").textContent; //lấy số lượng sản phẩm mà người dùng đã bấm
		index = getProducts.findIndex(pr => {
			return pr.id == this.idProduct;
		})
		if (index != -1) {
			getProducts[index].quantity += parseInt(quantityValue);
		} else {
			let product = {
				id: this.idProduct,
				name: this.products[this.idProduct - 1].name,
				quantity: 1,
				price: this.products[this.idProduct - 1].price,
				img: this.products[this.idProduct - 1].img,
			}
			getProducts.push(product);
		}
		window.localStorage.setItem("myCart", JSON.stringify(getProducts));
		alert("Thêm sản phẩm thành công !!!");
		showNoti(getProducts);
	},
	// xử lý các sự kiện
	handleEvent: function() {
		const _this = this;
		btnAddCart.onclick = function() {
			_this.addProductToCart();
		}

		increase.onclick = function() {
			var quantity = document.querySelector(".product-info__quantity-number");
			quantity.textContent = parseInt(quantity.textContent) + 1;
		}

		decrease.onclick = function() {
			var quantity = document.querySelector(".product-info__quantity-number");
			var quantityCur = parseInt(quantity.textContent) - 1;
			if (quantityCur < 1) {
				quantity.textContent = 1;
			} else {
				quantity.textContent = quantityCur;
			}
		}
	},
	start: function() {
		this.getIdProduct();
		this.renderProduct();
		this.handleEvent();
	}
}

product.start();