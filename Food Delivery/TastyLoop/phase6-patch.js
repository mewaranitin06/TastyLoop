/* =========================================================
   TASTYLOOP — FINAL PHASE 6
   PROFILE + ORDERS + ADDRESSES
   PAYMENTS + REWARDS + CLAIM
========================================================= */

(function () {
  "use strict";

  console.log(
    "🔥 TastyLoop Phase 6 loading..."
  );


  /* =======================================================
     DATA
  ======================================================= */

  const orders = [

    {
      id: "TL48291",
      name: "Chicken Biryani",
      restaurant: "Biryani Blues",
      date: "Today · 7:42 PM",
      price: 299,
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=300&q=80"
    },

    {
      id: "TL48172",
      name: "Farmhouse Pizza",
      restaurant: "Domino's Pizza",
      date: "Yesterday · 8:15 PM",
      price: 399,
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=300&q=80"
    },

    {
      id: "TL47983",
      name: "Classic Cheese Burger",
      restaurant: "McDonald's",
      date: "06 Sep · 2:10 PM",
      price: 249,
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80"
    },

    {
      id: "TL47811",
      name: "Truffle Mushroom Pasta",
      restaurant: "Urban Kitchen",
      date: "04 Sep · 9:04 PM",
      price: 329,
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=300&q=80"
    },

    {
      id: "TL47620",
      name: "Peri Peri Burger",
      restaurant: "Burger House",
      date: "01 Sep · 6:30 PM",
      price: 279,
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
    }

  ];


  let addresses = [

    {
      label: "Home",
      address: "Ahmedabad, Gujarat",
      icon: "fa-house",
      active: true
    },

    {
      label: "Work",
      address: "Prahlad Nagar, Ahmedabad",
      icon: "fa-briefcase",
      active: false
    },

    {
      label: "Parents",
      address: "Satellite, Ahmedabad",
      icon: "fa-heart",
      active: false
    }

  ];


  let payments = [

    {
      label: "Google Pay",
      detail: "UPI · alex@okaxis",
      icon: "fa-mobile-screen-button",
      active: true
    },

    {
      label: "Visa ending 4821",
      detail: "Credit card · Expires 08/29",
      icon: "fa-credit-card",
      active: false
    },

    {
      label: "TastyWallet",
      detail: "Balance · ₹840",
      icon: "fa-wallet",
      active: false
    }

  ];


  /* =======================================================
     HELPERS
  ======================================================= */

  function $(selector) {
    return document.querySelector(
      selector
    );
  }


  function $$(selector) {
    return Array.from(
      document.querySelectorAll(
        selector
      )
    );
  }


  function toast(message) {

    if (
      typeof window.showToast ===
      "function"
    ) {

      window.showToast(
        message
      );

      return;
    }


    const element =
      $("#toast");

    const text =
      $("#toastText");


    if (!element) {
      return;
    }


    if (text) {

      text.textContent =
        message;
    }


    element.classList.add(
      "show"
    );


    clearTimeout(
      window.__phase6Toast
    );


    window.__phase6Toast =
      setTimeout(
        function () {

          element.classList.remove(
            "show"
          );

        },
        2400
      );
  }


  /* =======================================================
     REWARD STATE
  ======================================================= */

  function loadRewards() {

    let state = null;


    try {

      const saved =
        localStorage.getItem(
          "tastyloop_rewards_state"
        );


      if (saved) {

        state =
          JSON.parse(
            saved
          );
        }
    } catch (error) {

      console.warn(
        "Reward state load failed",
        error
      );
    }


    if (
      !state ||
      typeof state !==
        "object"
    ) {

      state = {

        coins: 1280,

        streak: 7,

        xp: 1740

      };
    }


    window.rewardsState = {

      coins:
        Number(state.coins) ||
        1280,

      streak:
        Number(state.streak) ||
        7,

      xp:
        Number(state.xp) ||
        1740

    };
  }


  function saveRewards() {

    try {

      localStorage.setItem(
        "tastyloop_rewards_state",
        JSON.stringify(
          window.rewardsState
        )
      );

    } catch (error) {

      console.warn(
        "Reward state save failed",
        error
      );
    }
  }


  /* =======================================================
     PROFILE
  ======================================================= */

  function getProfileOverlay() {

    return $(
      "#profileOverlay"
    );
  }


  function openProfile() {

    const overlay =
      getProfileOverlay();


    if (!overlay) {

      toast(
        "Profile panel not found"
      );

      return;
    }


    overlay.classList.add(
      "show"
    );


    overlay.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "profile-open"
    );


    renderProfile();
  }


  function closeProfile() {

    const overlay =
      getProfileOverlay();


    if (!overlay) {
      return;
    }


    overlay.classList.remove(
      "show"
    );


    overlay.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "profile-open"
    );
  }


  /* =======================================================
     RECENT ORDERS
  ======================================================= */

  function renderRecentOrders() {

    const box =
      $("#recentOrderList");


    if (!box) {
      return;
    }


    box.innerHTML =
      orders
        .slice(0, 4)
        .map(
          function (order) {

            return `

              <div
                class="recent-order-item"
              >

                <img
                  src="${order.image}"
                  alt="${order.name}"
                >

                <div
                  class="recent-order-copy"
                >

                  <strong>
                    ${order.name}
                  </strong>

                  <span>
                    ${order.restaurant}
                    · ₹${order.price}
                  </span>

                </div>


                <button
                  type="button"
                  class="reorder-mini"
                  data-phase6-reorder="${order.id}"
                >

                  <i
                    class="fa-solid fa-rotate-right"
                  ></i>

                </button>

              </div>

            `;

          }
        )
        .join("");
  }


  /* =======================================================
     ORDER HISTORY
  ======================================================= */

  function renderOrderHistory() {

    const box =
      $("#orderHistoryList");


    if (!box) {
      return;
    }


    box.innerHTML =
      orders
        .map(
          function (order) {

            return `

              <div
                class="history-item"
              >

                <img
                  src="${order.image}"
                  alt="${order.name}"
                >


                <div>

                  <strong>
                    ${order.name}
                  </strong>

                  <span
                    class="history-meta"
                  >
                    ${order.restaurant}
                    ·
                    ${order.date}

                    <br>

                    ${order.id}
                  </span>

                </div>


                <div
                  class="history-price"
                >

                  <strong>
                    ₹${order.price}
                  </strong>

                  <span>
                    <i
                      class="fa-solid fa-circle-check"
                    ></i>
                    ${order.status}
                  </span>

                </div>


                <button
                  type="button"
                  class="reorder-btn"
                  data-history-reorder="${order.id}"
                >
                  Reorder
                </button>

              </div>

            `;

          }
        )
        .join("");
  }


  /* =======================================================
     REORDER
  ======================================================= */

  function reorder(order) {

    if (
      typeof window.addToCart !==
      "function"
    ) {

      console.error(
        "❌ addToCart() missing"
      );

      toast(
        "Cart system is not ready"
      );

      return;
    }


    const result =
      window.addToCart(
        order.name,
        Number(order.price),
        order.image
      );


    if (result === false) {
      return;
    }


    closeProfile();


    toast(
      order.name +
      " added to cart 🛒"
    );
  }


  /* =======================================================
     ADDRESSES
  ======================================================= */

  function renderAddresses() {

    const box =
      $("#addressList");


    if (!box) {
      return;
    }


    box.innerHTML =
      addresses
        .map(
          function (
            address,
            index
          ) {

            return `

              <div
                class="saved-address ${
                  address.active
                    ? "active"
                    : ""
                }"
              >

                <i
                  class="fa-solid ${address.icon}"
                ></i>


                <div
                  class="saved-address-copy"
                >

                  <strong>
                    ${address.label}
                  </strong>

                  <span>
                    ${address.address}
                  </span>

                </div>


                ${
                  address.active
                    ? `

                      <span
                        class="default-tag"
                      >
                        DEFAULT
                      </span>

                    `
                    : `

                      <button
                        type="button"
                        class="reorder-mini"
                        data-address-index="${index}"
                      >

                        <i
                          class="fa-solid fa-check"
                        ></i>

                      </button>

                    `
                }

              </div>

            `;

          }
        )
        .join("");
  }


  function setDefaultAddress(
    index
  ) {

    if (
      !addresses[index]
    ) {
      return;
    }


    addresses.forEach(
      function (item) {

        item.active =
          false;

      }
    );


    addresses[index].active =
      true;


    renderAddresses();


    toast(
      "Default address updated 📍"
    );
  }


  /* =======================================================
     PAYMENTS
  ======================================================= */

  function renderPayments() {

    const box =
      $("#paymentMethodList");


    if (!box) {
      return;
    }


    box.innerHTML =
      payments
        .map(
          function (
            payment,
            index
          ) {

            return `

              <div
                class="saved-payment ${
                  payment.active
                    ? "active"
                    : ""
                }"
              >

                <i
                  class="fa-solid ${payment.icon}"
                ></i>


                <div
                  class="saved-payment-copy"
                >

                  <strong>
                    ${payment.label}
                  </strong>

                  <span>
                    ${payment.detail}
                  </span>

                </div>


                ${
                  payment.active
                    ? `

                      <span
                        class="default-tag"
                      >
                        DEFAULT
                      </span>

                    `
                    : `

                      <button
                        type="button"
                        class="reorder-mini"
                        data-payment-index="${index}"
                      >

                        <i
                          class="fa-solid fa-check"
                        ></i>

                      </button>

                    `
                }

              </div>

            `;

          }
        )
        .join("");
  }


  function setDefaultPayment(
    index
  ) {

    if (
      !payments[index]
    ) {
      return;
    }


    payments.forEach(
      function (item) {

        item.active =
          false;

      }
    );


    payments[index].active =
      true;


    renderPayments();


    toast(
      "Default payment updated 💳"
    );
  }


  /* =======================================================
     REWARDS
  ======================================================= */

  function renderRewards() {

    if (
      !window.rewardsState
    ) {

      loadRewards();
    }


    const coins =
      Number(
        window.rewardsState.coins
      ) || 1280;


    const streak =
      Number(
        window.rewardsState.streak
      ) || 7;


    const xp =
      Number(
        window.rewardsState.xp
      ) || 1740;


    const values = {

      profileOrdersCount:
        orders.length + 7,

      profileSavedCount:
        8,

      profileCoinsCount:
        coins.toLocaleString(
          "en-IN"
        ),

      profileQuickCoins:
        coins.toLocaleString(
          "en-IN"
        ),

      profileRewardsCoins:
        coins.toLocaleString(
          "en-IN"
        ),

      profileRewardStreak:
        streak,

      profileRewardXP:
        xp.toLocaleString(
          "en-IN"
        ),

      profileRewardLevel:
        "Pro Foodie",

      profileModalLevel:
        "Pro Foodie"

    };


    Object.keys(
      values
    ).forEach(
      function (id) {

        const element =
          document.getElementById(
            id
          );


        if (element) {

          element.textContent =
            values[id];
        }

      }
    );


    $$(
      "[data-reward-coins]"
    ).forEach(
      function (element) {

        element.textContent =
          coins.toLocaleString(
            "en-IN"
          );

      }
    );
  }


  /* =======================================================
     CLAIM +75 COINS
     
     THIS FIX TARGETS:
     #claimDailyReward
     #claimReward
     .claim-btn
     .reward-claim
     [data-claim-reward]
  ======================================================= */

  function claimDailyReward(
    button
  ) {

    if (!button) {
      return;
    }


    if (
      button.dataset.claimed ===
      "true"
    ) {

      return;
    }


    if (
      !window.rewardsState
    ) {

      loadRewards();
    }


    const today =
      new Date()
        .toDateString();


    let claimedToday =
      null;


    try {

      claimedToday =
        localStorage.getItem(
          "tastyloop_daily_reward_claimed"
        );

    } catch (error) {}


    if (
      claimedToday ===
      today
    ) {

      setClaimedButton(
        button
      );

      toast(
        "Today's reward is already claimed"
      );

      return;
    }


    /* ADD 75 COINS */

    window.rewardsState.coins =
      Number(
        window.rewardsState.coins
      ) +
      75;


    saveRewards();


    try {

      localStorage.setItem(
        "tastyloop_daily_reward_claimed",
        today
      );

    } catch (error) {}


    /* UPDATE BUTTON */

    setClaimedButton(
      button
    );


    /* UPDATE ALL COINS */

    renderRewards();


    toast(
      "+75 TastyCoins added 🪙"
    );


    console.log(
      "✅ Reward claimed. Coins:",
      window.rewardsState.coins
    );
  }


  function setClaimedButton(
    button
  ) {

    button.dataset.claimed =
      "true";


    button.classList.add(
      "reward-claimed"
    );


    button.disabled =
      true;


    button.innerHTML =
      `
        <i
          class="fa-solid fa-check"
        ></i>
        Claimed
      `;
  }


  function restoreClaimState() {

    let claimedDate =
      null;


    try {

      claimedDate =
        localStorage.getItem(
          "tastyloop_daily_reward_claimed"
        );

    } catch (error) {}


    const today =
      new Date()
        .toDateString();


    if (
      claimedDate !==
      today
    ) {

      return;
    }


    $$(
      [
        "#claimDailyReward",
        "#claimReward",
        ".claim-btn",
        ".reward-claim",
        "[data-claim-reward]"
      ].join(",")
    ).forEach(
      function (button) {

        setClaimedButton(
          button
        );

      }
    );
  }


  /* =======================================================
     PROFILE RENDER
  ======================================================= */

  function renderProfile() {

    renderRecentOrders();

    renderOrderHistory();

    renderAddresses();

    renderPayments();

    renderRewards();
  }


  /* =======================================================
     PROFILE TABS
  ======================================================= */

  function switchTab(
    tabName
  ) {

    $$(".profile-tab")
      .forEach(
        function (button) {

          button.classList.toggle(
            "active",
            button.dataset.tab ===
              tabName
          );

        }
      );


    $$(".profile-panel")
      .forEach(
        function (panel) {

          panel.classList.toggle(
            "active",
            panel.dataset.panel ===
              tabName
          );

        }
      );
  }


  /* =======================================================
     RESTORE PROFILE NAME
  ======================================================= */

  function restoreProfileName() {

    let name =
      null;


    try {

      name =
        localStorage.getItem(
          "tastyloop_profile_name"
        );

    } catch (error) {}


    if (
      !name ||
      !name.trim()
    ) {

      return;
    }


    $(
      ".profile-identity-card h2"
    );


    $$(
      ".profile-identity-card h2, .profile-name"
    ).forEach(
      function (element) {

        element.textContent =
          name;

      }
    );
  }


  /* =======================================================
     EVENT DELEGATION
  ======================================================= */

  document.addEventListener(
    "click",
    function (event) {

      const target =
        event.target;


      /* -----------------------------------------------
         PROFILE OPEN
      ----------------------------------------------- */

      const profileButton =
        target.closest(
          [
            "#openProfileHub",
            "#profileMenuBtn",
            "#topProfileAvatar",
            "[data-open-profile]",
            "[data-profile-open]"
          ].join(",")
        );


      if (profileButton) {

        event.preventDefault();

        openProfile();

        return;
      }


      /* -----------------------------------------------
         PROFILE CLOSE
      ----------------------------------------------- */

      const closeButton =
        target.closest(
          [
            "#closeProfileHub",
            "[data-close-profile]"
          ].join(",")
        );


      if (closeButton) {

        event.preventDefault();

        closeProfile();

        return;
      }


      /* -----------------------------------------------
         PROFILE BACKDROP
      ----------------------------------------------- */

      const profileOverlay =
        getProfileOverlay();


      if (
        profileOverlay &&
        target ===
          profileOverlay
      ) {

        closeProfile();

        return;
      }


      /* -----------------------------------------------
         PROFILE TABS
      ----------------------------------------------- */

      const tab =
        target.closest(
          ".profile-tab"
        );


      if (tab) {

        event.preventDefault();

        switchTab(
          tab.dataset.tab
        );

        return;
      }


      /* -----------------------------------------------
         CUSTOM PROFILE TAB
      ----------------------------------------------- */

      const customTab =
        target.closest(
          "[data-profile-tab]"
        );


      if (customTab) {

        event.preventDefault();

        openProfile();


        switchTab(
          customTab.dataset.profileTab
        );

        return;
      }


      /* -----------------------------------------------
         RECENT REORDER
      ----------------------------------------------- */

      const recent =
        target.closest(
          "[data-phase6-reorder]"
        );


      if (recent) {

        const order =
          orders.find(
            function (item) {

              return (
                item.id ===
                recent.dataset.phase6Reorder
              );

            }
          );


        if (order) {

          reorder(order);
        }


        return;
      }


      /* -----------------------------------------------
         HISTORY REORDER
      ----------------------------------------------- */

      const history =
        target.closest(
          "[data-history-reorder]"
        );


      if (history) {

        const order =
          orders.find(
            function (item) {

              return (
                item.id ===
                recentOrHistoryId(
                  history
                )
              );

            }
          );


        if (order) {

          reorder(order);
        }


        return;
      }


      /* -----------------------------------------------
         ADDRESS
      ----------------------------------------------- */

      const address =
        target.closest(
          "[data-address-index]"
        );


      if (address) {

        event.preventDefault();

        setDefaultAddress(
          Number(
            address.dataset.addressIndex
          )
        );

        return;
      }


      /* -----------------------------------------------
         PAYMENT
      ----------------------------------------------- */

      const payment =
        target.closest(
          "[data-payment-index]"
        );


      if (payment) {

        event.preventDefault();

        setDefaultPayment(
          Number(
            payment.dataset.paymentIndex
          )
        );

        return;
      }


      /* -----------------------------------------------
         VIEW ALL ORDERS
      ----------------------------------------------- */

      const viewOrders =
        target.closest(
          "#viewAllOrders"
        );


      if (viewOrders) {

        event.preventDefault();

        openProfile();

        switchTab(
          "orders"
        );

        return;
      }


      /* -----------------------------------------------
         EDIT PROFILE
      ----------------------------------------------- */

      const editProfile =
        target.closest(
          "#editProfileBtn"
        );


      if (editProfile) {

        event.preventDefault();


        const current =
          $(
            ".profile-identity-card h2"
          );


        const currentName =
          current
            ? current.textContent.trim()
            : "TastyLoop User";


        const newName =
          window.prompt(
            "Enter your name",
            currentName
          );


        if (
          newName &&
          newName.trim()
        ) {

          const clean =
            newName.trim();


          $$(
            ".profile-identity-card h2, .profile-name"
          ).forEach(
            function (element) {

              element.textContent =
                clean;

            }
          );


          try {

            localStorage.setItem(
              "tastyloop_profile_name",
              clean
            );

          } catch (error) {}


          toast(
            "Profile updated ✨"
          );
        }


        return;
      }


      /* -----------------------------------------------
         ADD ADDRESS
      ----------------------------------------------- */

      const addAddress =
        target.closest(
          "#addAddressBtn"
        );


      if (addAddress) {

        event.preventDefault();


        const value =
          window.prompt(
            "Enter new address"
          );


        if (
          value &&
          value.trim()
        ) {

          addresses.push({

            label:
              "New address",

            address:
              value.trim(),

            icon:
              "fa-location-dot",

            active:
              false

          });


          renderAddresses();


          toast(
            "New address saved 📍"
          );
        }


        return;
      }


      /* -----------------------------------------------
         ADD PAYMENT
      ----------------------------------------------- */

      const addPayment =
        target.closest(
          "#addPaymentBtn"
        );


      if (addPayment) {

        event.preventDefault();


        toast(
          "Secure payment setup opened 💳"
        );


        return;
      }


      /* -----------------------------------------------
         GO TO REWARDS
      ----------------------------------------------- */

      const rewardsButton =
        target.closest(
          "#goToRewards"
        );


      if (rewardsButton) {

        event.preventDefault();

        closeProfile();


        const rewards =
          $("#rewards");


        if (rewards) {

          rewards.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }


        return;
      }


      /* -----------------------------------------------
         CLAIM DAILY REWARD
      ----------------------------------------------- */

      const claimButton =
        target.closest(
          [
            "#claimDailyReward",
            "#claimReward",
            ".claim-btn",
            ".reward-claim",
            "[data-claim-reward]"
          ].join(",")
        );


      if (claimButton) {

        event.preventDefault();

        event.stopPropagation();


        claimDailyReward(
          claimButton
        );


        return;
      }

    },
    true
  );


  /* =======================================================
     FIX HISTORY ID
  ======================================================= */

  function recentOrHistoryId(
    element
  ) {

    return (
      element.dataset.historyReorder ||
      element.dataset.phase6Reorder ||
      ""
    );
  }


  /* =======================================================
     ESC
  ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key ===
        "Escape"
      ) {

        closeProfile();

      }

    }
  );


  /* =======================================================
     INIT
  ======================================================= */

  function initPhase6() {

    console.log(
      "⚙️ TastyLoop Phase 6 initializing..."
    );


    loadRewards();

    renderProfile();

    restoreProfileName();

    restoreClaimState();


    console.log(
      "✅ TastyLoop Phase 6 READY"
    );


    console.log(
      "🛒 Core addToCart:",
      typeof window.addToCart
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initPhase6,
      {
        once: true
      }
    );

  } else {

    initPhase6();

  }

})();