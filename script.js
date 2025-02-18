document.addEventListener('DOMContentLoaded', () =>{
    const products = [
        {id: 1, name: "Product 1", price: 29.99},
        {id: 2, name: "Product 2", price: 69.99},
        {id: 3, name: "Product 3", price: 32.99},
        {id: 4, name: "Product 4", price: 45.19},
        {id: 5, name: "Product 5", price: 23.99},
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];  // load card from local storage

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // display products
    products.forEach(product =>{
        const productDiv = document.createElement("div")
        productDiv.classList.add("product")
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv); 
    });

    // add product to cart when button is clicked
    productList.addEventListener('click', (e) =>{
        if(e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId)
            addToCart(product)
        } 
    });

    // add product in cart
    function addToCart(product){
        cart.push(product);
        updateLocalStorage();
        renderCart();
    }

    function updateLocalStorage(){
        localStorage.setItem("cart", JSON.stringify(cart));  // save cart to local storage
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if(cart.length > 0){
            emptyCartMessage.classList.add("hidden")
            cartTotalMessage.classList.remove("hidden")

            cart.forEach((item, index) => {
                totalPrice += item.price
                const cartItem = document.createElement('div')
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                `;

                cartItems.appendChild(cartItem);
                
            });
            totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`
        }else {
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
            totalPriceDisplay.textContent = `$0.00`
        }
    }

    checkOutBtn.addEventListener('click', () => {
        cart = []; // empty cart
        updateLocalStorage();
        alert("Checked out successfully")
        renderCart();
    });

    renderCart();

});