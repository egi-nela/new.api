document.addEventListener('DOMContentLoaded', (event) => {
    if (window.products && window.products.length) {
        displayProducts(window.products);
    } else {
        const category = 'electronics';
        fetchProductsByCategory(category);
    }
});

async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/electronics`);
        if (!response.ok) {
            throw new Error(`Failed to fetch products for ${category}`);
        }
        const products = await response.json();
        console.log("Products", products); 
        window.products = products;
        displayProducts(products);
    } catch (error) {
        console.error(`Error fetching products in category "${category}":`, error);
    }
}


function displayProducts(products) {
const productList = document.getElementById('productList');
productList.innerHTML = ''; 
products.forEach(product => {
    const listItem = document.createElement('li'); 
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

    listItem.appendChild(productContainer);
    productList.appendChild(listItem);
});
}
