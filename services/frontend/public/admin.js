const productForm = document.getElementById("product-form");
const productId = document.getElementById("product-id");
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");

const saveButton = document.getElementById("save-button");
const cancelEditButton = document.getElementById("cancel-edit");

const formTitle = document.getElementById("form-title");
const productsContainer = document.getElementById("admin-products");

const loadingMessage = document.getElementById("admin-loading");
const errorMessage = document.getElementById("admin-error");

const refreshButton = document.getElementById("refresh-products");
const toast = document.getElementById("admin-toast");
const productCount = document.getElementById("product-count");


let products = [];


/* -----------------------------
   Load Products
----------------------------- */

async function loadProducts() {
    loadingMessage.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        products = await response.json();

        renderProducts();

    } catch (error) {
        console.error(error);

        errorMessage.textContent =
            "Unable to load products. Make sure the Product Catalog service is running.";

        errorMessage.classList.remove("hidden");

    } finally {
        loadingMessage.classList.add("hidden");
    }
}


/* -----------------------------
   Render Products
----------------------------- */

function renderProducts() {

    productCount.textContent = products.length;
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="admin-message">
                No products found.
            </div>
        `;

        return;
    }

    productsContainer.innerHTML = products.map((product) => {
        return `
            <article class="admin-product-card">

                <div class="admin-product-card-top">

                    <div class="admin-product-icon">
                        ${getProductIcon(product)}
                    </div>

                    <span class="admin-category">
                        ${escapeHtml(product.category)}
                    </span>

                </div>


                <div class="admin-product-card-body">

                    <h3>
                        ${escapeHtml(product.name)}
                    </h3>

                    <p class="admin-product-description">
                        ${escapeHtml(product.description)}
                    </p>

                    <div class="admin-product-price">
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </div>

                </div>


                <div class="admin-product-card-actions">

                    <button
                        class="secondary-button edit-button"
                        data-id="${product.id}"
                        title="Edit product"
                    >
                        Edit
                    </button>

                    <button
                        class="danger-icon-button delete-button"
                        data-id="${product.id}"
                        title="Delete product"
                        aria-label="Delete product"
                    >
                        🗑
                    </button>

                </div>

            </article>
        `;
    }).join("");


    document.querySelectorAll(".edit-button").forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            startEdit(id);
        });
    });


    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            deleteProduct(id);
        });
    });
}


/* -----------------------------
   Add Product
----------------------------- */

productForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const product = {
        name: nameInput.value.trim(),
        description: descriptionInput.value.trim(),
        price: Number(priceInput.value),
        category: categoryInput.value,
    };


    const editingId = productId.value;


    try {

        saveButton.disabled = true;

        saveButton.textContent =
            editingId ? "Updating..." : "Adding...";


        let response;


        if (editingId) {

            response = await fetch(
                `/api/products/${editingId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(product),
                }
            );

        } else {

            response = await fetch(
                "/api/products",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(product),
                }
            );

        }


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail ||
                data.error ||
                "Operation failed"
            );

        }


        showToast(
            editingId
                ? "Product updated successfully"
                : "Product added successfully"
        );


        resetForm();

        await loadProducts();


    } catch (error) {

        console.error(error);

        showToast(error.message);


    } finally {

        saveButton.disabled = false;

        saveButton.textContent =
            productId.value
                ? "Update Product"
                : "Add Product";
    }

});


/* -----------------------------
   Start Editing
----------------------------- */

function startEdit(id) {

    const product = products.find(
        (item) => item.id === id
    );


    if (!product) {
        return;
    }


    productId.value = product.id;

    nameInput.value = product.name;

    categoryInput.value = product.category;

    priceInput.value = product.price;

    descriptionInput.value = product.description;


    formTitle.textContent = "Edit Product";

    saveButton.textContent = "Update Product";

    cancelEditButton.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

}


/* -----------------------------
   Delete Product
----------------------------- */

async function deleteProduct(id) {

    const product = products.find(
        (item) => item.id === id
    );


    if (!product) {
        return;
    }


    const confirmed = confirm(
        `Delete "${product.name}"?`
    );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `/api/products/${id}`,
            {
                method: "DELETE",
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail ||
                data.error ||
                "Unable to delete product"
            );

        }


        showToast("Product deleted successfully");


        await loadProducts();


    } catch (error) {

        console.error(error);

        showToast(error.message);

    }

}


/* -----------------------------
   Cancel Edit
----------------------------- */

cancelEditButton.addEventListener(
    "click",
    () => {
        resetForm();
    }
);


/* -----------------------------
   Reset Form
----------------------------- */

function resetForm() {

    productForm.reset();

    productId.value = "";

    formTitle.textContent =
        "Add New Product";

    saveButton.textContent =
        "Add Product";

    cancelEditButton.classList.add("hidden");

}


/* -----------------------------
   Refresh
----------------------------- */

refreshButton.addEventListener(
    "click",
    () => {
        loadProducts();
    }
);


/* -----------------------------
   Product Icon
----------------------------- */

function getProductIcon(product) {

    const text =
        `${product.name} ${product.category}`.toLowerCase();


    if (
        text.includes("laptop") ||
        text.includes("notebook")
    ) {
        return "💻";
    }


    if (
        text.includes("phone") ||
        text.includes("smartphone")
    ) {
        return "📱";
    }


    if (
        text.includes("headphone") ||
        text.includes("earbud") ||
        text.includes("speaker") ||
        text.includes("audio")
    ) {
        return "🎧";
    }


    if (
        text.includes("monitor") ||
        text.includes("display")
    ) {
        return "🖥️";
    }


    if (
        text.includes("camera") ||
        text.includes("webcam")
    ) {
        return "📷";
    }


    if (
        text.includes("watch")
    ) {
        return "⌚";
    }


    if (
        text.includes("keyboard") ||
        text.includes("mouse")
    ) {
        return "⌨️";
    }


    if (
        text.includes("tablet")
    ) {
        return "📲";
    }


    return "📦";
}


/* -----------------------------
   HTML Safety
----------------------------- */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* -----------------------------
   Toast
----------------------------- */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* -----------------------------
   Initial Load
----------------------------- */

loadProducts();