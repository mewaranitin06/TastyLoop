/* =========================================================
   TASTYLOOP ADMIN — ORDERS
   FINAL ORDER WORKFLOW
========================================================= */

(function () {
  "use strict";

  /* =========================================================
     ORDER DATA
  ========================================================= */

  const ADMIN_ORDERS = [
    {
      id: "TL-ORD-1001",
      date: "12 Sep 2026, 11:42 AM",
      customer: "Rahul Sharma",
      phone: "+91 98XXXXXX21",
      restaurant: "Burger Singh",
      items: "Classic Cheese Burger × 2",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80",
      amount: 398,
      status: "pending"
    },
    {
      id: "TL-ORD-1002",
      date: "12 Sep 2026, 11:18 AM",
      customer: "Priya Mehta",
      phone: "+91 97XXXXXX45",
      restaurant: "Pizza Hut",
      items: "Farmhouse Pizza × 1, Coke × 2",
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=150&q=80",
      amount: 449,
      status: "preparing"
    },
    {
      id: "TL-ORD-1003",
      date: "12 Sep 2026, 10:56 AM",
      customer: "Aman Joshi",
      phone: "+91 99XXXXXX73",
      restaurant: "Behrouz Biryani",
      items: "Chicken Biryani × 2",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=150&q=80",
      amount: 598,
      status: "delivery"
    },
    {
      id: "TL-ORD-1004",
      date: "12 Sep 2026, 10:21 AM",
      customer: "Sneha Patel",
      phone: "+91 96XXXXXX18",
      restaurant: "FreshMenu",
      items: "Protein Power Bowl × 1",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80",
      amount: 279,
      status: "delivered"
    },
    {
      id: "TL-ORD-1005",
      date: "12 Sep 2026, 09:47 AM",
      customer: "Vikas Singh",
      phone: "+91 95XXXXXX64",
      restaurant: "Punjabi Tadka",
      items: "Paneer Butter Masala × 2, Naan × 4",
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=150&q=80",
      amount: 618,
      status: "delivered"
    },
    {
      id: "TL-ORD-1006",
      date: "11 Sep 2026, 09:15 PM",
      customer: "Neha Verma",
      phone: "+91 94XXXXXX32",
      restaurant: "La Pino's Pizza",
      items: "Margherita Pizza × 1",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=150&q=80",
      amount: 249,
      status: "cancelled"
    },
    {
      id: "TL-ORD-1007",
      date: "11 Sep 2026, 08:42 PM",
      customer: "Arjun Kapoor",
      phone: "+91 93XXXXXX87",
      restaurant: "Burger King",
      items: "Peri Peri Burger × 2",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=150&q=80",
      amount: 458,
      status: "delivered"
    },
    {
      id: "TL-ORD-1008",
      date: "11 Sep 2026, 08:10 PM",
      customer: "Karan Shah",
      phone: "+91 91XXXXXX26",
      restaurant: "The Pasta Project",
      items: "Truffle Mushroom Pasta × 1",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=150&q=80",
      amount: 329,
      status: "preparing"
    },
    {
      id: "TL-ORD-1009",
      date: "11 Sep 2026, 07:36 PM",
      customer: "Riya Gupta",
      phone: "+91 90XXXXXX51",
      restaurant: "Burger Singh",
      items: "Classic Cheese Burger × 1",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80",
      amount: 199,
      status: "delivered"
    },
    {
      id: "TL-ORD-1010",
      date: "11 Sep 2026, 06:54 PM",
      customer: "Mohit Jain",
      phone: "+91 89XXXXXX14",
      restaurant: "Pizza Hut",
      items: "Farmhouse Pizza × 2",
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=150&q=80",
      amount: 698,
      status: "delivery"
    },
    {
      id: "TL-ORD-1011",
      date: "11 Sep 2026, 06:22 PM",
      customer: "Pooja Sharma",
      phone: "+91 88XXXXXX69",
      restaurant: "Behrouz Biryani",
      items: "Chicken Biryani × 1",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=150&q=80",
      amount: 299,
      status: "delivered"
    },
    {
      id: "TL-ORD-1012",
      date: "11 Sep 2026, 05:48 PM",
      customer: "Yash Patel",
      phone: "+91 87XXXXXX38",
      restaurant: "FreshMenu",
      items: "Protein Power Bowl × 2",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80",
      amount: 558,
      status: "pending"
    }
  ];

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const tableBody =
    document.getElementById("ordersTableBody");

  const searchInput =
    document.getElementById("tableOrderSearch");

  const statusFilter =
    document.getElementById("orderStatusFilter");

  /* =========================================================
     HELPERS
  ========================================================= */

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getStatusText(status) {
    const map = {
      pending: "Pending",
      preparing: "Preparing",
      prepared: "Prepared",
      delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled"
    };

    return map[status] || status;
  }

  function getStatusClass(status) {
    const map = {
      pending: "status-pending",
      preparing: "status-preparing",
      prepared: "status-prepared",
      delivery: "status-delivery",
      delivered: "status-delivered",
      cancelled: "status-cancelled"
    };

    return map[status] || "";
  }

  /* =========================================================
     ACTION BUTTON
  ========================================================= */

  function getActionButton(order) {

    if (order.status === "pending") {
      return `
        <button
          type="button"
          class="order-cook-btn"
          data-order-id="${escapeHTML(order.id)}"
          title="Start Cooking"
        >
          <i class="fa-solid fa-fire-burner"></i>
        </button>
      `;
    }

    if (order.status === "preparing") {
      return `
        <button
          type="button"
          class="order-prepared-btn"
          data-order-id="${escapeHTML(order.id)}"
          title="Mark as Prepared"
        >
          <i class="fa-solid fa-check"></i>
        </button>
      `;
    }

    if (order.status === "prepared") {
      return `
        <button
          type="button"
          class="order-delivery-btn"
          data-order-id="${escapeHTML(order.id)}"
          title="Out for Delivery"
        >
          <i class="fa-solid fa-motorcycle"></i>
        </button>
      `;
    }

    if (order.status === "delivery") {
  return `
    <button
      type="button"
      class="order-delivered-btn"
      data-order-id="${escapeHTML(order.id)}"
      title="Mark Delivered"
    >
      <i class="fa-solid fa-check"></i>
    </button>
  `;
}

    return "";
  }

  /* =========================================================
     STATS
  ========================================================= */

  function updateOrderStats() {

    const total =
      ADMIN_ORDERS.length;

    const pending =
      ADMIN_ORDERS.filter(
        order => order.status === "pending"
      ).length;

    const delivery =
      ADMIN_ORDERS.filter(
        order => order.status === "delivery"
      ).length;

    const delivered =
      ADMIN_ORDERS.filter(
        order => order.status === "delivered"
      ).length;

    const totalEl =
      document.getElementById("totalOrders");

    const pendingEl =
      document.getElementById("pendingOrders");

    const deliveryEl =
      document.getElementById("deliveryOrders");

    const deliveredEl =
      document.getElementById("deliveredOrders");

    if (totalEl) {
      totalEl.textContent = total;
    }

    if (pendingEl) {
      pendingEl.textContent = pending;
    }

    if (deliveryEl) {
      deliveryEl.textContent = delivery;
    }

    if (deliveredEl) {
      deliveredEl.textContent = delivered;
    }
  }

  /* =========================================================
     RENDER ORDERS
  ========================================================= */

  function renderOrders() {

    if (!tableBody) {
      return;
    }

    const searchTerm =
      searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const selectedStatus =
      statusFilter
        ? statusFilter.value
        : "all";

    const filteredOrders =
      ADMIN_ORDERS.filter(order => {

        const matchesSearch =
          !searchTerm ||
          order.id
            .toLowerCase()
            .includes(searchTerm) ||
          order.customer
            .toLowerCase()
            .includes(searchTerm) ||
          order.restaurant
            .toLowerCase()
            .includes(searchTerm) ||
          order.items
            .toLowerCase()
            .includes(searchTerm);

        const matchesStatus =
          selectedStatus === "all" ||
          order.status === selectedStatus;

        return (
          matchesSearch &&
          matchesStatus
        );
      });

    if (!filteredOrders.length) {

      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="order-empty">
              <i class="fa-solid fa-receipt"></i>

              <strong>
                No orders found
              </strong>

              <p>
                Try changing your search or status filter.
              </p>
            </div>
          </td>
        </tr>
      `;

      updateOrderCount(0);
      return;
    }

    tableBody.innerHTML =
      filteredOrders
        .map(order => {

          return `
            <tr
              data-order-id="${escapeHTML(order.id)}"
            >

              <!-- ORDER -->
              <td>

                <span class="order-id">
                  ${escapeHTML(order.id)}
                </span>

                <span class="order-date">
                  ${escapeHTML(order.date)}
                </span>

              </td>

              <!-- CUSTOMER -->
              <td>

                <div class="customer-info">

                  <strong>
                    ${escapeHTML(order.customer)}
                  </strong>

                  <span>
                    ${escapeHTML(order.phone)}
                  </span>

                </div>

              </td>

              <!-- RESTAURANT -->
              <td>
                ${escapeHTML(order.restaurant)}
              </td>

              <!-- ITEMS -->
              <td>

                <div class="order-items">

                  <img
                    class="order-item-image"
                    src="${escapeHTML(order.image)}"
                    alt="${escapeHTML(order.items)}"
                    loading="lazy"
                  >

                  <div class="order-item-text">

                    <span class="order-items-text">
                      ${escapeHTML(order.items)}
                    </span>

                  </div>

                </div>

              </td>

              <!-- AMOUNT -->
              <td>

                <span class="order-amount">
                  ₹${Number(order.amount).toLocaleString("en-IN")}
                </span>

              </td>

              <!-- STATUS -->
              <td>

                <span
                  class="order-status ${getStatusClass(order.status)}"
                >

                  <i class="fa-solid fa-circle"></i>

                  ${escapeHTML(
                    getStatusText(order.status)
                  )}

                </span>

              </td>

              <!-- ACTION -->
              <td>

                <div class="order-action-buttons">

                  <button
                    type="button"
                    class="order-view-btn"
                    data-order-id="${escapeHTML(order.id)}"
                    title="View Order"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>

                  ${getActionButton(order)}

                </div>

              </td>

            </tr>
          `;
        })
        .join("");

    updateOrderCount(
      filteredOrders.length
    );
  }

  /* =========================================================
     ORDER COUNT
  ========================================================= */

  function updateOrderCount(count) {

    const element =
      document.getElementById(
        "ordersCount"
      );

    if (!element) {
      return;
    }

    element.textContent =
      `Showing ${count} of ${ADMIN_ORDERS.length} orders`;
  }

  /* =========================================================
     SEARCH
  ========================================================= */

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      renderOrders
    );
  }

  /* =========================================================
     FILTER
  ========================================================= */

  if (statusFilter) {
    statusFilter.addEventListener(
      "change",
      renderOrders
    );
  }

  /* =========================================================
     TABLE ACTIONS
  ========================================================= */

  if (tableBody) {

    tableBody.addEventListener(
      "click",
      function (event) {

        const viewButton =
          event.target.closest(
            ".order-view-btn"
          );

        const cookButton =
          event.target.closest(
            ".order-cook-btn"
          );

        const preparedButton =
          event.target.closest(
            ".order-prepared-btn"
          );

        const deliveryButton =
          event.target.closest(
            ".order-delivery-btn"
          );

        const deliveredButton =
          event.target.closest(
            ".order-delivered-btn"
          );

        /* -----------------------------------------------------
           VIEW ORDER
        ----------------------------------------------------- */

        if (viewButton) {

          const order =
            ADMIN_ORDERS.find(
              item =>
                item.id ===
                viewButton.dataset.orderId
            );

          if (order) {
            openOrderDetails(order);
          }

          return;
        }

        /* -----------------------------------------------------
           START COOKING
        ----------------------------------------------------- */

        if (cookButton) {

          const order =
            ADMIN_ORDERS.find(
              item =>
                item.id ===
                cookButton.dataset.orderId
            );

          if (order) {
            openCookingTimeModal(order);
          }

          return;
        }

        /* -----------------------------------------------------
           MARK PREPARED
        ----------------------------------------------------- */

        if (preparedButton) {

          const order =
            ADMIN_ORDERS.find(
              item =>
                item.id ===
                preparedButton.dataset.orderId
            );

          if (order) {
            markOrderPrepared(order);
          }

          return;
        }

        /* -----------------------------------------------------
           OUT FOR DELIVERY
        ----------------------------------------------------- */

        if (deliveryButton) {

          const order =
            ADMIN_ORDERS.find(
              item =>
                item.id ===
                deliveryButton.dataset.orderId
            );

          if (order) {
            markOrderOutForDelivery(order);
          }

          return;
        }

        /* -----------------------------------------------------
           MARK DELIVERED
        ----------------------------------------------------- */

        if (deliveredButton) {

          const order =
            ADMIN_ORDERS.find(
              item =>
                item.id ===
                deliveredButton.dataset.orderId
            );

          if (order) {
            markOrderDelivered(order);
          }

          return;
        }
      }
    );
  }

  /* =========================================================
     ORDER DETAILS
  ========================================================= */

  function openOrderDetails(order) {

    let overlay =
      document.getElementById(
        "orderDetailsOverlay"
      );

    if (!overlay) {

      overlay =
        document.createElement("div");

      overlay.id =
        "orderDetailsOverlay";

      overlay.className =
        "order-details-overlay";

      document.body.appendChild(
        overlay
      );
    }

    overlay.innerHTML = `

      <div class="order-details-modal">

        <button
          type="button"
          class="order-details-close"
          id="orderDetailsClose"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="order-details-top">

          <div>

            <span class="order-details-eyebrow">
              ORDER DETAILS
            </span>

            <h2>
              ${escapeHTML(order.id)}
            </h2>

            <p>
              ${escapeHTML(order.date)}
            </p>

          </div>

          <span
            class="order-details-status ${getStatusClass(order.status)}"
          >
            ${escapeHTML(
              getStatusText(order.status)
            )}
          </span>

        </div>

        <div class="order-details-food">

          <img
            src="${escapeHTML(order.image)}"
            alt="${escapeHTML(order.items)}"
          >

          <div>

            <span class="order-details-label">
              ORDERED ITEM
            </span>

            <h3>
              ${escapeHTML(order.items)}
            </h3>

            <p>
              ${escapeHTML(order.restaurant)}
            </p>

          </div>

        </div>

        <div class="order-details-grid">

          <div class="order-details-info">
            <span>Customer</span>
            <strong>
              ${escapeHTML(order.customer)}
            </strong>
          </div>

          <div class="order-details-info">
            <span>Phone</span>
            <strong>
              ${escapeHTML(order.phone)}
            </strong>
          </div>

          <div class="order-details-info">
            <span>Restaurant</span>
            <strong>
              ${escapeHTML(order.restaurant)}
            </strong>
          </div>

          <div class="order-details-info">
            <span>Order Date</span>
            <strong>
              ${escapeHTML(order.date)}
            </strong>
          </div>

        </div>

        <div class="order-details-total">

          <span>
            Total Amount
          </span>

          <strong>
            ₹${Number(order.amount).toLocaleString("en-IN")}
          </strong>

        </div>

      </div>
    `;

    overlay.classList.add("show");

    document
      .getElementById(
        "orderDetailsClose"
      )
      ?.addEventListener(
        "click",
        closeOrderDetails
      );

    overlay.addEventListener(
      "click",
      function (event) {

        if (
          event.target === overlay
        ) {
          closeOrderDetails();
        }
      },
      { once: true }
    );
  }

  function closeOrderDetails() {

    const overlay =
      document.getElementById(
        "orderDetailsOverlay"
      );

    if (overlay) {
      overlay.classList.remove(
        "show"
      );
    }
  }

  /* =========================================================
     COOKING TIME MODAL
  ========================================================= */

  function openCookingTimeModal(order) {

    let overlay =
      document.getElementById(
        "cookingTimeOverlay"
      );

    if (!overlay) {

      overlay =
        document.createElement("div");

      overlay.id =
        "cookingTimeOverlay";

      overlay.className =
        "cooking-time-overlay";

      document.body.appendChild(
        overlay
      );
    }

    overlay.innerHTML = `

      <div class="cooking-time-modal">

        <button
          type="button"
          class="cooking-time-close"
          id="cookingTimeClose"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <span class="cooking-time-eyebrow">
          START PREPARATION
        </span>

        <h2>
          Start Cooking
        </h2>

        <p class="cooking-time-order">
          ${escapeHTML(order.id)}
          ·
          ${escapeHTML(order.restaurant)}
        </p>

        <div class="cooking-food-preview">

          <img
            src="${escapeHTML(order.image)}"
            alt="${escapeHTML(order.items)}"
          >

          <div>

            <strong>
              ${escapeHTML(order.items)}
            </strong>

            <span>
              ${escapeHTML(order.customer)}
            </span>

          </div>

        </div>

        <label
          class="cooking-time-label"
          for="preparationMinutes"
        >
          Estimated preparation time
        </label>

        <div class="cooking-time-input-wrap">

          <input
            type="number"
            id="preparationMinutes"
            min="1"
            max="180"
            value="20"
          >

          <span>
            minutes
          </span>

        </div>

        <button
          type="button"
          class="start-cooking-confirm"
          id="startCookingConfirm"
        >
          <i class="fa-solid fa-fire-burner"></i>
          <span>
            Start Cooking
          </span>
        </button>

      </div>
    `;

    overlay.classList.add("show");

    document
      .getElementById(
        "cookingTimeClose"
      )
      ?.addEventListener(
        "click",
        closeCookingTimeModal
      );

    document
      .getElementById(
        "startCookingConfirm"
      )
      ?.addEventListener(
        "click",
        function () {

          const input =
            document.getElementById(
              "preparationMinutes"
            );

          const minutes =
            Number(input.value);

          if (
            !Number.isFinite(minutes) ||
            minutes < 1 ||
            minutes > 180
          ) {
            input.focus();
            return;
          }

          startCooking(
            order,
            minutes
          );
        }
      );

    overlay.addEventListener(
      "click",
      function (event) {

        if (
          event.target === overlay
        ) {
          closeCookingTimeModal();
        }
      },
      { once: true }
    );
  }

  function closeCookingTimeModal() {

    const overlay =
      document.getElementById(
        "cookingTimeOverlay"
      );

    if (overlay) {
      overlay.classList.remove(
        "show"
      );
    }
  }

  /* =========================================================
     START COOKING
  ========================================================= */

  function startCooking(
    order,
    minutes
  ) {

    const startedAt =
      Date.now();

    const readyAt =
      startedAt +
      minutes * 60 * 1000;

    order.status =
      "preparing";

    order.preparationMinutes =
      minutes;

    order.cookingStartedAt =
      startedAt;

    order.readyAt =
      readyAt;

    saveOrderStatus(
      order,
      {
        status: "preparing",
        preparationMinutes: minutes,
        cookingStartedAt: startedAt,
        readyAt: readyAt
      }
    );

    closeCookingTimeModal();

    renderOrders();
    updateOrderStats();

    showOrderToast(
      `Cooking started · ${minutes} min estimated`
    );
  }

  /* =========================================================
     MARK PREPARED
  ========================================================= */

  function markOrderPrepared(order) {

    const preparedAt =
      Date.now();

    order.status =
      "prepared";

    order.preparedAt =
      preparedAt;

    saveOrderStatus(
      order,
      {
        status: "prepared",
        preparationMinutes:
          order.preparationMinutes || null,
        cookingStartedAt:
          order.cookingStartedAt || null,
        readyAt:
          preparedAt,
        preparedAt:
          preparedAt
      }
    );

    renderOrders();
    updateOrderStats();

    showOrderToast(
      `Order ${order.id} is prepared`
    );
  }

  /* =========================================================
     OUT FOR DELIVERY
  ========================================================= */

  function markOrderOutForDelivery(order) {

    const pickedUpAt =
      Date.now();

    order.status =
      "delivery";

    order.pickedUpAt =
      pickedUpAt;

    saveOrderStatus(
      order,
      {
        status: "delivery",
        preparedAt:
          order.preparedAt || null,
        pickedUpAt:
          pickedUpAt
      }
    );

    renderOrders();
    updateOrderStats();

    showOrderToast(
      `Order ${order.id} is out for delivery`
    );
  }

  /* =========================================================
     MARK DELIVERED
  ========================================================= */

  function markOrderDelivered(order) {

    const deliveredAt =
      Date.now();

    order.status =
      "delivered";

    order.deliveredAt =
      deliveredAt;

    saveOrderStatus(
      order,
      {
        status: "delivered",
        preparedAt:
          order.preparedAt || null,
        pickedUpAt:
          order.pickedUpAt || null,
        deliveredAt:
          deliveredAt
      }
    );

    renderOrders();
    updateOrderStats();

    showOrderToast(
      `Order ${order.id} delivered successfully`
    );
  }

  /* =========================================================
     LOCAL STORAGE
  ========================================================= */

  function saveOrderStatus(
    order,
    data
  ) {

    const existing =
      localStorage.getItem(
        "tastyloopOrder_" +
        order.id
      );

    let previous = {};

    if (existing) {
      try {
        previous =
          JSON.parse(existing) || {};
      } catch (error) {
        previous = {};
      }
    }

    localStorage.setItem(
      "tastyloopOrder_" +
      order.id,
      JSON.stringify({
        ...previous,
        orderId: order.id,
        ...data
      })
    );
  }

  /* =========================================================
     TOAST
  ========================================================= */

  function showOrderToast(message) {

    let toast =
      document.getElementById(
        "adminOrderToast"
      );

    if (!toast) {

      toast =
        document.createElement("div");

      toast.id =
        "adminOrderToast";

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
        transition:
          opacity .2s ease,
          transform .2s ease;
        pointer-events: none;
      `;

      document.body.appendChild(
        toast
      );
    }

    toast.textContent =
      message;

    requestAnimationFrame(
      function () {

        toast.style.opacity =
          "1";

        toast.style.transform =
          "translateY(0)";
      }
    );

    clearTimeout(
      toast._timer
    );

    toast._timer =
      setTimeout(
        function () {

          toast.style.opacity =
            "0";

          toast.style.transform =
            "translateY(10px)";
        },
        2400
      );
  }

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {

        closeOrderDetails();
        closeCookingTimeModal();
      }
    }
  );

  /* =========================================================
     INITIALIZE
  ========================================================= */

  updateOrderStats();
  renderOrders();

})();

