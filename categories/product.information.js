// product.information.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error('No product ID found in URL parameters');
    }
});

async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const productDetails = await response.json();
        console.log("Product details:", productDetails);

        displayProductDetails(productDetails);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('productDetails');

    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    productContainer.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = product.title;
    productContainer.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `Price: $${product.price}`;
    productContainer.appendChild(price);

    const description = document.createElement('p');
    description.textContent = product.description;
    productContainer.appendChild(description);

    productDetailsContainer.appendChild(productContainer);
}

async function showProductDetails(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const productDetails = await response.json();
        console.log("Product details:", productDetails);
        window.location.href = `product.information.html?id=${productId}`;
        
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}


