const state = {
    products: [],
    cart: JSON.parse(localStorage.getItem("devstore-cart") || "[]"),
    activeCategory: "all",
    searchTerm: "",
};

const productsGrid = document.getElementById("productsGrid");
const categoryList = document.getElementById("categoryList");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const retryButton = document.getElementById("retryButton");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartButton = document.getElementById("closeCartButton");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(price));
}


function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}


function getProductEmoji(category, name) {
    const text = `${category} ${name}`.toLowerCase();

    if (text.includes("laptop")) return "💻";
    if (text.includes("phone") || text.includes("mobile")) return "📱";
    if (text.includes("headphone") || text.includes("audio")) return "🎧";
    if (text.includes("keyboard")) return "⌨️";
    if (text.includes("mouse")) return "🖱️";
    if (text.includes("monitor") || text.includes("display")) return "🖥️";
    if (text.includes("camera")) return "📷";
    if (text.includes("tablet")) return "📲";
    if (text.includes("watch")) return "⌚";
    if (text.includes("speaker")) return "🔊";

    return "📦";
}


function saveCart() {
    localStorage.setItem("devstore-cart", JSON.stringify(state.cart));
}


function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


function updateCartCount() {
    const count = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = count;
}


function getCartTotal() {
    return state.cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    );
}


function addToCart(productId) {
    const product = state.products.find(
        (item) => item.id === productId
    );

    if (!product) {
        return;
    }

    const existingItem = state.cart.find(
        (item) => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            category: product.category,
            quantity: 1,
        });
    }

    saveCart();
    updateCartCount();
    renderCart();

    showToast(`${product.name} added to cart`);
}


function removeFromCart(productId) {
    state.cart = state.cart.filter(
        (item) => item.id !== productId
    );

    saveCart();
    updateCartCount();
    renderCart();
}


function changeQuantity(productId, change) {
    const item = state.cart.find(
        (cartItem) => cartItem.id === productId
    );

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartCount();
    renderCart();
}


function renderCart() {
    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something you love.</p>
            </div>
        `;

        cartTotal.textContent = formatPrice(0);
        return;
    }

    cartItems.innerHTML = state.cart
        .map(
            (item) => `
                <div class="cart-item">

                    <div class="cart-item-image">
                        ${getProductEmoji(item.category, item.name)}
                    </div>

                    <div>
                        <div class="cart-item-name">
                            ${escapeHtml(item.name)}
                        </div>

                        <div class="cart-item-price">
                            ${formatPrice(item.price)}
                        </div>

                        <div class="quantity-controls">

                            <button
                                type="button"
                                data-action="decrease"
                                data-id="${item.id}"
                            >
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                type="button"
                                data-action="increase"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>
                    </div>

                    <button
                        class="remove-item"
                        type="button"
                        data-action="remove"
                        data-id="${item.id}"
                        aria-label="Remove ${escapeHtml(item.name)}"
                    >
                        ×
                    </button>

                </div>
            `
        )
        .join("");

    cartTotal.textContent = formatPrice(getCartTotal());
}


function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
}


function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
}


function createProductCard(product) {
    return `
        <article class="product-card">

            <div class="product-image">
                <span class="product-emoji">
                    ${getProductEmoji(product.category, product.name)}
                </span>
            </div>

            <div class="product-info">

                <div class="product-category">
                    ${escapeHtml(product.category)}
                </div>

                <h3 class="product-name">
                    ${escapeHtml(product.name)}
                </h3>

                <p class="product-description">
                    ${escapeHtml(product.description)}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-button"
                        type="button"
                        data-product-id="${product.id}"
                    >
                        + Add
                    </button>

                </div>

            </div>

        </article>
    `;
}


function getFilteredProducts() {
    const categoryProducts = state.products.filter((product) => {
        return (
            state.activeCategory === "all" ||
            product.category.toLowerCase() ===
                state.activeCategory.toLowerCase()
        );
    });

    if (state.searchTerm === "") {
        return categoryProducts;
    }

    const searchTerm = state.searchTerm;

    const directMatches = categoryProducts.filter((product) => {
        const name = product.name.toLowerCase();
        const category = product.category.toLowerCase();

        return (
            name.includes(searchTerm) ||
            category.includes(searchTerm)
        );
    });

    if (directMatches.length > 0) {
        return directMatches;
    }

    return categoryProducts.filter((product) => {
        const description = product.description.toLowerCase();

        return description.includes(searchTerm);
    });
}


function renderProducts() {
    const filteredProducts = getFilteredProducts();

    productsGrid.innerHTML = filteredProducts
        .map(createProductCard)
        .join("");

    productsGrid.classList.remove("hidden");

    if (filteredProducts.length === 0) {
        productsGrid.classList.add("hidden");
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }
}


function renderCategories() {
    const categories = [
        ...new Set(
            state.products
                .map((product) => product.category)
                .filter(Boolean)
        ),
    ].sort();

    categoryList.innerHTML = `
        <button
            class="category-button ${
                state.activeCategory === "all" ? "active" : ""
            }"
            data-category="all"
        >
            All Products
        </button>

        ${categories
            .map(
                (category) => `
                    <button
                        class="category-button ${
                            state.activeCategory.toLowerCase() ===
                            category.toLowerCase()
                                ? "active"
                                : ""
                        }"
                        data-category="${escapeHtml(category)}"
                    >
                        ${escapeHtml(category)}
                    </button>
                `
            )
            .join("")}
    `;
}


async function loadProducts() {
    loadingState.classList.remove("hidden");
    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");
    productsGrid.classList.add("hidden");

    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error(
                `Product API returned ${response.status}`
            );
        }

        const products = await response.json();

        if (!Array.isArray(products)) {
            throw new Error("Invalid product API response");
        }

        state.products = products;

        renderCategories();
        renderProducts();

        loadingState.classList.add("hidden");
    } catch (error) {
        console.error("Failed to load products:", error);

        loadingState.classList.add("hidden");
        productsGrid.classList.add("hidden");
        errorState.classList.remove("hidden");
    }
}


searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value
        .trim()
        .toLowerCase();

    renderProducts();
});


categoryList.addEventListener("click", (event) => {
    const button = event.target.closest(
        ".category-button"
    );

    if (!button) {
        return;
    }

    state.activeCategory =
        button.dataset.category || "all";

    renderCategories();
    renderProducts();
});


productsGrid.addEventListener("click", (event) => {
    const button = event.target.closest(
        ".add-button"
    );

    if (!button) {
        return;
    }

    const productId = Number(
        button.dataset.productId
    );

    addToCart(productId);
});


cartItems.addEventListener("click", (event) => {
    const button = event.target.closest(
        "[data-action]"
    );

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "increase") {
        changeQuantity(productId, 1);
    }

    if (action === "decrease") {
        changeQuantity(productId, -1);
    }

    if (action === "remove") {
        removeFromCart(productId);
        showToast("Product removed from cart");
    }
});


cartButton.addEventListener("click", openCart);

closeCartButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeCart();
    }
});


retryButton.addEventListener("click", loadProducts);


checkoutButton.addEventListener("click", () => {
    if (state.cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    showToast("Checkout will be available soon");
});


updateCartCount();
renderCart();
loadProducts();