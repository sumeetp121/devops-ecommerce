const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://127.0.0.1:8000";

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/products`);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Product service returned an error",
      });
    }

    const products = await response.json();

    res.json(products);
  } catch (error) {
    console.error("Product service error:", error.message);

    res.status(503).json({
      error: "Product service is unavailable",
    });
  }
});

// GET one product
app.get("/api/products/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${PRODUCT_SERVICE_URL}/products/${req.params.id}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Product service error:", error.message);

    res.status(503).json({
      error: "Product service is unavailable",
    });
  }
});

// CREATE product
app.post("/api/products", async (req, res) => {
  try {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Product service error:", error.message);

    res.status(503).json({
      error: "Product service is unavailable",
    });
  }
});

// UPDATE product
app.put("/api/products/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${PRODUCT_SERVICE_URL}/products/${req.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Product service error:", error.message);

    res.status(503).json({
      error: "Product service is unavailable",
    });
  }
});

// DELETE product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${PRODUCT_SERVICE_URL}/products/${req.params.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Product service error:", error.message);

    res.status(503).json({
      error: "Product service is unavailable",
    });
  }
});

// Frontend fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`E-Commerce frontend running on http://localhost:${PORT}`);
  console.log(`Product service: ${PRODUCT_SERVICE_URL}`);
});