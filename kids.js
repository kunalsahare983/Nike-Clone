document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    document.body.appendChild(paginationContainer);

    const itemsPerPage = 30; // 3 cards per row × 10 rows
    let currentPage = 1;
    let kidsProducts = [];

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            kidsProducts = data.products.filter(product => product.category === 'kids');
            renderPage(currentPage);
            renderPagination();
        })
        .catch(error => console.error('Error loading products:', error));

    function renderPage(page) {
        container.innerHTML = ''; // Clear previous products
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageProducts = kidsProducts.slice(start, end);

        pageProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img_src}" alt="${product.name}" />
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-tag">${product.tag}</div>
                <button class="add-to-cart">Add to Cart</button>
            `;

            // Add event listener for Add to Cart button
            card.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart(product);
            });

            container.appendChild(card);
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(menProducts.length / itemsPerPage);

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
                renderPagination();
            }
        };

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
                renderPagination();
            }
        };

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(document.createTextNode(` Page ${currentPage} of ${totalPages} `));
        paginationContainer.appendChild(nextButton);
    }

    function addToCart(product) {
        // This is where you can handle the cart logic.
        // For example, saving it to localStorage or showing a message.
        alert(`${product.name} added to cart!`);
        console.log('Cart:', product);
    }
});
