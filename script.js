document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;//exmp /home/egi/Desktop/new.api/categories.html

    if (path.includes('categories.html')) {
        fetchCategories();
    } else if (path.includes('products.html')) {
        fetchAllProducts();
    }

    async function fetchCategories() {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const categories = await response.json();
            console.log("Categories",categories) // ['electronics', 'jewelery', "men's clothing", "women's clothing"]
            displayCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        
    }

    function displayCategories(categories) {
        const categoryList = document.getElementById('categoryList');
        //categoryList.innerHTML = ''; 

        categories.forEach(category => { //category=> cdo kategori e mare nga lista e kategorive te mare nga API ...per cdo categori nga categories 
            
            const listItem = document.createElement('li'); //ke krijuar nje element li 
            listItem.textContent = category; //per  secilen nga lista e kategorive 
            listItem.addEventListener('click', () => fetchProductsByCategory(category));
            categoryList.appendChild(listItem);
        });
    }

    async function fetchProductsByCategory(category) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch products for ${category}`);
            }
            const products = await response.json();
            console.log("Products" , products); //produktet ne secilen  kategori
            displayProducts(products);
        } catch (error) {
            console.error(`Error fetching products in category "${category}":`, error);
        }
        
    }


    async function fetchAllProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch all products');
            }
            const products = await response.json();
            console.log("AllProducts" , products);// te gjitha produktet
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching all products:', error);
        }
        
    }


    function displayProducts(products) {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const listItem = document.createElement('li'); //krijojm li
            const productContainer = document.createElement('div');//brenda li krijojm div
            productContainer.classList.add('product-container');//i shtojm kl

            const image = document.createElement('img');
            image.src = product.image;
            image.alt = product.title;
            productContainer.appendChild(image); //div i shtojm imazhin

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




});