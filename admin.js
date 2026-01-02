document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const dbUrl = 'http://localhost:3000/products';

    // Fetch and display products
    async function fetchProducts() {
        const res = await fetch(dbUrl);
        const data = await res.json();
        renderProducts(data);
         renderTable(data);
        
    }

    // Render product list with image and tag
    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.img_src}" alt="${product.name}" style="max-width: 100%; height: auto;" />
                <p>Price: ₹${product.price}</p>
                <p>Category: ${product.category}</p>
                <p>Tag: ${product.tag || 'None'}</p>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            `;
            
            productList.appendChild(card);
        });
    }
    // Render table with products
function renderTable(products) {
    productTableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>₹${product.price}</td>
            <td>${product.category}</td>
            <td><img src="${product.img_src}" alt="${product.name}" style="width: 60px; height: auto;" /></td>
            <td>${product.tag || 'None'}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        row.querySelector('.edit-btn').addEventListener('click', () => editProduct(product.id));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(product.id));

        productList.appendChild(row);
    });
}

    // Add or update product
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('product-id').value;
        const name = document.getElementById('item-name').value.trim();
        const price = parseFloat(document.getElementById('item-price').value);
        const category = document.getElementById('item-category').value.trim();
        const img_src = document.getElementById('item-img').value.trim();
        const tag = document.getElementById('item-tags').value.trim();

        const productData = { name, price, category, img_src, tag };

        if (id) {
            await fetch(`${dbUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...productData, id: parseInt(id) })
            });
        } else {
            await fetch(dbUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }

        form.reset();
        document.getElementById('product-id').value = '';
        fetchProducts();
    });

    // Edit product
    window.editProduct = async (id) => {
        const res = await fetch(`${dbUrl}/${id}`);
        const product = await res.json();
        document.getElementById('product-id').value = product.id;
        document.getElementById('item-name').value = product.name;
        document.getElementById('item-price').value = product.price;
        document.getElementById('item-category').value = product.category;
        document.getElementById('item-img').value = product.img_src;
        document.getElementById('item-tags').value = product.tag;
    };

    // Delete product
    window.deleteProduct = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await fetch(`${dbUrl}/${id}`, {
                method: 'DELETE'
            });
            fetchProducts();
        }
    };

    fetchProducts();
});

