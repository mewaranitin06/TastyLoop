/* =========================================================
   TASTYLOOP — FINAL CORE
   PRODUCT CATALOG + CART + CHECKOUT + SEARCH + REWARDS

   IMPORTANT:
   Future products sirf PRODUCTS array mein add karo.
========================================================= */

"use strict";

console.log("🔥 TastyLoop Core loading...");


/* =========================================================
   1. PRODUCT DATABASE
   =========================================================

   ⭐ PRODUCTS YAHAN ADD / EDIT KARO

   Required:
   id
   name
   restaurant
   category
   price
   image

   Optional:
   rating
   delivery
   offer
   description
   verified
========================================================= */

const PRODUCTS = [

  {
    id: "burger-001",
    name: "Classic Cheese Burger",
    restaurant: "McDonald's",
    category: "Burgers",
    price: 249,
    rating: 4.8,
    delivery: "25–35 min",
    offer: "20% OFF",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: "pizza-001",
    name: "Farmhouse Pizza",
    restaurant: "Domino's Pizza",
    category: "Pizza",
    price: 399,
    rating: 4.7,
    delivery: "20–30 min",
    offer: "30% OFF",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: "biryani-001",
    name: "Chicken Biryani",
    restaurant: "Biryani Blues",
    category: "Indian",
    price: 329,
    rating: 4.9,
    delivery: "30–40 min",
    offer: "15% OFF",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: "healthy-001",
    name: "Protein Power Bowl",
    restaurant: "Urban Kitchen",
    category: "Healthy",
    price: 349,
    rating: 4.6,
    delivery: "25–35 min",
    offer: "10% OFF",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: "pasta-001",
    name: "Truffle Mushroom Pasta",
    restaurant: "Urban Kitchen",
    category: "Pasta",
    price: 329,
    rating: 4.8,
    delivery: "25–35 min",
    offer: "15% OFF",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: "burger-002",
    name: "Peri Peri Burger",
    restaurant: "Burger House",
    category: "Burgers",
    price: 279,
    rating: 4.7,
    delivery: "20–30 min",
    offer: "10% OFF",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: "cake-001",
    name: "Chocolate Cake",
    restaurant: "Sweet Truth",
    category: "Desserts",
    price: 189,
    rating: 4.8,
    delivery: "20–30 min",
    offer: "10% OFF",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: "shake-001",
    name: "Chocolate Shake",
    restaurant: "Shake Factory",
    category: "Drinks",
    price: 159,
    rating: 4.7,
    delivery: "15–25 min",
    offer: "5% OFF",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80"
  }

];


/* =========================================================
   2. CART SETTINGS
========================================================= */

const FREE_DELIVERY_LIMIT = 499;
const DELIVERY_CHARGE = 49;
const TAX_RATE = 0.05;

let cart = [];

let appliedCoupon = null;


/* =========================================================
   3. DOM HELPERS
========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return Array.from(
    document.querySelectorAll(selector)
  );
}


/* =========================================================
   4. DOM ELEMENTS
========================================================= */

const cartDrawer =
  $("#cartDrawer");

const cartOverlay =
  $("#overlay");

const cartItems =
  $("#cartItems");

const cartCount =
  $("#cartCount");

const cartItemCount =
  $("#cartItemCount");

const subtotalElement =
  $("#subtotal");

const deliveryFeeElement =
  $("#deliveryFee");

const taxElement =
  $("#tax");

const discountElement =
  $("#discount");

const discountRow =
  $("#discountRow");

const totalElement =
  $("#total");

const checkoutTotal =
  $("#checkoutTotal");

const progressFill =
  $("#progressFill");

const deliveryMessage =
  $("#deliveryMessage");

const deliveryPercent =
  $("#deliveryPercent");

const checkoutOverlay =
  $("#checkoutOverlay");

const successOverlay =
  $("#successOverlay");

const toast =
  $("#toast");

const toastText =
  $("#toastText");


/* =========================================================
   5. MONEY
========================================================= */

function formatMoney(value) {

  return (
    "₹" +
    Math.round(
      Number(value) || 0
    ).toLocaleString("en-IN")
  );

}


/* =========================================================
   6. TOAST
========================================================= */

function showToast(message) {

  if (!toast) {

    console.log(message);

    return;

  }

  if (toastText) {

    toastText.textContent =
      message;

  }

  toast.classList.add("show");

  clearTimeout(
    window.__tastyToastTimer
  );

  window.__tastyToastTimer =
    setTimeout(function () {

      toast.classList.remove(
        "show"
      );

    }, 2200);

}

window.showToast =
  showToast;


/* =========================================================
   7. PRODUCT FINDER
========================================================= */

function getProduct(productId) {

  return PRODUCTS.find(
    product =>
      String(product.id) ===
      String(productId)
  );

}


/* =========================================================
   8. RENDER PRODUCT CARDS
========================================================= */

function renderProducts(
  products = PRODUCTS
) {

  const grid =
    $("#restaurantGrid");

  if (!grid) {

    console.warn(
      "restaurantGrid not found"
    );

    return;

  }


  if (!products.length) {

    grid.innerHTML = `

      <div class="empty-cart">

        <div class="empty-cart-icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <h3>No food found</h3>

        <p>
          Try another food or restaurant.
        </p>

      </div>

    `;

    return;

  }


  grid.innerHTML =
    products.map(
      product => `

        <article
          class="restaurant-card"
          data-category="${product.category}"
          data-name="${product.restaurant}"
          data-product-id="${product.id}"
        >

          <div class="restaurant-image">

            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
            >

            ${
              product.offer
                ? `
                  <span class="offer-pill">
                    ${product.offer}
                  </span>
                `
                : ""
            }

            <button
              class="favorite-btn"
              type="button"
              data-favorite="${product.id}"
            >
              <i class="fa-regular fa-heart"></i>
            </button>

          </div>


          <div class="restaurant-content">

            <div class="restaurant-title">

              <h3>
                ${product.restaurant}
              </h3>

              ${
                product.verified
                  ? `
                    <span class="verified">
                      <i class="fa-solid fa-check"></i>
                    </span>
                  `
                  : ""
              }

            </div>


            <p>
              ${product.category}
              · Fast Food
            </p>


            <div class="restaurant-meta">

              <span class="rating">

                <i class="fa-solid fa-star"></i>

                ${product.rating || "4.5"}

              </span>

              <span>
                ${product.delivery || "25–35 min"}
              </span>

              <span>
                ₹₹
              </span>

            </div>


            <div class="food-row">

              <div>

                <strong>
                  ${product.name}
                </strong>

                <span>
                  ${formatMoney(product.price)}
                </span>

              </div>


              <button
                type="button"
                class="add-btn"
                data-product-id="${product.id}"
              >

                <i class="fa-solid fa-plus"></i>

                Add

              </button>

            </div>

          </div>

        </article>

      `
    ).join("");

}


/* =========================================================
   9. CART STORAGE
========================================================= */

function saveCart() {

  try {

    localStorage.setItem(
      "tastyloop_cart",
      JSON.stringify(cart)
    );

  } catch (error) {

    console.warn(
      "Cart storage unavailable",
      error
    );

  }

}


function loadCart() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "tastyloop_cart"
        )
      );

    if (
      Array.isArray(saved)
    ) {

      cart = saved;

    }

  } catch (error) {

    cart = [];

  }

}


/* =========================================================
   10. CART CALCULATIONS
========================================================= */

function getSubtotal() {

  return cart.reduce(
    function (
      total,
      item
    ) {

      return (
        total +
        Number(item.price) *
        Number(item.quantity)
      );

    },
    0
  );

}


function getDeliveryFee() {

  const subtotal =
    getSubtotal();

  if (
    subtotal <= 0
  ) {

    return 0;

  }

  if (
    subtotal >=
    FREE_DELIVERY_LIMIT
  ) {

    return 0;

  }

  if (
    appliedCoupon ===
      "FREEDELIVERY" &&
    subtotal >= 299
  ) {

    return 0;

  }

  return DELIVERY_CHARGE;

}


function getTax() {

  return (
    getSubtotal() *
    TAX_RATE
  );

}


function getDiscount() {

  const subtotal =
    getSubtotal();

  if (!appliedCoupon) {

    return 0;

  }

  if (
    appliedCoupon ===
    "TASTY50"
  ) {

    return Math.min(
      subtotal * 0.20,
      150
    );

  }

  if (
    appliedCoupon ===
    "WELCOME100"
  ) {

    return Math.min(
      100,
      subtotal
    );

  }

  if (
    appliedCoupon ===
    "FREEDELIVERY"
  ) {

    return subtotal >= 299
      ? DELIVERY_CHARGE
      : 0;

  }

  return 0;

}


function getTotal() {

  return Math.max(
    0,
    getSubtotal() +
    getDeliveryFee() +
    getTax() -
    getDiscount()
  );

}


/* =========================================================
   11. CART OPEN / CLOSE
========================================================= */

function openCartDrawer() {

  cartDrawer?.classList.add(
    "open"
  );

  cartOverlay?.classList.add(
    "active"
  );

  document.body.classList.add(
    "cart-open"
  );

}


function closeCartDrawer() {

  cartDrawer?.classList.remove(
    "open"
  );

  cartOverlay?.classList.remove(
    "active"
  );

  document.body.classList.remove(
    "cart-open"
  );

}

window.openCartDrawer =
  openCartDrawer;

window.closeCartDrawer =
  closeCartDrawer;


/* =========================================================
   12. ADD TO CART
========================================================= */

function addToCart(
  name,
  price,
  image,
  productId = null
) {

  name =
    String(name || "").trim();

  price =
    Number(price);

  if (!name) {

    showToast(
      "Product name missing"
    );

    return false;

  }

  if (
    !Number.isFinite(price)
  ) {

    showToast(
      "Invalid product price"
    );

    return false;

  }


  const existing =
    cart.find(
      item =>
        item.name.toLowerCase() ===
        name.toLowerCase()
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id:
        productId ||
        (
          Date.now() +
          Math.floor(
            Math.random() * 1000
          )
        ),

      productId,

      name,

      price,

      quantity: 1,

      image:
        image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"

    });

  }


  saveCart();

  renderCart();

  showToast(
    `${name} added to cart 🛒`
  );

  openCartDrawer();

  return true;

}

window.addToCart =
  addToCart;


/* =========================================================
   13. CART RENDER
========================================================= */

function renderCart() {

  const quantity =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(item.quantity),
      0
    );


  if (cartCount) {

    cartCount.textContent =
      quantity;

  }


  if (cartItemCount) {

    cartItemCount.textContent =
      `(${quantity})`;

  }


  if (!cartItems) {

    updateSummary();

    return;

  }


  if (
    cart.length === 0
  ) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <div class="empty-cart-icon">

          <i class="fa-solid fa-bag-shopping"></i>

        </div>

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add something delicious
          to get started.
        </p>

        <button
          type="button"
          id="startShopping"
        >
          Start shopping
        </button>

      </div>

    `;

  } else {

    cartItems.innerHTML =
      cart.map(
        item => {

          const itemTotal =
            Number(item.price) *
            Number(item.quantity);

          return `

            <article
              class="cart-item"
              data-cart-id="${item.id}"
            >

              <div class="cart-item-image">

                <img
                  src="${item.image}"
                  alt="${item.name}"
                >

              </div>


              <div class="cart-item-content">

                <strong>
                  ${item.name}
                </strong>

                <span>
                  ${formatMoney(item.price)}
                </span>


                <div class="cart-item-bottom">

                  <div class="quantity">

                    <button
                      type="button"
                      data-cart-minus="${item.id}"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>

                    <span>
                      ${item.quantity}
                    </span>

                    <button
                      type="button"
                      data-cart-plus="${item.id}"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>

                  </div>


                  <div class="cart-item-actions">

                    <strong class="cart-item-total">
                      ${formatMoney(itemTotal)}
                    </strong>

                    <button
                      type="button"
                      class="remove-item"
                      data-cart-remove="${item.id}"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>

                  </div>

                </div>

              </div>

            </article>

          `;

        }
      ).join("");

  }


  updateSummary();

}


/* =========================================================
   14. QUANTITY
========================================================= */

function changeQuantity(
  id,
  change
) {

  const item =
    cart.find(
      product =>
        Number(product.id) ===
        Number(id)
    );

  if (!item) {

    return;

  }


  item.quantity +=
    Number(change);


  if (
    item.quantity <= 0
  ) {

    cart =
      cart.filter(
        product =>
          Number(product.id) !==
          Number(id)
      );

  }


  saveCart();

  renderCart();

}

window.changeQuantity =
  changeQuantity;


/* =========================================================
   15. REMOVE ITEM
========================================================= */

function removeItem(id) {

  const item =
    cart.find(
      product =>
        Number(product.id) ===
        Number(id)
    );


  cart =
    cart.filter(
      product =>
        Number(product.id) !==
        Number(id)
    );


  saveCart();

  renderCart();


  if (item) {

    showToast(
      `${item.name} removed`
    );

  }

}

window.removeItem =
  removeItem;


/* =========================================================
   16. SUMMARY
========================================================= */

function updateSummary() {

  const subtotal =
    getSubtotal();

  const delivery =
    getDeliveryFee();

  const tax =
    getTax();

  const discount =
    getDiscount();

  const total =
    getTotal();


  if (subtotalElement) {

    subtotalElement.textContent =
      formatMoney(subtotal);

  }


  if (deliveryFeeElement) {

    deliveryFeeElement.textContent =
      delivery === 0 &&
      subtotal > 0
        ? "FREE"
        : formatMoney(
            delivery
          );

  }


  if (taxElement) {

    taxElement.textContent =
      formatMoney(tax);

  }


  if (discountElement) {

    discountElement.textContent =
      `-${formatMoney(discount)}`;

  }


  if (totalElement) {

    totalElement.textContent =
      formatMoney(total);

  }


  if (checkoutTotal) {

    checkoutTotal.textContent =
      formatMoney(total);

  }


  if (discountRow) {

    discountRow.classList.toggle(
      "show",
      discount > 0
    );

  }


  const progress =
    Math.min(
      100,
      subtotal /
        FREE_DELIVERY_LIMIT *
        100
    );


  if (progressFill) {

    progressFill.style.width =
      `${progress}%`;

  }


  if (deliveryPercent) {

    deliveryPercent.textContent =
      `${Math.round(progress)}%`;

  }


  if (deliveryMessage) {

    if (
      subtotal >=
      FREE_DELIVERY_LIMIT
    ) {

      deliveryMessage.textContent =
        "You've unlocked free delivery 🎉";

    } else {

      deliveryMessage.textContent =
        `Add ${formatMoney(
          FREE_DELIVERY_LIMIT -
          subtotal
        )} more for free delivery`;

    }

  }

}


/* =========================================================
   17. CHECKOUT
========================================================= */

function openCheckout() {

  if (
    cart.length === 0
  ) {

    showToast(
      "Your cart is empty"
    );

    return;

  }


  /*
    IMPORTANT FIX:

    Cart MUST close before
    checkout opens.
  */

  closeCartDrawer();


  renderCheckout();


  checkoutOverlay?.classList.add(
    "show"
  );

  checkoutOverlay?.setAttribute(
    "aria-hidden",
    "false"
  );

}

window.openCheckout =
  openCheckout;


function closeCheckout() {

  checkoutOverlay?.classList.remove(
    "show"
  );

  checkoutOverlay?.setAttribute(
    "aria-hidden",
    "true"
  );

}

window.closeCheckout =
  closeCheckout;


/* =========================================================
   18. CHECKOUT RENDER
========================================================= */

function renderCheckout() {

  const checkoutItems =
    $("#checkoutItems");

  if (checkoutItems) {

    checkoutItems.innerHTML =
      cart.map(
        item => `

          <div class="checkout-item">

            <img
              src="${item.image}"
              alt="${item.name}"
            >

            <div>

              <strong>
                ${item.name}
              </strong>

              <span>
                ${item.quantity}
                ×
                ${formatMoney(item.price)}
              </span>

            </div>

            <strong>
              ${formatMoney(
                item.price *
                item.quantity
              )}
            </strong>

          </div>

        `
      ).join("");

  }


  const values = {

    checkoutSubtotal:
      formatMoney(
        getSubtotal()
      ),

    checkoutDelivery:
      getDeliveryFee() === 0
        ? "FREE"
        : formatMoney(
            getDeliveryFee()
          ),

    checkoutTax:
      formatMoney(
        getTax()
      ),

    checkoutFinalTotal:
      formatMoney(
        getTotal()
      )

  };


  Object.entries(values)
    .forEach(
      ([id, value]) => {

        const element =
          document.getElementById(
            id
          );

        if (element) {

          element.textContent =
            value;

        }

      }
    );

}


/* =========================================================
   19. PLACE ORDER
========================================================= */

function placeOrder() {

  if (
    cart.length === 0
  ) {

    showToast(
      "Your cart is empty"
    );

    return;

  }


  const button =
    $("#placeOrder");


  if (button) {

    button.disabled =
      true;

    button.innerHTML = `

      <i
        class="fa-solid fa-spinner fa-spin"
      ></i>

      Processing...

    `;

  }


  setTimeout(
    function () {

      if (button) {

        button.disabled =
          false;

        button.innerHTML = `

          Place order

          <i
            class="fa-solid fa-arrow-right"
          ></i>

        `;

      }


      /*
        CLOSE BOTH.
      */

      closeCheckout();

      closeCartDrawer();


      const orderNumber =
        $("#orderNumber");

      if (orderNumber) {

        orderNumber.textContent =
          Math.floor(
            10000 +
            Math.random() *
            89999
          );

      }


      /*
        Reward for successful order
      */

      addOrderReward();


      /*
        Clear cart
      */

      cart = [];

      appliedCoupon =
        null;

      saveCart();

      renderCart();


      successOverlay?.classList.add(
        "show"
      );

    },
    900
  );

}


/* =========================================================
   20. COUPONS
========================================================= */

function applyCoupon() {

  const input =
    $("#couponInput");

  const message =
    $("#couponMessage");


  const code =
    input?.value
      ?.trim()
      .toUpperCase();


  if (!code) {

    if (message) {

      message.textContent =
        "Enter a coupon code.";

      message.className =
        "error";

    }

    return;

  }


  const validCoupons = [

    "TASTY50",

    "WELCOME100",

    "FREEDELIVERY"

  ];


  if (
    !validCoupons.includes(code)
  ) {

    if (message) {

      message.textContent =
        "Invalid coupon code.";

      message.className =
        "error";

    }

    return;

  }


  appliedCoupon =
    code;


  if (message) {

    message.textContent =
      code === "TASTY50"
        ? "🎉 20% off applied!"
        : code === "WELCOME100"
          ? "🎉 ₹100 discount applied!"
          : "🚚 Free delivery unlocked!";

    message.className =
      "success";

  }


  updateSummary();

  showToast(
    "Coupon applied successfully"
  );

}


/* =========================================================
   21. REWARDS
========================================================= */

const REWARD_KEY =
  "tastyloopRewards";


const defaultRewards = {

  coins: 1280,

  streak: 7,

  xp: 1740,

  claimedToday: false

};


let rewardsState = {
  ...defaultRewards
};


function loadRewards() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          REWARD_KEY
        )
      );

    if (saved) {

      rewardsState = {

        ...defaultRewards,

        ...saved

      };

    }

  } catch (error) {

    rewardsState = {
      ...defaultRewards
    };

  }

}


function saveRewards() {

  try {

    localStorage.setItem(
      REWARD_KEY,
      JSON.stringify(
        rewardsState
      )
    );

  } catch (error) {

    console.warn(
      "Rewards save failed"
    );

  }

}


window.rewardsState =
  rewardsState;


/* =========================================================
   22. CLAIM DAILY REWARD
========================================================= */

function claimDailyReward() {

  if (
    rewardsState.claimedToday
  ) {

    showToast(
      "Daily reward already claimed"
    );

    return;

  }


  rewardsState.coins +=
    75;

  rewardsState.xp +=
    25;

  rewardsState.claimedToday =
    true;


  saveRewards();

  updateRewardsUI();


  showToast(
    "+75 TastyCoins 🎉"
  );

}


window.claimDailyReward =
  claimDailyReward;


/* =========================================================
   23. ORDER REWARD
========================================================= */

function addOrderReward() {

  rewardsState.coins +=
    50;

  rewardsState.xp +=
    100;

  rewardsState.streak +=
    1;

  rewardsState.claimedToday =
    false;


  saveRewards();

  updateRewardsUI();

}


function getRewardLevel(xp) {

  if (
    xp >= 2000
  ) {

    return {
      name: "Legend",
      next: null
    };

  }

  if (
    xp >= 1000
  ) {

    return {
      name: "Pro Foodie",
      next: "Legend"
    };

  }

  if (
    xp >= 500
  ) {

    return {
      name: "Foodie",
      next: "Pro Foodie"
    };

  }

  return {

    name: "Starter",

    next: "Foodie"

  };

}


window.getRewardLevel =
  getRewardLevel;


function updateRewardsUI() {

  const level =
    getRewardLevel(
      rewardsState.xp
    );


  const values = {

    coinBalance:
      rewardsState.coins
        .toLocaleString("en-IN"),

    redeemBalance:
      rewardsState.coins
        .toLocaleString("en-IN"),

    levelName:
      level.name,

    levelProgressText:
      `${rewardsState.xp} XP`,

    nextLevelName:
      level.next ||
      "Max level",

    streakCount:
      rewardsState.streak,

    walletCoinBalance:
      `${rewardsState.coins.toLocaleString("en-IN")} TastyCoins`,

    walletStreak:
      `${rewardsState.streak} days`,

    walletLevel:
      level.name

  };


  Object.entries(values)
    .forEach(
      ([id, value]) => {

        const element =
          document.getElementById(
            id
          );

        if (element) {

          element.textContent =
            value;

        }

      }
    );


  const claim =
    $("#claimDailyReward");


  if (claim) {

    claim.disabled =
      rewardsState.claimedToday;

    claim.textContent =
      rewardsState.claimedToday
        ? "Claimed"
        : "Claim";

  }


  const rewardText =
    $("#dailyRewardText");


  if (rewardText) {

    rewardText.textContent =
      rewardsState.claimedToday
        ? "Come back tomorrow for another drop."
        : "Your daily reward is ready.";

  }

}


/* =========================================================
   24. SEARCH
========================================================= */

function searchProducts(
  query
) {

  const value =
    String(query || "")
      .toLowerCase()
      .trim();


  if (!value) {

    renderProducts(
      PRODUCTS
    );

    return;

  }


  const results =
    PRODUCTS.filter(
      product => {

        return (

          product.name
            .toLowerCase()
            .includes(value)

          ||

          product.restaurant
            .toLowerCase()
            .includes(value)

          ||

          product.category
            .toLowerCase()
            .includes(value)

        );

      }
    );


  renderProducts(
    results
  );

}


/* =========================================================
   25. EVENTS
========================================================= */

document.addEventListener(
  "click",
  function (event) {

    const target =
      event.target;


    /* -------------------------
       ADD PRODUCT
    ------------------------- */

    const addButton =
      target.closest(
        ".add-btn, .recommend-add, .food-add, .menu-add, [data-add-to-cart]"
      );


    if (addButton) {

      event.preventDefault();

      const productId =
        addButton.dataset.productId;


      if (productId) {

        const product =
          getProduct(
            productId
          );

        if (product) {

          addToCart(

            product.name,

            product.price,

            product.image,

            product.id

          );

        }

      } else {

        /*
          Compatibility with
          old HTML buttons.
        */

        const name =
          addButton.dataset.name;

        const price =
          Number(
            addButton.dataset.price
          );

        const image =
          addButton.dataset.image;


        addToCart(
          name,
          price,
          image
        );

      }

      return;

    }


    /* -------------------------
       CART PLUS
    ------------------------- */

    const plus =
      target.closest(
        "[data-cart-plus]"
      );

    if (plus) {

      changeQuantity(
        plus.dataset.cartPlus,
        1
      );

      return;

    }


    /* -------------------------
       CART MINUS
    ------------------------- */

    const minus =
      target.closest(
        "[data-cart-minus]"
      );

    if (minus) {

      changeQuantity(
        minus.dataset.cartMinus,
        -1
      );

      return;

    }


    /* -------------------------
       REMOVE
    ------------------------- */

    const remove =
      target.closest(
        "[data-cart-remove]"
      );

    if (remove) {

      removeItem(
        remove.dataset.cartRemove
      );

      return;

    }


    /* -------------------------
       OPEN CART
    ------------------------- */

    if (
      target.closest(
        "#openCart"
      )
    ) {

      openCartDrawer();

      return;

    }


    /* -------------------------
       CLOSE CART
    ------------------------- */

    if (
      target.closest(
        "#closeCart"
      )
    ) {

      closeCartDrawer();

      return;

    }


    /* -------------------------
       CHECKOUT
    ------------------------- */

    if (
      target.closest(
        "#checkoutBtn"
      )
    ) {

      event.preventDefault();

      openCheckout();

      return;

    }


    /* -------------------------
       CLOSE CHECKOUT
    ------------------------- */

    if (
      target.closest(
        "#closeCheckout"
      )
    ) {

      closeCheckout();

      return;

    }


    /* -------------------------
       PLACE ORDER
    ------------------------- */

    if (
      target.closest(
        "#placeOrder"
      )
    ) {

      event.preventDefault();

      placeOrder();

      return;

    }


    /* -------------------------
       COUPON
    ------------------------- */

    if (
      target.closest(
        "#applyCoupon"
      )
    ) {

      applyCoupon();

      return;

    }


    /* -------------------------
       DAILY REWARD
    ------------------------- */

    if (
      target.closest(
        "#claimDailyReward"
      )
    ) {

      claimDailyReward();

      return;

    }


    /* -------------------------
       START SHOPPING
    ------------------------- */

    if (
      target.closest(
        "#startShopping"
      )
    ) {

      closeCartDrawer();

      return;

    }


    /* -------------------------
       FAVORITE
    ------------------------- */

    const favorite =
      target.closest(
        "[data-favorite]"
      );

    if (favorite) {

      favorite.classList.toggle(
        "liked"
      );

      const icon =
        favorite.querySelector(
          "i"
        );

      if (
        favorite.classList.contains(
          "liked"
        )
      ) {

        icon?.classList.remove(
          "fa-regular"
        );

        icon?.classList.add(
          "fa-solid"
        );

        showToast(
          "Added to favorites ❤️"
        );

      } else {

        icon?.classList.remove(
          "fa-solid"
        );

        icon?.classList.add(
          "fa-regular"
        );

        showToast(
          "Removed from favorites"
        );

      }

      return;

    }

  },
  true
);


/* =========================================================
   26. CART OVERLAY
========================================================= */

cartOverlay?.addEventListener(
  "click",
  closeCartDrawer
);


/* =========================================================
   27. SEARCH INPUTS
========================================================= */

const restaurantSearch =
  $("#restaurantSearch");

restaurantSearch?.addEventListener(
  "input",
  function () {

    searchProducts(
      this.value
    );

  }
);


const heroSearch =
  $("#heroSearch");


const heroSearchBtn =
  $("#heroSearchBtn");


heroSearchBtn?.addEventListener(
  "click",
  function () {

    searchProducts(
      heroSearch?.value
    );


    $(".restaurants-section")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }
);


/* =========================================================
   28. CUISINE FILTER
========================================================= */

$$(".cuisine")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        function () {

          $$(".cuisine")
            .forEach(
              item =>
                item.classList.remove(
                  "active"
                )
            );


          this.classList.add(
            "active"
          );


          const category =
            this.dataset.category;


          if (
            !category ||
            category === "All"
          ) {

            renderProducts(
              PRODUCTS
            );

          } else {

            renderProducts(
              PRODUCTS.filter(
                product =>
                  product.category
                    .toLowerCase() ===
                  category
                    .toLowerCase()
              )
            );

          }

        }
      );

    }
  );


/* =========================================================
   29. CLOSE BUTTONS
========================================================= */

$("#continueShopping")
  ?.addEventListener(
    "click",
    function () {

      successOverlay?.classList.remove(
        "show"
      );

    }
  );


$("#trackOrder")
  ?.addEventListener(
    "click",
    function () {

      successOverlay?.classList.remove(
        "show"
      );

      showToast(
        "Live order tracking coming next 🚴"
      );

    }
  );


/* =========================================================
   30. KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key ===
      "Escape"
    ) {

      closeCartDrawer();

      closeCheckout();

      successOverlay?.classList.remove(
        "show"
      );

    }

  }
);


/* =========================================================
   31. INITIALIZE
========================================================= */

loadCart();

loadRewards();

window.rewardsState =
  rewardsState;

renderProducts(
  PRODUCTS
);

renderCart();

updateRewardsUI();

console.log(
  "✅ TastyLoop Core READY"
);