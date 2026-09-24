/* =========================================================
   TASTYLOOP ADMIN — CUSTOMERS
========================================================= */

(function () {
  "use strict";


  /* =========================================================
     CUSTOMER DATA
  ========================================================= */

  const CUSTOMERS = [
    {
      id: "CUS-1001",
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 98XXXXXX21",
      orders: 8,
      spent: 2450,
      lastOrder: "Today, 11:42 AM",
      joined: "12 Aug 2026",
      status: "active"
    },
    {
      id: "CUS-1002",
      name: "Priya Mehta",
      email: "priya.mehta@email.com",
      phone: "+91 97XXXXXX45",
      orders: 5,
      spent: 1890,
      lastOrder: "Today, 11:18 AM",
      joined: "19 Aug 2026",
      status: "active"
    },
    {
      id: "CUS-1003",
      name: "Aman Joshi",
      email: "aman.joshi@email.com",
      phone: "+91 99XXXXXX73",
      orders: 11,
      spent: 4210,
      lastOrder: "Today, 10:56 AM",
      joined: "02 Jul 2026",
      status: "active"
    },
    {
      id: "CUS-1004",
      name: "Sneha Patel",
      email: "sneha.patel@email.com",
      phone: "+91 96XXXXXX18",
      orders: 3,
      spent: 920,
      lastOrder: "Today, 10:21 AM",
      joined: "04 Sep 2026",
      status: "active"
    },
    {
      id: "CUS-1005",
      name: "Vikas Singh",
      email: "vikas.singh@email.com",
      phone: "+91 95XXXXXX64",
      orders: 7,
      spent: 3180,
      lastOrder: "Today, 09:47 AM",
      joined: "15 Jul 2026",
      status: "active"
    },
    {
      id: "CUS-1006",
      name: "Neha Verma",
      email: "neha.verma@email.com",
      phone: "+91 94XXXXXX32",
      orders: 1,
      spent: 249,
      lastOrder: "Yesterday, 09:15 PM",
      joined: "11 Sep 2026",
      status: "inactive"
    },
    {
      id: "CUS-1007",
      name: "Arjun Kapoor",
      email: "arjun.kapoor@email.com",
      phone: "+91 93XXXXXX87",
      orders: 12,
      spent: 4860,
      lastOrder: "Yesterday, 08:42 PM",
      joined: "28 Jun 2026",
      status: "active"
    },
    {
      id: "CUS-1008",
      name: "Karan Shah",
      email: "karan.shah@email.com",
      phone: "+91 91XXXXXX26",
      orders: 6,
      spent: 2340,
      lastOrder: "Yesterday, 08:10 PM",
      joined: "01 Aug 2026",
      status: "active"
    },
    {
      id: "CUS-1009",
      name: "Riya Gupta",
      email: "riya.gupta@email.com",
      phone: "+91 90XXXXXX51",
      orders: 4,
      spent: 1099,
      lastOrder: "Yesterday, 07:36 PM",
      joined: "25 Aug 2026",
      status: "active"
    },
    {
      id: "CUS-1010",
      name: "Mohit Jain",
      email: "mohit.jain@email.com",
      phone: "+91 89XXXXXX14",
      orders: 2,
      spent: 698,
      lastOrder: "Yesterday, 06:54 PM",
      joined: "05 Sep 2026",
      status: "inactive"
    },
    {
      id: "CUS-1011",
      name: "Pooja Sharma",
      email: "pooja.sharma@email.com",
      phone: "+91 88XXXXXX69",
      orders: 9,
      spent: 3590,
      lastOrder: "Yesterday, 06:22 PM",
      joined: "09 Jul 2026",
      status: "active"
    },
    {
      id: "CUS-1012",
      name: "Yash Patel",
      email: "yash.patel@email.com",
      phone: "+91 87XXXXXX38",
      orders: 5,
      spent: 1650,
      lastOrder: "Yesterday, 05:48 PM",
      joined: "18 Aug 2026",
      status: "active"
    }
  ];


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const tableBody =
    document.getElementById(
      "customersTableBody"
    );

  const tableSearch =
    document.getElementById(
      "tableCustomerSearch"
    );

  const headerSearch =
    document.getElementById(
      "customerSearch"
    );

  const statusFilter =
    document.getElementById(
      "customerStatusFilter"
    );


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


  function getInitials(name) {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }


  function formatMoney(amount) {
    return "₹" +
      Number(amount).toLocaleString(
        "en-IN"
      );
  }


  /* =========================================================
     STATS
  ========================================================= */

  function updateStats() {

    const total =
      CUSTOMERS.length;

    const active =
      CUSTOMERS.filter(
        customer =>
          customer.status === "active"
      ).length;

    const repeat =
      CUSTOMERS.filter(
        customer =>
          customer.orders > 1
      ).length;

    const newCustomers =
      CUSTOMERS.filter(
        customer =>
          customer.orders <= 2
      ).length;


    const totalEl =
      document.getElementById(
        "totalCustomers"
      );

    const activeEl =
      document.getElementById(
        "activeCustomers"
      );

    const newEl =
      document.getElementById(
        "newCustomers"
      );

    const repeatEl =
      document.getElementById(
        "repeatCustomers"
      );


    if (totalEl) {
      totalEl.textContent = total;
    }

    if (activeEl) {
      activeEl.textContent = active;
    }

    if (newEl) {
      newEl.textContent = newCustomers;
    }

    if (repeatEl) {
      repeatEl.textContent = repeat;
    }
  }


  /* =========================================================
     RENDER
  ========================================================= */

  function renderCustomers() {

    if (!tableBody) {
      return;
    }


    const searchTerm =
      tableSearch
        ? tableSearch.value
            .trim()
            .toLowerCase()
        : "";


    const selectedStatus =
      statusFilter
        ? statusFilter.value
        : "all";


    const filtered =
      CUSTOMERS.filter(
        customer => {

          const matchesSearch =
            !searchTerm ||
            customer.name
              .toLowerCase()
              .includes(searchTerm) ||
            customer.email
              .toLowerCase()
              .includes(searchTerm) ||
            customer.phone
              .toLowerCase()
              .includes(searchTerm) ||
            customer.id
              .toLowerCase()
              .includes(searchTerm);


          const matchesStatus =
            selectedStatus === "all" ||
            customer.status === selectedStatus;


          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );


    if (!filtered.length) {

      tableBody.innerHTML = `
        <tr>
          <td colspan="7">

            <div class="customer-empty">

              <i class="fa-solid fa-users-slash"></i>

              <strong>
                No customers found
              </strong>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          </td>
        </tr>
      `;

      updateCount(0);

      return;
    }


    tableBody.innerHTML =
      filtered.map(customer => {

        const initials =
          getInitials(customer.name);


        return `
          <tr>

            <!-- CUSTOMER -->

            <td>

              <div class="customer-cell">

                <div class="customer-avatar">
                  ${escapeHTML(initials)}
                </div>

                <div class="customer-name">

                  <strong>
                    ${escapeHTML(customer.name)}
                  </strong>

                  <span>
                    ${escapeHTML(customer.id)}
                  </span>

                </div>

              </div>

            </td>


            <!-- CONTACT -->

            <td>

              <div class="customer-contact">

                <span>
                  ${escapeHTML(customer.phone)}
                </span>

                <span>
                  ${escapeHTML(customer.email)}
                </span>

              </div>

            </td>


            <!-- ORDERS -->

            <td>

              <span class="customer-orders">
                ${customer.orders}
              </span>

            </td>


            <!-- SPENT -->

            <td>

              <span class="customer-spent">
                ${formatMoney(customer.spent)}
              </span>

            </td>


            <!-- LAST ORDER -->

            <td>

              <span class="customer-last-order">
                ${escapeHTML(customer.lastOrder)}
              </span>

            </td>


            <!-- STATUS -->

            <td>

              <span
                class="customer-status ${customer.status}"
              >

                <i class="fa-solid fa-circle"></i>

                ${
                  customer.status === "active"
                    ? "Active"
                    : "Inactive"
                }

              </span>

            </td>


            <!-- ACTION -->

            <td>

              <button
                type="button"
                class="customer-action-btn"
                data-customer-id="${escapeHTML(customer.id)}"
                title="View Customer"
              >

                <i class="fa-solid fa-eye"></i>

              </button>

            </td>

          </tr>
        `;
      }).join("");


    updateCount(
      filtered.length
    );
  }


  /* =========================================================
     COUNT
  ========================================================= */

  function updateCount(count) {

    const element =
      document.getElementById(
        "customersCount"
      );

    if (!element) {
      return;
    }

    element.textContent =
      `Showing ${count} of ${CUSTOMERS.length} customers`;
  }


  /* =========================================================
     SEARCH
  ========================================================= */

  if (tableSearch) {

    tableSearch.addEventListener(
      "input",
      renderCustomers
    );
  }


  if (headerSearch) {

    headerSearch.addEventListener(
      "input",
      function () {

        if (tableSearch) {
          tableSearch.value =
            headerSearch.value;

          renderCustomers();
        }
      }
    );
  }


  /* =========================================================
     FILTER
  ========================================================= */

  if (statusFilter) {

    statusFilter.addEventListener(
      "change",
      renderCustomers
    );
  }


  /* =========================================================
     VIEW CUSTOMER
  ========================================================= */

  if (tableBody) {

    tableBody.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(
            ".customer-action-btn"
          );

        if (!button) {
          return;
        }


        const customer =
          CUSTOMERS.find(
            item =>
              item.id ===
              button.dataset.customerId
          );


        if (!customer) {
          return;
        }


        openCustomerModal(
          customer
        );
      }
    );
  }


  /* =========================================================
     CUSTOMER MODAL
  ========================================================= */

  function openCustomerModal(customer) {

    let overlay =
      document.getElementById(
        "customerDetailsOverlay"
      );


    if (!overlay) {

      overlay =
        document.createElement("div");

      overlay.id =
        "customerDetailsOverlay";

      overlay.className =
        "customer-details-overlay";

      document.body.appendChild(
        overlay
      );


      const style =
        document.createElement("style");

      style.textContent = `

        .customer-details-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background: rgba(15,23,42,.56);

          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);

          opacity: 0;
          visibility: hidden;

          transition: .2s ease;
        }

        .customer-details-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .customer-details-modal {
          width: min(460px, 100%);

          padding: 26px;

          position: relative;

          background: #ffffff;

          border: 1px solid #e5e9ef;
          border-radius: 20px;

          box-shadow:
            0 30px 80px rgba(15,23,42,.20);
        }

        .customer-modal-close {
          position: absolute;
          top: 18px;
          right: 18px;

          width: 36px;
          height: 36px;

          border: 1px solid #e5e9ef;
          border-radius: 10px;

          background: #f8fafc;
          color: #718096;

          cursor: pointer;
        }

        .customer-modal-top {
          display: flex;
          align-items: center;
          gap: 14px;

          margin-bottom: 24px;
        }

        .customer-modal-avatar {
          width: 54px;
          height: 54px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 15px;

          background: #fff1ed;
          color: #ff5a36;

          font-size: 15px;
          font-weight: 800;
        }

        .customer-modal-top h2 {
          margin: 0;

          color: #172033;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 20px;
          font-weight: 800;
        }

        .customer-modal-top p {
          margin: 4px 0 0;

          color: #8a94a6;

          font-size: 10px;
        }

        .customer-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .customer-modal-info {
          padding: 13px;

          border: 1px solid #e8edf2;
          border-radius: 11px;

          background: #f8fafc;
        }

        .customer-modal-info span {
          display: block;

          margin-bottom: 5px;

          color: #8a94a6;

          font-size: 9px;
          font-weight: 600;
        }

        .customer-modal-info strong {
          color: #172033;

          font-size: 11px;
          font-weight: 700;
        }

        .customer-modal-total {
          margin-top: 12px;
          padding: 15px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-radius: 11px;

          background: #fff1ed;
        }

        .customer-modal-total span {
          color: #7b8494;
          font-size: 10px;
          font-weight: 600;
        }

        .customer-modal-total strong {
          color: #ff5a36;

          font-family:
            "Plus Jakarta Sans",
            sans-serif;

          font-size: 16px;
          font-weight: 800;
        }

        @media(max-width:520px) {
          .customer-modal-grid {
            grid-template-columns: 1fr;
          }
        }

      `;

      document.head.appendChild(
        style
      );
    }


    overlay.innerHTML = `

      <div class="customer-details-modal">

        <button
          type="button"
          class="customer-modal-close"
          id="customerModalClose"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>


        <div class="customer-modal-top">

          <div class="customer-modal-avatar">
            ${escapeHTML(
              getInitials(customer.name)
            )}
          </div>

          <div>

            <h2>
              ${escapeHTML(customer.name)}
            </h2>

            <p>
              ${escapeHTML(customer.id)}
            </p>

          </div>

        </div>


        <div class="customer-modal-grid">

          <div class="customer-modal-info">

            <span>
              PHONE
            </span>

            <strong>
              ${escapeHTML(customer.phone)}
            </strong>

          </div>


          <div class="customer-modal-info">

            <span>
              EMAIL
            </span>

            <strong>
              ${escapeHTML(customer.email)}
            </strong>

          </div>


          <div class="customer-modal-info">

            <span>
              TOTAL ORDERS
            </span>

            <strong>
              ${customer.orders}
            </strong>

          </div>


          <div class="customer-modal-info">

            <span>
              MEMBER SINCE
            </span>

            <strong>
              ${escapeHTML(customer.joined)}
            </strong>

          </div>

        </div>


        <div class="customer-modal-total">

          <span>
            TOTAL SPENT
          </span>

          <strong>
            ${formatMoney(customer.spent)}
          </strong>

        </div>

      </div>

    `;


    overlay.classList.add("show");


    document
      .getElementById(
        "customerModalClose"
      )
      ?.addEventListener(
        "click",
        closeCustomerModal
      );


    overlay.addEventListener(
      "click",
      function (event) {

        if (
          event.target === overlay
        ) {
          closeCustomerModal();
        }

      },
      { once: true }
    );
  }


  function closeCustomerModal() {

    document
      .getElementById(
        "customerDetailsOverlay"
      )
      ?.classList.remove(
        "show"
      );
  }


  /* =========================================================
     SIDEBAR TOGGLE
  ========================================================= */

  const sidebarToggle =
    document.getElementById(
      "sidebarToggle"
    );

  const sidebar =
    document.getElementById(
      "adminSidebar"
    );


  if (
    sidebarToggle &&
    sidebar
  ) {

    sidebarToggle.addEventListener(
      "click",
      function () {

        sidebar.classList.toggle(
          "open"
        );
      }
    );
  }


  /* =========================================================
     ESCAPE
  ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {
        closeCustomerModal();
      }

    }
  );


  /* =========================================================
     INIT
  ========================================================= */

  updateStats();
  renderCustomers();

})();