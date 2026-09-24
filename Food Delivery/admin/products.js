/* =========================================================
   TASTYLOOP ADMIN — PRODUCTS MANAGEMENT
========================================================= */

(function () {
  "use strict";


  /* =========================================================
     PRODUCT DATA
  ========================================================= */

  let ADMIN_PRODUCTS = [

    {
      id: "TL-001",
      name: "Classic Cheese Burger",
      restaurant: "Burger Singh",
      category: "Burgers",
      price: 199,
      rating: 4.8,
      status: "active",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
      description: "Classic cheese burger with fresh vegetables."
    },

    {
      id: "TL-002",
      name: "Farmhouse Pizza",
      restaurant: "Pizza Hut",
      category: "Pizza",
      price: 349,
      rating: 4.6,
      status: "active",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300",
      description: "Loaded farmhouse pizza with fresh vegetables."
    },

    {
      id: "TL-003",
      name: "Chicken Biryani",
      restaurant: "Behrouz Biryani",
      category: "Indian",
      price: 299,
      rating: 4.9,
      status: "active",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300",
      description: "Aromatic chicken biryani with traditional spices."
    },

    {
      id: "TL-004",
      name: "Protein Power Bowl",
      restaurant: "FreshMenu",
      category: "Healthy",
      price: 279,
      rating: 4.7,
      status: "active",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300",
      description: "Healthy protein bowl with fresh ingredients."
    },

    {
      id: "TL-005",
      name: "Truffle Mushroom Pasta",
      restaurant: "The Pasta Project",
      category: "Pasta",
      price: 329,
      rating: 4.5,
      status: "low",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300",
      description: "Creamy mushroom pasta with truffle flavour."
    },

    {
      id: "TL-006",
      name: "Peri Peri Burger",
      restaurant: "Burger King",
      category: "Burgers",
      price: 229,
      rating: 4.4,
      status: "active",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300",
      description: "Spicy peri peri burger with crispy filling."
    },

    {
      id: "TL-007",
      name: "Margherita Pizza",
      restaurant: "La Pino's Pizza",
      category: "Pizza",
      price: 249,
      rating: 4.3,
      status: "low",
      image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=300",
      description: "Classic margherita pizza with mozzarella and basil."
    },

    {
      id: "TL-008",
      name: "Paneer Butter Masala",
      restaurant: "Punjabi Tadka",
      category: "Indian",
      price: 259,
      rating: 4.6,
      status: "out",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300",
      description: "Rich paneer curry cooked in a creamy gravy."
    }

  ];


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const tableBody =
    document.getElementById("productsTableBody");

  const searchInput =
    document.getElementById("tableProductSearch");

  const categoryFilter =
    document.getElementById("categoryFilter");

  const statusFilter =
    document.getElementById("statusFilter");

  const addProductBtn =
    document.getElementById("addProductBtn");


  /* =========================================================
     HELPERS
  ========================================================= */

  function escapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function getStatusText(status) {

    if (status === "active") {
      return "Active";
    }

    if (status === "low") {
      return "Low Stock";
    }

    if (status === "out") {
      return "Out of Stock";
    }

    return status;
  }


  function getStatusClass(status) {

    if (status === "active") {
      return "status-active";
    }

    if (status === "low") {
      return "status-low";
    }

    if (status === "out") {
      return "status-out";
    }

    return "";
  }


  /* =========================================================
     TOAST
  ========================================================= */

  function showAdminToast(message) {

    let toast =
      document.getElementById("adminProductToast");


    if (!toast) {

      toast =
        document.createElement("div");

      toast.id =
        "adminProductToast";


      toast.style.cssText = `
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 999999;

        background: #142238;
        color: #ffffff;

        padding: 12px 16px;
        border-radius: 10px;

        font-family: "DM Sans", Arial, sans-serif;
        font-size: 12px;
        font-weight: 600;

        box-shadow: 0 12px 30px rgba(20,34,56,.18);

        opacity: 0;
        transform: translateY(10px);

        transition: opacity .2s ease,
                    transform .2s ease;

        pointer-events: none;
      `;


      document.body.appendChild(toast);

    }


    toast.textContent =
      message;


    requestAnimationFrame(function () {

      toast.style.opacity =
        "1";

      toast.style.transform =
        "translateY(0)";

    });


    clearTimeout(
      toast._timer
    );


    toast._timer =
      setTimeout(function () {

        toast.style.opacity =
          "0";

        toast.style.transform =
          "translateY(10px)";

      }, 2200);

  }


  /* =========================================================
     PRODUCT COUNT
  ========================================================= */

  function updateProductCount(count) {

    const countElement =
      document.getElementById("productsCount");


    if (!countElement) {
      return;
    }


    countElement.textContent =
      "Showing " +
      count +
      " of " +
      ADMIN_PRODUCTS.length +
      " products";

  }


  /* =========================================================
     PRODUCT STATS
  ========================================================= */

  function updateProductStats() {

    const total =
      ADMIN_PRODUCTS.length;


    const active =
      ADMIN_PRODUCTS.filter(function (product) {

        return product.status === "active";

      }).length;


    const low =
      ADMIN_PRODUCTS.filter(function (product) {

        return product.status === "low";

      }).length;


    const out =
      ADMIN_PRODUCTS.filter(function (product) {

        return product.status === "out";

      }).length;


    const totalElement =
      document.getElementById("totalProducts");


    const activeElement =
      document.getElementById("activeProducts");


    const lowElement =
      document.getElementById("lowStockProducts");


    const outElement =
      document.getElementById("outProducts");


    if (totalElement) {
      totalElement.textContent =
        total;
    }


    if (activeElement) {
      activeElement.textContent =
        active;
    }


    if (lowElement) {
      lowElement.textContent =
        low;
    }


    if (outElement) {
      outElement.textContent =
        out;
    }

  }


  /* =========================================================
     ADD CATEGORY TO FILTER
  ========================================================= */

  function addCategoryToFilter(category) {

    if (!categoryFilter || !category) {
      return;
    }


    const exists =
      Array.from(
        categoryFilter.options
      ).some(function (option) {

        return option.value.toLowerCase() ===
          category.toLowerCase();

      });


    if (exists) {
      return;
    }


    const option =
      document.createElement("option");


    option.value =
      category;


    option.textContent =
      category;


    categoryFilter.appendChild(
      option
    );

  }


  /* =========================================================
     RENDER TABLE
  ========================================================= */

  function renderProductsTable() {

    if (!tableBody) {
      return;
    }


    const searchTerm =
      searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";


    const selectedCategory =
      categoryFilter
        ? categoryFilter.value
        : "all";


    const selectedStatus =
      statusFilter
        ? statusFilter.value
        : "all";


    const filteredProducts =
      ADMIN_PRODUCTS.filter(function (product) {


        const productName =
          product.name.toLowerCase();


        const restaurantName =
          product.restaurant.toLowerCase();


        const categoryName =
          product.category.toLowerCase();


        const productId =
          product.id.toLowerCase();


        const matchesSearch =
          !searchTerm ||
          productName.includes(searchTerm) ||
          restaurantName.includes(searchTerm) ||
          categoryName.includes(searchTerm) ||
          productId.includes(searchTerm);


        const matchesCategory =
          selectedCategory === "all" ||
          product.category === selectedCategory;


        const matchesStatus =
          selectedStatus === "all" ||
          product.status === selectedStatus;


        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );

      });


    /* =======================================================
       EMPTY
    ======================================================= */

    if (filteredProducts.length === 0) {

      tableBody.innerHTML = `
        <tr>

          <td colspan="7">

            <div class="product-empty">

              <div class="product-empty-icon">
                <i class="fa-solid fa-box-open"></i>
              </div>

              <strong>
                No products found
              </strong>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          </td>

        </tr>
      `;


      updateProductCount(0);

      return;
    }


    /* =======================================================
       PRODUCT ROWS
    ======================================================= */

    tableBody.innerHTML =
      filteredProducts.map(function (product) {

        return `

          <tr data-product-id="${escapeHTML(product.id)}">

            <td>

              <div class="product-info">

                <img
                  class="product-image"
                  src="${escapeHTML(product.image)}"
                  alt="${escapeHTML(product.name)}"
                  onerror="
                    this.onerror=null;
                    this.src='https://via.placeholder.com/100x100?text=Food';
                  "
                >

                <div>

                  <span class="product-name">
                    ${escapeHTML(product.name)}
                  </span>

                  <span class="product-id">
                    ${escapeHTML(product.id)}
                  </span>

                </div>

              </div>

            </td>


            <td>

              <span class="restaurant-name">
                ${escapeHTML(product.restaurant)}
              </span>

            </td>


            <td>

              <span class="category-pill">
                ${escapeHTML(product.category)}
              </span>

            </td>


            <td>

              <span class="product-price">
                ₹${Number(product.price).toLocaleString("en-IN")}
              </span>

            </td>


            <td>

              <span class="rating-cell">

                <i class="fa-solid fa-star"></i>

                ${Number(product.rating).toFixed(1)}

              </span>

            </td>


            <td>

              <span class="status-pill ${getStatusClass(product.status)}">

                ${getStatusText(product.status)}

              </span>

            </td>


            <td>

              <div class="product-actions">

                <button
                  type="button"
                  class="product-action edit"
                  data-action="edit"
                  data-id="${escapeHTML(product.id)}"
                  title="Edit Product"
                >

                  <i class="fa-solid fa-pen"></i>

                </button>


                <button
                  type="button"
                  class="product-action delete"
                  data-action="delete"
                  data-id="${escapeHTML(product.id)}"
                  title="Delete Product"
                >

                  <i class="fa-solid fa-trash"></i>

                </button>

              </div>

            </td>

          </tr>

        `;

      }).join("");


    updateProductCount(
      filteredProducts.length
    );

  }


  /* =========================================================
     SEARCH + FILTER EVENTS
  ========================================================= */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      renderProductsTable
    );

  }


  if (categoryFilter) {

    categoryFilter.addEventListener(
      "change",
      renderProductsTable
    );

  }


  if (statusFilter) {

    statusFilter.addEventListener(
      "change",
      renderProductsTable
    );

  }


  /* =========================================================
     EDIT / DELETE
  ========================================================= */

  if (tableBody) {

    tableBody.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(
            ".product-action"
          );


        if (!button) {
          return;
        }


        const productId =
          button.dataset.id;


        const action =
          button.dataset.action;


        const product =
          ADMIN_PRODUCTS.find(
            function (item) {

              return item.id === productId;

            }
          );


        if (!product) {
          return;
        }


        /* EDIT */

        if (action === "edit") {

          showAdminToast(
            "Edit product: " +
            product.name
          );

          return;
        }


        /* DELETE */

        if (action === "delete") {

          const confirmed =
            window.confirm(
              'Delete "' +
              product.name +
              '" from products?'
            );


          if (!confirmed) {
            return;
          }


          ADMIN_PRODUCTS =
            ADMIN_PRODUCTS.filter(
              function (item) {

                return item.id !== productId;

              }
            );


          renderProductsTable();

          updateProductStats();

          showAdminToast(
            "Product deleted successfully"
          );

        }

      }
    );

  }


  /* =========================================================
     ADD PRODUCT MODAL
  ========================================================= */

  if (addProductBtn) {

    const modal =
      document.createElement("div");


    modal.className =
      "product-modal-overlay";


    modal.innerHTML = `

      <div class="product-modal">


        <div class="product-modal-header">

          <div>

            <span class="product-modal-label">
              MENU MANAGEMENT
            </span>

            <h2>
              Add New Product
            </h2>

            <p>
              Add a new food item to your TastyLoop menu.
            </p>

          </div>


          <button
            type="button"
            class="product-modal-close"
            id="closeProductModal"
          >

            <i class="fa-solid fa-xmark"></i>

          </button>

        </div>


        <form id="addProductForm">


          <div class="product-modal-body">

            <div class="product-form-grid">


              <!-- PRODUCT NAME -->

              <div class="product-form-group full">

                <label for="newProductName">
                  Product Name
                </label>

                <input
                  type="text"
                  id="newProductName"
                  placeholder="e.g. Cheese Burst Burger"
                  required
                >

              </div>


              <!-- RESTAURANT -->

              <div class="product-form-group">

                <label for="newProductRestaurant">
                  Restaurant
                </label>

                <input
                  type="text"
                  id="newProductRestaurant"
                  placeholder="e.g. Burger House"
                  required
                >

              </div>


              <!-- CATEGORY -->

              <div class="product-form-group">

                <label for="newProductCategory">
                  Category
                </label>

                <select
                  id="newProductCategory"
                  required
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Burgers">
                    Burgers
                  </option>

                  <option value="Pizza">
                    Pizza
                  </option>

                  <option value="Indian">
                    Indian
                  </option>

                  <option value="Healthy">
                    Healthy
                  </option>

                  <option value="Pasta">
                    Pasta
                  </option>

                  <option value="__other__">
                    Other
                  </option>

                </select>

              </div>


              <!-- CUSTOM CATEGORY -->

              <div
                class="product-form-group full"
                id="customCategoryGroup"
                style="display:none;"
              >

                <label for="newCustomCategory">
                  Custom Category
                </label>

                <input
                  type="text"
                  id="newCustomCategory"
                  placeholder="e.g. Chinese, Desserts, Beverages"
                >

              </div>


              <!-- PRICE -->

              <div class="product-form-group">

                <label for="newProductPrice">
                  Price
                </label>

                <div class="product-input-prefix">

                  <span>₹</span>

                  <input
                    type="number"
                    id="newProductPrice"
                    placeholder="249"
                    min="1"
                    required
                  >

                </div>

              </div>


              <!-- RATING -->

              <div class="product-form-group">

                <label for="newProductRating">
                  Rating
                </label>

                <input
                  type="number"
                  id="newProductRating"
                  placeholder="4.8"
                  min="0"
                  max="5"
                  step="0.1"
                  value="4.5"
                >

              </div>


              <!-- STATUS -->

              <div class="product-form-group">

                <label for="newProductStatus">
                  Status
                </label>

                <select
                  id="newProductStatus"
                  required
                >

                  <option value="active">
                    Active
                  </option>

                  <option value="low">
                    Low Stock
                  </option>

                  <option value="out">
                    Out of Stock
                  </option>

                </select>

              </div>


              <!-- IMAGE -->

              <div class="product-form-group full">

                <label for="newProductImage">
                  Product Image URL
                </label>

                <input
                  type="url"
                  id="newProductImage"
                  placeholder="https://example.com/food-image.jpg"
                  required
                >

              </div>


              <!-- DESCRIPTION -->

              <div class="product-form-group full">

                <label for="newProductDescription">
                  Description
                </label>

                <textarea
                  id="newProductDescription"
                  rows="3"
                  placeholder="Short description of the product..."
                ></textarea>

              </div>


            </div>

          </div>


          <div class="product-modal-footer">

            <button
              type="button"
              class="product-modal-cancel"
              id="cancelProductModal"
            >
              Cancel
            </button>


            <button
              type="submit"
              class="product-modal-submit"
            >

              <i class="fa-solid fa-plus"></i>

              Add Product

            </button>

          </div>


        </form>

      </div>

    `;


    document.body.appendChild(
      modal
    );


    /* =======================================================
       MODAL ELEMENTS
    ======================================================= */

    const form =
      modal.querySelector(
        "#addProductForm"
      );


    const closeButton =
      modal.querySelector(
        "#closeProductModal"
      );


    const cancelButton =
      modal.querySelector(
        "#cancelProductModal"
      );


    const categorySelect =
      modal.querySelector(
        "#newProductCategory"
      );


    const customCategoryGroup =
      modal.querySelector(
        "#customCategoryGroup"
      );


    const customCategoryInput =
      modal.querySelector(
        "#newCustomCategory"
      );


    /* =======================================================
       OTHER CATEGORY
    ======================================================= */

    categorySelect.addEventListener(
      "change",
      function () {

        if (
          categorySelect.value ===
          "__other__"
        ) {

          customCategoryGroup.style.display =
            "flex";


          customCategoryInput.required =
            true;


          customCategoryInput.focus();

        } else {

          customCategoryGroup.style.display =
            "none";


          customCategoryInput.required =
            false;


          customCategoryInput.value =
            "";

        }

      }
    );


    /* =======================================================
       OPEN MODAL
    ======================================================= */

    addProductBtn.addEventListener(
      "click",
      function () {

        modal.classList.add(
          "show"
        );


        document.body.classList.add(
          "product-modal-open"
        );


        setTimeout(
          function () {

            const nameInput =
              modal.querySelector(
                "#newProductName"
              );


            if (nameInput) {
              nameInput.focus();
            }

          },
          100
        );

      }
    );


    /* =======================================================
       CLOSE MODAL
    ======================================================= */

    function closeProductModal() {

      modal.classList.remove(
        "show"
      );


      document.body.classList.remove(
        "product-modal-open"
      );


      form.reset();


      modal.querySelector(
        "#newProductRating"
      ).value = "4.5";


      modal.querySelector(
        "#newProductStatus"
      ).value = "active";


      customCategoryGroup.style.display =
        "none";


      customCategoryInput.required =
        false;


      customCategoryInput.value =
        "";

    }


    closeButton.addEventListener(
      "click",
      closeProductModal
    );


    cancelButton.addEventListener(
      "click",
      closeProductModal
    );


    /* =======================================================
       OUTSIDE CLICK
    ======================================================= */

    modal.addEventListener(
      "click",
      function (event) {

        if (
          event.target === modal
        ) {

          closeProductModal();

        }

      }
    );


    /* =======================================================
       ESCAPE
    ======================================================= */

    document.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Escape" &&
          modal.classList.contains("show")
        ) {

          closeProductModal();

        }

      }
    );


    /* =======================================================
       SUBMIT PRODUCT
    ======================================================= */

    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const name =
          modal.querySelector(
            "#newProductName"
          ).value.trim();


        const restaurant =
          modal.querySelector(
            "#newProductRestaurant"
          ).value.trim();


        const selectedCategory =
          categorySelect.value;


        const customCategory =
          customCategoryInput.value.trim();


        const price =
          Number(
            modal.querySelector(
              "#newProductPrice"
            ).value
          );


        const rating =
          Number(
            modal.querySelector(
              "#newProductRating"
            ).value
          );


        const status =
          modal.querySelector(
            "#newProductStatus"
          ).value;


        const image =
          modal.querySelector(
            "#newProductImage"
          ).value.trim();


        const description =
          modal.querySelector(
            "#newProductDescription"
          ).value.trim();


        /* ===================================================
           FINAL CATEGORY
        =================================================== */

        let finalCategory =
          selectedCategory;


        if (
          selectedCategory ===
          "__other__"
        ) {

          if (!customCategory) {

            showAdminToast(
              "Please enter a custom category"
            );

            customCategoryInput.focus();

            return;
          }


          finalCategory =
            customCategory;

        }


        /* ===================================================
           VALIDATION
        =================================================== */

        if (
          !name ||
          !restaurant ||
          !finalCategory ||
          !price ||
          !image
        ) {

          showAdminToast(
            "Please fill all required fields"
          );

          return;
        }


        if (
          rating < 0 ||
          rating > 5
        ) {

          showAdminToast(
            "Rating must be between 0 and 5"
          );

          return;
        }


        /* ===================================================
           CREATE PRODUCT
        =================================================== */

        const newProduct = {

          id:
            "TL-" +
            String(
              ADMIN_PRODUCTS.length + 1
            ).padStart(3, "0"),


          name:
            name,


          restaurant:
            restaurant,


          category:
            finalCategory,


          price:
            price,


          rating:
            rating || 4.5,


          status:
            status,


          image:
            image,


          description:
            description

        };


        /* ADD */

        ADMIN_PRODUCTS.push(
          newProduct
        );


        /* ADD CATEGORY TO FILTER */

        addCategoryToFilter(
          finalCategory
        );


        /* REFRESH */

        renderProductsTable();

        updateProductStats();


        /* CLOSE */

        closeProductModal();


        /* SUCCESS */

        showAdminToast(
          "Product added successfully"
        );

      }
    );

  }


  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  renderProductsTable();

  updateProductStats();


})();