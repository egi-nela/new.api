document.addEventListener('DOMContentLoaded', (event) => {
    fetchCategories();
    fetchProductsByCategory();
   
});
async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await response.json();
        console.log("Categories", categories);
        displayCategories(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

function displayCategories(categories) {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';

    categories.forEach(category => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `${category.toLowerCase().replace(/\s+/g, '_')}.html`;
        link.textContent = category;
        listItem.appendChild(link);
        listItem.addEventListener('click', async (event) => {
            event.preventDefault();
            await fetchProductsByCategory(category);
            window.location.href = link.href;
        });
        categoryList.appendChild(listItem);
    });
}


async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/men's%20clothing`);
        if (!response.ok) {
            throw new Error(`Failed to fetch products for ${category}`);
        }
        const products = await response.json();
        console.log("Products", products);
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

        listItem.addEventListener('click', () => showProductDetails(product.id)); //
    });
    }

    const button = document.getElementById('goToIndexButton');
    button.addEventListener('click', function() {
        window.location.href = '../index.html'; 
    });

    //
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
    