/* =========================================================
   TASTYLOOP ADMIN — OFFERS & COUPONS
========================================================= */

const OFFERS_STORAGE_KEY = "tastyloop_admin_offers";


/* =========================================================
   DEFAULT OFFERS
========================================================= */

const defaultOffers = [
  {
    id: 1,
    type: "coupon",
    title: "Flat 50% OFF",
    code: "TASTY50",
    discount: "50% OFF",
    message: "Get 50% off on your next food order.",
    minOrder: 499,
    image: "",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    active: true,
    homepage: true,
    popup: true,
    offersSection: true,
    redemptions: 642
  },

  {
    id: 2,
    type: "coupon",
    title: "Welcome Offer",
    code: "WELCOME100",
    discount: "₹100 OFF",
    message: "Get ₹100 off on your first order.",
    minOrder: 399,
    image: "",
    startDate: "2026-09-01",
    endDate: "2026-10-15",
    active: true,
    homepage: true,
    popup: true,
    offersSection: true,
    redemptions: 366
  },

  {
    id: 3,
    type: "campaign",
    title: "Diwali Dhamaka",
    code: "DIWALI40",
    discount: "40% OFF",
    message: "Celebrate Diwali with special savings.",
    minOrder: 699,
    image: "",
    startDate: "2026-10-15",
    endDate: "2026-11-10",
    active: false,
    homepage: true,
    popup: true,
    offersSection: true,
    redemptions: 0
  }
];


let offers = getOffers();
let editingOfferId = null;


/* =========================================================
   DOM
========================================================= */

const offersGrid = document.getElementById("offersGrid");

const createOfferBtn = document.getElementById("createOfferBtn");

const offerModal = document.getElementById("offerModal");

const closeOfferModal = document.getElementById("closeOfferModal");

const cancelOfferBtn = document.getElementById("cancelOfferBtn");

const offerForm = document.getElementById("offerForm");

const offerModalTitle = document.getElementById("offerModalTitle");

const offerSearch = document.getElementById("offerSearch");

const statusFilter = document.getElementById("statusFilter");

const typeFilter = document.getElementById("typeFilter");

const totalOffers = document.getElementById("totalOffers");

const activeOffers = document.getElementById("activeOffers");

const totalRedemptions = document.getElementById("totalRedemptions");

const expiringOffers = document.getElementById("expiringOffers");


/* =========================================================
   STORAGE
========================================================= */

function getOffers() {

  const saved = localStorage.getItem(OFFERS_STORAGE_KEY);

  if (!saved) {

    localStorage.setItem(
      OFFERS_STORAGE_KEY,
      JSON.stringify(defaultOffers)
    );

    return [...defaultOffers];
  }

  try {

    return JSON.parse(saved);

  } catch (error) {

    return [...defaultOffers];

  }
}


function saveOffers() {

  localStorage.setItem(
    OFFERS_STORAGE_KEY,
    JSON.stringify(offers)
  );

}


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function formatDate(dateString) {

  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString + "T00:00:00");

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

}


function getOfferStatus(offer) {

  if (!offer.active) {
    return "inactive";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = offer.startDate
    ? new Date(offer.startDate + "T00:00:00")
    : null;

  const end = offer.endDate
    ? new Date(offer.endDate + "T23:59:59")
    : null;

  if (start && today < start) {
    return "inactive";
  }

  if (end && today > end) {
    return "inactive";
  }

  return "active";
}


function getTypeLabel(type) {

  const labels = {
    coupon: "Coupon",
    banner: "Banner",
    campaign: "Festival Campaign"
  };

  return labels[type] || "Offer";
}


/* =========================================================
   RENDER
========================================================= */

function renderOffers() {

  if (!offersGrid) {
    return;
  }

  const searchValue = (offerSearch?.value || "")
    .trim()
    .toLowerCase();

  const selectedStatus = statusFilter?.value || "all";

  const selectedType = typeFilter?.value || "all";


  const filteredOffers = offers.filter((offer) => {

    const searchableText = `
      ${offer.title}
      ${offer.code}
      ${offer.message}
      ${offer.discount}
    `.toLowerCase();

    const matchesSearch =
      !searchValue ||
      searchableText.includes(searchValue);


    const status = getOfferStatus(offer);

    const matchesStatus =
      selectedStatus === "all" ||
      status === selectedStatus;


    const matchesType =
      selectedType === "all" ||
      offer.type === selectedType;


    return (
      matchesSearch &&
      matchesStatus &&
      matchesType
    );

  });


  if (!filteredOffers.length) {

    offersGrid.innerHTML = `
      <div class="offers-empty-state">
        <i class="fa-solid fa-tags"></i>
        <h3>No offers found</h3>
        <p>Try another search or create a new offer.</p>
      </div>
    `;

    updateOfferStats();

    return;
  }


  offersGrid.innerHTML = filteredOffers
    .map(renderOfferCard)
    .join("");


  updateOfferStats();

}


function renderOfferCard(offer) {

  const status = getOfferStatus(offer);

  const statusText =
    status === "active"
      ? "Active"
      : "Inactive";


  return `
    <article class="coupon-card">

      <div class="coupon-card-top">

        <div class="coupon-card-left">

          <span class="coupon-code">
            ${escapeHTML(offer.code || "OFFER")}
          </span>

          <span class="coupon-status ${status}">
            • ${statusText}
          </span>

        </div>

        <button
          class="coupon-more-btn"
          type="button"
          data-action="menu"
          data-id="${offer.id}"
          aria-label="Offer actions"
        >
          <i class="fa-solid fa-ellipsis"></i>
        </button>

      </div>


      <div class="coupon-card-body">

        <div class="coupon-type">
          ${escapeHTML(getTypeLabel(offer.type))}
        </div>

        <h3>
          ${escapeHTML(offer.title)}
        </h3>

        <p class="coupon-message">
          ${escapeHTML(offer.message)}
        </p>


        <div class="coupon-meta">

          <div class="coupon-meta-item">

            <span>Discount</span>

            <strong>
              ${escapeHTML(offer.discount)}
            </strong>

          </div>


          <div class="coupon-meta-item">

            <span>Min. Order</span>

            <strong>
              ${offer.minOrder
                ? "₹" + Number(offer.minOrder).toLocaleString("en-IN")
                : "No minimum"}
            </strong>

          </div>


          <div class="coupon-meta-item">

            <span>Valid From</span>

            <strong>
              ${formatDate(offer.startDate)}
            </strong>

          </div>


          <div class="coupon-meta-item">

            <span>Valid Till</span>

            <strong>
              ${formatDate(offer.endDate)}
            </strong>

          </div>

        </div>

      </div>


      <div class="coupon-card-footer">

        <span class="coupon-redemptions">
          ${Number(offer.redemptions || 0).toLocaleString("en-IN")}
          redemptions
        </span>

        <button
          class="coupon-action-btn"
          type="button"
          data-action="edit"
          data-id="${offer.id}"
        >
          Edit Offer
        </button>

      </div>

    </article>
  `;

}


/* =========================================================
   STATS
========================================================= */

function updateOfferStats() {

  if (!totalOffers) {
    return;
  }

  totalOffers.textContent = offers.length;


  const activeCount = offers.filter(
    offer => getOfferStatus(offer) === "active"
  ).length;

  activeOffers.textContent = activeCount;


  const redemptions = offers.reduce(
    (total, offer) =>
      total + Number(offer.redemptions || 0),
    0
  );

  totalRedemptions.textContent =
    redemptions.toLocaleString("en-IN");


  const today = new Date();

  today.setHours(0, 0, 0, 0);


  const sevenDays = new Date(today);

  sevenDays.setDate(
    sevenDays.getDate() + 7
  );


  const expiringCount = offers.filter((offer) => {

    if (!offer.endDate) {
      return false;
    }

    const endDate =
      new Date(offer.endDate + "T23:59:59");

    return (
      getOfferStatus(offer) === "active" &&
      endDate >= today &&
      endDate <= sevenDays
    );

  }).length;


  expiringOffers.textContent = expiringCount;

}


/* =========================================================
   MODAL
========================================================= */

function openOfferModal(offer = null) {

  if (!offerModal || !offerForm) {
    return;
  }


  editingOfferId = offer ? offer.id : null;


  offerModalTitle.textContent =
    offer ? "Edit Offer" : "Create Offer";


  offerForm.reset();


  if (offer) {

    document.querySelector(
      `input[name="offerType"][value="${offer.type}"]`
    ).checked = true;

    document.getElementById("offerTitle").value =
      offer.title || "";

    document.getElementById("couponCode").value =
      offer.code || "";

    document.getElementById("discountValue").value =
      offer.discount || "";

    document.getElementById("offerMessage").value =
      offer.message || "";

    document.getElementById("minOrder").value =
      offer.minOrder || "";

    document.getElementById("offerImage").value =
      offer.image || "";

    document.getElementById("startDate").value =
      offer.startDate || "";

    document.getElementById("endDate").value =
      offer.endDate || "";

    document.getElementById("showHomepage").checked =
      offer.homepage !== false;

    document.getElementById("showPopup").checked =
      offer.popup !== false;

    document.getElementById("showOffers").checked =
      offer.offersSection !== false;

  }


  updateOfferTypeUI();


  offerModal.classList.add("show");

  document.body.style.overflow = "hidden";

}


function closeOfferModalBox() {

  if (!offerModal) {
    return;
  }

  offerModal.classList.remove("show");

  document.body.style.overflow = "";

  editingOfferId = null;

}


/* =========================================================
   OFFER TYPE UI
========================================================= */

function updateOfferTypeUI() {

  const selectedType =
    document.querySelector(
      'input[name="offerType"]:checked'
    )?.value || "coupon";


  document.querySelectorAll(
    ".offer-type-option"
  ).forEach((option) => {

    const input = option.querySelector("input");

    option.classList.toggle(
      "active",
      input?.checked
    );

  });


  const couponCodeGroup =
    document.getElementById("couponCodeGroup");


  if (couponCodeGroup) {

    couponCodeGroup.style.display =
      selectedType === "coupon"
        ? ""
        : "none";

  }

}


/* =========================================================
   FORM SUBMIT
========================================================= */

function handleOfferSubmit(event) {

  event.preventDefault();


  const selectedType =
    document.querySelector(
      'input[name="offerType"]:checked'
    )?.value || "coupon";


  const title =
    document.getElementById("offerTitle").value.trim();

  const code =
    document.getElementById("couponCode").value
      .trim()
      .toUpperCase();

  const discount =
    document.getElementById("discountValue").value.trim();

  const message =
    document.getElementById("offerMessage").value.trim();

  const minOrder =
    Number(document.getElementById("minOrder").value || 0);

  const image =
    document.getElementById("offerImage").value.trim();

  const startDate =
    document.getElementById("startDate").value;

  const endDate =
    document.getElementById("endDate").value;


  if (!title || !discount || !startDate || !endDate) {

    showOfferToast(
      "Please fill all required fields.",
      "error"
    );

    return;
  }


  if (endDate < startDate) {

    showOfferToast(
      "End date cannot be before start date.",
      "error"
    );

    return;
  }


  const offerData = {

    type: selectedType,

    title,

    code:
      selectedType === "coupon"
        ? code
        : code || "CAMPAIGN",

    discount,

    message,

    minOrder,

    image,

    startDate,

    endDate,

    active: true,

    homepage:
      document.getElementById("showHomepage").checked,

    popup:
      document.getElementById("showPopup").checked,

    offersSection:
      document.getElementById("showOffers").checked

  };


  if (editingOfferId !== null) {

    const existingOffer =
      offers.find(
        offer => offer.id === editingOfferId
      );


    if (existingOffer) {

      Object.assign(
        existingOffer,
        offerData
      );

    }

    saveOffers();

    closeOfferModalBox();

    renderOffers();

    showOfferToast(
      "Offer updated successfully."
    );

    return;

  }


  const newOffer = {

    id: Date.now(),

    ...offerData,

    redemptions: 0

  };


  offers.unshift(newOffer);

  saveOffers();

  closeOfferModalBox();

  renderOffers();

  showOfferToast(
    "Offer published successfully."
  );

}


/* =========================================================
   DELETE
========================================================= */

function deleteOffer(id) {

  const offer =
    offers.find(
      item => item.id === id
    );

  if (!offer) {
    return;
  }


  const confirmed =
    window.confirm(
      `Delete "${offer.title}"?`
    );


  if (!confirmed) {
    return;
  }


  offers =
    offers.filter(
      item => item.id !== id
    );


  saveOffers();

  renderOffers();

  showOfferToast(
    "Offer deleted."
  );

}


/* =========================================================
   TOGGLE STATUS
========================================================= */

function toggleOfferStatus(id) {

  const offer =
    offers.find(
      item => item.id === id
    );

  if (!offer) {
    return;
  }


  offer.active = !offer.active;

  saveOffers();

  renderOffers();

  showOfferToast(
    offer.active
      ? "Offer activated."
      : "Offer deactivated."
  );

}


/* =========================================================
   OFFER ACTIONS
========================================================= */

function showOfferActions(id) {

  const offer =
    offers.find(
      item => item.id === id
    );

  if (!offer) {
    return;
  }


  const action =
    window.prompt(
      `Offer: ${offer.title}\n\n` +
      `Type one option:\n` +
      `edit\n` +
      `${offer.active ? "deactivate" : "activate"}\n` +
      `delete`
    );


  if (!action) {
    return;
  }


  const selectedAction =
    action.trim().toLowerCase();


  if (selectedAction === "edit") {

    openOfferModal(offer);

    return;

  }


  if (
    selectedAction === "activate" ||
    selectedAction === "deactivate"
  ) {

    toggleOfferStatus(id);

    return;

  }


  if (selectedAction === "delete") {

    deleteOffer(id);

  }

}


/* =========================================================
   TOAST
========================================================= */

function showOfferToast(message, type = "success") {

  const oldToast =
    document.querySelector(".offer-toast");

  if (oldToast) {
    oldToast.remove();
  }


  const toast =
    document.createElement("div");

  toast.className =
    "offer-toast";


  toast.innerHTML = `
    <i class="fa-solid ${
      type === "error"
        ? "fa-circle-exclamation"
        : "fa-circle-check"
    }"></i>

    <span>
      ${escapeHTML(message)}
    </span>
  `;


  Object.assign(
    toast.style,
    {
      position: "fixed",
      right: "22px",
      bottom: "22px",
      zIndex: "2000",
      display: "flex",
      alignItems: "center",
      gap: "9px",
      padding: "12px 15px",
      borderRadius: "10px",
      background: "#172033",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "600",
      boxShadow: "0 12px 30px rgba(0,0,0,.16)"
    }
  );


  document.body.appendChild(toast);


  setTimeout(() => {

    toast.remove();

  }, 2600);

}


/* =========================================================
   EVENTS
========================================================= */

createOfferBtn?.addEventListener(
  "click",
  () => openOfferModal()
);


closeOfferModal?.addEventListener(
  "click",
  closeOfferModalBox
);


cancelOfferBtn?.addEventListener(
  "click",
  closeOfferModalBox
);


offerModal?.addEventListener(
  "click",
  (event) => {

    if (event.target === offerModal) {
      closeOfferModalBox();
    }

  }
);


offerForm?.addEventListener(
  "submit",
  handleOfferSubmit
);


offerSearch?.addEventListener(
  "input",
  renderOffers
);


statusFilter?.addEventListener(
  "change",
  renderOffers
);


typeFilter?.addEventListener(
  "change",
  renderOffers
);


document.querySelectorAll(
  'input[name="offerType"]'
).forEach((input) => {

  input.addEventListener(
    "change",
    updateOfferTypeUI
  );

});


offersGrid?.addEventListener(
  "click",
  (event) => {

    const button =
      event.target.closest("[data-action]");

    if (!button) {
      return;
    }


    const action =
      button.dataset.action;

    const id =
      Number(button.dataset.id);


    if (action === "edit") {

      const offer =
        offers.find(
          item => item.id === id
        );

      if (offer) {
        openOfferModal(offer);
      }

      return;
    }


    if (action === "menu") {

      showOfferActions(id);

    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeOfferModalBox();
    }

  }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

renderOffers();

updateOfferTypeUI();