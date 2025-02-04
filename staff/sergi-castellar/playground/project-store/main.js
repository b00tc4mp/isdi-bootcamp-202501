const products = [
    {
        id: 'fi-ci',
        brand: 'fiat',
        model: 'cinquecento',
        price: 10000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'sm-br',
        brand: 'smart',
        model: 'brabus',
        price: 25000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'op-co',
        brand: 'opel',
        model: 'corsa',
        price: 9000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'se-ib',
        brand: 'seat',
        model: 'ibiza',
        price: 15000,
        fuel: 'diesel',
        doors: 3
    },
    {
        id: 'fo-fi',
        brand: 'ford',
        model: 'fiesta',
        price: 12000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'to-co',
        brand: 'toyota',
        model: 'corolla',
        price: 18000,
        fuel: 'hybrid',
        doors: 3
    },
    {
        id: 'vw-go',
        brand: 'volkswagen',
        model: 'golf',
        price: 22000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'bm-3s',
        brand: 'bmw',
        model: '3 series',
        price: 35000,
        fuel: 'diesel',
        doors: 3
    },
    {
        id: 'au-a3',
        brand: 'audi',
        model: 'a3',
        price: 28000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'mb-cc',
        brand: 'mercedes-benz',
        model: 'c-class',
        price: 40000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ni-ju',
        brand: 'nissan',
        model: 'juke',
        price: 15000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'pe-20',
        brand: 'peugeot',
        model: '208',
        price: 13000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 're-cl',
        brand: 'renault',
        model: 'clio',
        price: 11000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'ki-ce',
        brand: 'kia',
        model: 'ceed',
        price: 17000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ho-ci',
        brand: 'honda',
        model: 'civic',
        price: 20000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'hy-tu',
        brand: 'hyundai',
        model: 'tucson',
        price: 23000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ma-cx',
        brand: 'mazda',
        model: 'cx-5',
        price: 27000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'vo-xc',
        brand: 'volvo',
        model: 'xc60',
        price: 45000,
        fuel: 'hybrid',
        doors: 5
    },
    {
        id: 'su-ou',
        brand: 'subaru',
        model: 'outback',
        price: 32000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'je-re',
        brand: 'jeep',
        model: 'renegade',
        price: 28000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'mi-ou',
        brand: 'mini',
        model: 'cooper',
        price: 22000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'la-ra',
        brand: 'land rover',
        model: 'range rover',
        price: 80000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'po-20',
        brand: 'porsche',
        model: '911',
        price: 120000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'te-mo',
        brand: 'tesla',
        model: 'model s',
        price: 90000,
        fuel: 'electric',
        doors: 5
    },
    {
        id: 'ch-ca',
        brand: 'chevrolet',
        model: 'camaro',
        price: 50000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'do-ch',
        brand: 'dodge',
        model: 'challenger',
        price: 55000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'fi-ty',
        brand: 'fiat',
        model: 'tipo',
        price: 14000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ci-gi',
        brand: 'citroen',
        model: 'grand c4',
        price: 19000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'sk-oc',
        brand: 'skoda',
        model: 'octavia',
        price: 21000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'da-da',
        brand: 'dacia',
        model: 'duster',
        price: 16000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'al-gu',
        brand: 'alfa romeo',
        model: 'giulia',
        price: 40000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'ja-xf',
        brand: 'jaguar',
        model: 'xf',
        price: 60000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'in-qx',
        brand: 'infiniti',
        model: 'qx50',
        price: 55000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'le-nx',
        brand: 'lexus',
        model: 'nx',
        price: 48000,
        fuel: 'hybrid',
        doors: 5
    },
    {
        id: 'mi-cx',
        brand: 'mitsubishi',
        model: 'asx',
        price: 25000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ss-ko',
        brand: 'ssangyong',
        model: 'korando',
        price: 22000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ta-hi',
        brand: 'tata',
        model: 'harrier',
        price: 18000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ge-ac',
        brand: 'genesis',
        model: 'g70',
        price: 45000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'lu-de',
        brand: 'lancia',
        model: 'delta',
        price: 20000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'sa-9-',
        brand: 'saab',
        model: '9-3',
        price: 15000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'da-sa',
        brand: 'daihatsu',
        model: 'sirion',
        price: 10000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'pr-ay',
        brand: 'proton',
        model: 'arya',
        price: 12000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'mo-co',
        brand: 'morris',
        model: 'minor',
        price: 8000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'ro-ph',
        brand: 'rover',
        model: 'phoenix',
        price: 9000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'tr-sp',
        brand: 'triumph',
        model: 'spitfire',
        price: 15000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'lo-el',
        brand: 'lotus',
        model: 'elise',
        price: 60000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'as-to',
        brand: 'aston martin',
        model: 'vantage',
        price: 150000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'bu-en',
        brand: 'bugatti',
        model: 'veyron',
        price: 2000000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'ko-ag',
        brand: 'koenigsegg',
        model: 'agera',
        price: 2500000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'pa-hu',
        brand: 'pagani',
        model: 'huayra',
        price: 3000000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'mc-72',
        brand: 'mclaren',
        model: '720s',
        price: 280000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'fe-ff',
        brand: 'ferrari',
        model: 'f8 tributo',
        price: 350000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'la-hu',
        brand: 'lamborghini',
        model: 'huracan',
        price: 300000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'ma-gt',
        brand: 'maserati',
        model: 'granturismo',
        price: 150000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'ro-wr',
        brand: 'rolls-royce',
        model: 'wraith',
        price: 400000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'be-co',
        brand: 'bentley',
        model: 'continental',
        price: 250000,
        fuel: 'gasoline',
        doors: 3
    },
    {
        id: 'ca-es',
        brand: 'cadillac',
        model: 'escalade',
        price: 100000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'li-na',
        brand: 'lincoln',
        model: 'navigator',
        price: 90000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'hu-h2',
        brand: 'hummer',
        model: 'h2',
        price: 80000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'go-sa',
        brand: 'gmc',
        model: 'sierra',
        price: 60000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ra-4r',
        brand: 'ram',
        model: '1500',
        price: 50000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'fo-ra',
        brand: 'ford',
        model: 'ranger',
        price: 35000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'to-ta',
        brand: 'toyota',
        model: 'tacoma',
        price: 40000,
        fuel: 'gasoline',
        doors: 5
    },
    {
        id: 'ni-ti',
        brand: 'nissan',
        model: 'titan',
        price: 45000,
        fuel: 'diesel',
        doors: 5
    },
    {
        id: 'ch-si',
        brand: 'chevrolet',
        model: 'silverado',
        price: 55000,
        fuel: 'diesel',
        doors: 5
    }
];

let cart = [];
let orders = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupFilters();
    loadOrders();
});

// Display products in the grid
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('products');
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.brand} ${product.model}</h3>
            <div class="product-info">
                <div class="product-specs">
                    <span class="spec-item">Fuel: ${product.fuel}</span>
                    <span class="spec-item">${product.doors} Doors</span>
                </div>
                <p class="price">${product.price}€</p>
                <div class="add-to-cart">
                    <input type="number" min="1" value="1" id="qty-${product.id}">
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Search and filter functionality
function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const filterType = document.getElementById('filterType');
    const filterValue = document.getElementById('filterValue');

    searchInput.addEventListener('input', handleSearch);
    filterType.addEventListener('change', updateFilterValues);
    filterValue.addEventListener('change', handleFilter);
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.id.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.model.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function updateFilterValues() {
    const filterType = document.getElementById('filterType').value;
    const filterValue = document.getElementById('filterValue');
    filterValue.innerHTML = '<option value="">Select value</option>';

    if (filterType === 'all') {
        filterValue.disabled = true;
        displayProducts(products);
        return;
    }

    filterValue.disabled = false;
    const uniqueValues = [...new Set(products.map(product => product[filterType]))];
    uniqueValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        filterValue.appendChild(option);
    });
}

function handleFilter() {
    const filterType = document.getElementById('filterType').value;
    const filterValue = document.getElementById('filterValue').value;

    if (filterType === 'all' || !filterValue) {
        displayProducts(products);
        return;
    }

    const filteredProducts = products.filter(product => 
        product[filterType].toString() === filterValue
    );
    displayProducts(filteredProducts);
}

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);

    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    const ordersSection = document.getElementById('orders');
    
    cartModal.classList.toggle('active');
    ordersSection.classList.add('hidden');
    
    if (cartModal.classList.contains('active')) {
        displayCart();
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
        document.body.style.overflow = ''; // Restore scrolling when modal is closed
    }

    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            toggleCart();
        }
    });
}

// Add keyboard support for closing modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const cartModal = document.getElementById('cartModal');
        if (cartModal.classList.contains('active')) {
            toggleCart();
        }
    }
});

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.product.brand} ${item.product.model}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <span class="cart-item-price">${item.product.price * item.quantity}€</span>
        `;
        cartItems.appendChild(cartItem);
    });

    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('iva').textContent = iva.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Checkout and Orders functionality
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        items: [...cart],
        subtotal: parseFloat(document.getElementById('subtotal').textContent),
        iva: parseFloat(document.getElementById('iva').textContent),
        total: parseFloat(document.getElementById('total').textContent)
    };

    orders.push(order);
    saveOrders();
    
    cart = [];
    updateCartCount();
    displayCart();
    
    alert('Order completed successfully!');
    displayOrders();
}

function saveOrders() {
    localStorage.setItem('carShopOrders', JSON.stringify(orders));
}

function loadOrders() {
    const savedOrders = localStorage.getItem('carShopOrders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

function displayOrders() {
    const ordersSection = document.getElementById('orders');
    const ordersList = document.getElementById('ordersList');
    const cartSection = document.getElementById('cart');
    
    ordersSection.classList.remove('hidden');
    cartSection.classList.add('hidden');
    
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        orderElement.innerHTML = `
            <h3>Order #${order.id} - ${order.date}</h3>
            ${order.items.map(item => 
                `<p>${item.product.brand} ${item.product.model} x${item.quantity} - ${item.product.price * item.quantity}€</p>`
            ).join('')}
            <p><strong>Subtotal:</strong> ${order.subtotal}€</p>
            <p><strong>IVA (21%):</strong> ${order.iva}€</p>
            <p><strong>Total:</strong> ${order.total}€</p>
        `;
        ordersList.appendChild(orderElement);
    });
}