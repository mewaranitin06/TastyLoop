/* =========================================================
   TASTYLOOP ADMIN — COMMON HEADER + SIDEBAR
========================================================= */


/* =========================================================
   COMMON HEADER DROPDOWNS
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const notificationBtn =
      document.getElementById(
        "notificationBtn"
      );

    const profileBtn =
      document.getElementById(
        "headerProfileBtn"
      );


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    if (notificationBtn) {

      const wrap =
        document.createElement("div");

      wrap.className =
        "admin-notification-wrap";


      notificationBtn.parentNode.insertBefore(
        wrap,
        notificationBtn
      );

      wrap.appendChild(
        notificationBtn
      );


      const dropdown =
        document.createElement("div");

      dropdown.className =
        "admin-notification-dropdown";

      dropdown.id =
        "adminNotificationDropdown";


      dropdown.innerHTML = `

        <div class="admin-notification-head">

          <strong>
            Notifications
          </strong>

          <span id="markNotificationsRead">
            Mark all read
          </span>

        </div>


        <div class="admin-notification-item unread">

          <div class="admin-notification-item-icon">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>

          <div class="admin-notification-item-content">

            <strong>
              New order received
            </strong>

            <span>
              A new customer order has been placed.
            </span>

          </div>

        </div>


        <div class="admin-notification-item unread">

          <div class="admin-notification-item-icon">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>

          <div class="admin-notification-item-content">

            <strong>
              Low stock alert
            </strong>

            <span>
              Some products need your attention.
            </span>

          </div>

        </div>


        <div class="admin-notification-item">

          <div class="admin-notification-item-icon">
            <i class="fa-solid fa-circle-check"></i>
          </div>

          <div class="admin-notification-item-content">

            <strong>
              Delivery completed
            </strong>

            <span>
              Today's delivery was completed successfully.
            </span>

          </div>

        </div>

      `;


      wrap.appendChild(
        dropdown
      );


      /* Mark all read */

      const markRead =
        dropdown.querySelector(
          "#markNotificationsRead"
        );

      if (markRead) {

        markRead.addEventListener(
          "click",
          function (event) {

            event.stopPropagation();

            dropdown
              .querySelectorAll(
                ".admin-notification-item.unread"
              )
              .forEach(
                function (item) {

                  item.classList.remove(
                    "unread"
                  );

                }
              );

          }
        );

      }


      /* Notification click */

      notificationBtn.addEventListener(
        "click",
        function (event) {

          event.stopPropagation();


          const profileDropdown =
            document.getElementById(
              "adminProfileDropdown"
            );

          if (profileDropdown) {

            profileDropdown.classList.remove(
              "show"
            );

          }


          dropdown.classList.toggle(
            "show"
          );

        }
      );

    }


    /* =====================================================
       PROFILE
    ===================================================== */

    if (profileBtn) {

      const wrap =
        document.createElement("div");

      wrap.className =
        "admin-profile-wrap";


      profileBtn.parentNode.insertBefore(
        wrap,
        profileBtn
      );

      wrap.appendChild(
        profileBtn
      );


      const dropdown =
        document.createElement("div");

      dropdown.className =
        "admin-profile-dropdown";

      dropdown.id =
        "adminProfileDropdown";


      dropdown.innerHTML = `

        <div class="admin-profile-dropdown-head">

          <div class="admin-profile-dropdown-avatar">

            <i class="fa-solid fa-user"></i>

          </div>


          <div class="admin-profile-dropdown-user">

            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>

        </div>


        <button
          type="button"
          class="admin-profile-menu-item"
        >

          <i class="fa-regular fa-user"></i>

          Profile

        </button>


        <button
          type="button"
          class="admin-profile-menu-item"
        >

          <i class="fa-solid fa-gear"></i>

          Settings

        </button>


        <button
          type="button"
          class="admin-profile-menu-item"
        >

          <i class="fa-solid fa-shield-halved"></i>

          Security

        </button>


        <button
          type="button"
          class="admin-profile-menu-item logout"
          id="adminLogoutBtn"
        >

          <i class="fa-solid fa-right-from-bracket"></i>

          Logout

        </button>

      `;


      wrap.appendChild(
        dropdown
      );


      /* Profile click */

      profileBtn.addEventListener(
        "click",
        function (event) {

          event.stopPropagation();


          const notificationDropdown =
            document.getElementById(
              "adminNotificationDropdown"
            );

          if (notificationDropdown) {

            notificationDropdown.classList.remove(
              "show"
            );

          }


          dropdown.classList.toggle(
            "show"
          );

        }
      );


      /* Logout */

      const logoutBtn =
        dropdown.querySelector(
          "#adminLogoutBtn"
        );

      if (logoutBtn) {

        logoutBtn.addEventListener(
          "click",
          function () {

            dropdown.classList.remove(
              "show"
            );

          }
        );

      }

    }


    /* =====================================================
       CLICK OUTSIDE
    ===================================================== */

    document.addEventListener(
      "click",
      function () {

        const notificationDropdown =
          document.getElementById(
            "adminNotificationDropdown"
          );

        const profileDropdown =
          document.getElementById(
            "adminProfileDropdown"
          );


        if (notificationDropdown) {

          notificationDropdown.classList.remove(
            "show"
          );

        }


        if (profileDropdown) {

          profileDropdown.classList.remove(
            "show"
          );

        }

      }
    );

  }
);


/* =========================================================
   COMMON SIDEBAR TOGGLE
========================================================= */

function toggleSimpleSidebar() {

  const sidebar =
    document.getElementById(
      "adminSidebar"
    );

  const main =
    document.querySelector(
      ".admin-main"
    );

  const button =
    document.getElementById(
      "sidebarToggleSimple"
    );


  if (
    !sidebar ||
    !main ||
    !button
  ) {

    return;

  }


  const icon =
    button.querySelector("i");


  const hidden =
    sidebar.classList.toggle(
      "sidebar-hidden"
    );


  main.classList.toggle(
    "sidebar-hidden",
    hidden
  );


  button.classList.toggle(
    "sidebar-hidden",
    hidden
  );


  if (icon) {

    icon.className =
      hidden
        ? "fa-solid fa-chevron-right"
        : "fa-solid fa-chevron-left";

  }


  button.setAttribute(
    "aria-label",
    hidden
      ? "Show sidebar"
      : "Hide sidebar"
  );

}


/* =========================================================
   SIDEBAR INITIAL STATE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const sidebar =
      document.getElementById(
        "adminSidebar"
      );

    const main =
      document.querySelector(
        ".admin-main"
      );

    const button =
      document.getElementById(
        "sidebarToggleSimple"
      );


    if (
      !sidebar ||
      !main ||
      !button
    ) {

      return;

    }


    if (
      window.innerWidth > 900
    ) {

      sidebar.classList.remove(
        "sidebar-hidden"
      );

      main.classList.remove(
        "sidebar-hidden"
      );

      button.classList.remove(
        "sidebar-hidden"
      );


      const icon =
        button.querySelector("i");


      if (icon) {

        icon.className =
          "fa-solid fa-chevron-left";

      }

    }

  }
);


/* =========================================================
   SIDEBAR RESIZE
========================================================= */

window.addEventListener(
  "resize",
  function () {

    const sidebar =
      document.getElementById(
        "adminSidebar"
      );

    const main =
      document.querySelector(
        ".admin-main"
      );

    const button =
      document.getElementById(
        "sidebarToggleSimple"
      );


    if (
      !sidebar ||
      !main ||
      !button
    ) {

      return;

    }


    if (
      window.innerWidth > 900
    ) {

      if (
        !sidebar.classList.contains(
          "sidebar-hidden"
        )
      ) {

        main.classList.remove(
          "sidebar-hidden"
        );

        button.classList.remove(
          "sidebar-hidden"
        );

      }

    }

  }
);

/* =========================================================
   TASTYLOOP ADMIN — SIDEBAR STATE + NAVIGATION
========================================================= */


/* =========================================================
   SAVE SIDEBAR STATE
========================================================= */

function saveSidebarState(hidden) {

  localStorage.setItem(
    "tastyloop_admin_sidebar",
    hidden ? "hidden" : "visible"
  );

}


/* =========================================================
   LOAD SIDEBAR STATE
========================================================= */

function loadSidebarState() {

  const sidebar =
    document.getElementById("adminSidebar");

  const main =
    document.querySelector(".admin-main");

  const button =
    document.getElementById("sidebarToggleSimple");

  if (!sidebar || !main || !button) {
    return;
  }


  const savedState =
    localStorage.getItem(
      "tastyloop_admin_sidebar"
    );


  /* Default = visible */

  const hidden =
    savedState === "hidden";


  sidebar.classList.toggle(
    "sidebar-hidden",
    hidden
  );

  main.classList.toggle(
    "sidebar-hidden",
    hidden
  );

  button.classList.toggle(
    "sidebar-hidden",
    hidden
  );


  const icon =
    button.querySelector("i");

  if (icon) {

    icon.className =
      hidden
        ? "fa-solid fa-chevron-right"
        : "fa-solid fa-chevron-left";

  }


  button.setAttribute(
    "aria-label",
    hidden
      ? "Show sidebar"
      : "Hide sidebar"
  );

}


/* =========================================================
   OVERRIDE SIDEBAR TOGGLE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const button =
      document.getElementById(
        "sidebarToggleSimple"
      );

    if (!button) {
      return;
    }


    button.addEventListener(
      "click",
      function () {

        const sidebar =
          document.getElementById(
            "adminSidebar"
          );

        const main =
          document.querySelector(
            ".admin-main"
          );


        if (!sidebar || !main) {
          return;
        }


        const hidden =
          sidebar.classList.contains(
            "sidebar-hidden"
          );


        saveSidebarState(
          !hidden
        );

      }
    );


    loadSidebarState();

  }
);


/* =========================================================
   AUTO COLLAPSE WHEN MOVING BETWEEN ADMIN PAGES
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const navLinks =
      document.querySelectorAll(
        ".admin-nav-item"
      );


    navLinks.forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            const href =
              link.getAttribute("href");


            /*
              Only real admin page links
            */

            if (
              !href ||
              href === "#" ||
              href.startsWith("http")
            ) {

              return;

            }


            /*
              Save collapsed state
              before page changes
            */

            saveSidebarState(true);

          }
        );

      }
    );

  }
);


/* =========================================================
   MARK ALL NOTIFICATIONS AS READ
========================================================= */

document.addEventListener(
  "click",
  function (event) {

    const markRead =
      event.target.closest(
        "#markNotificationsRead"
      );


    if (!markRead) {
      return;
    }


    event.preventDefault();

    event.stopPropagation();


    const dropdown =
      document.getElementById(
        "adminNotificationDropdown"
      );


    if (!dropdown) {
      return;
    }


    /*
      Remove unread state
    */

    dropdown
      .querySelectorAll(
        ".admin-notification-item.unread"
      )
      .forEach(
        function (item) {

          item.classList.remove(
            "unread"
          );

        }
      );


    /*
      Remove notification dot
    */

    document
      .querySelectorAll(
        ".notification-dot"
      )
      .forEach(
        function (dot) {

          dot.style.display =
            "none";

        }
      );


    /*
      Save read state
    */

    localStorage.setItem(
      "tastyloop_notifications_read",
      "true"
    );


  },
  true
);


/* =========================================================
   RESTORE NOTIFICATION READ STATE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const read =
      localStorage.getItem(
        "tastyloop_notifications_read"
      );


    if (read !== "true") {
      return;
    }


    document
      .querySelectorAll(
        ".notification-dot"
      )
      .forEach(
        function (dot) {

          dot.style.display =
            "none";

        }
      );


    const dropdown =
      document.getElementById(
        "adminNotificationDropdown"
      );


    if (dropdown) {

      dropdown
        .querySelectorAll(
          ".admin-notification-item.unread"
        )
        .forEach(
          function (item) {

            item.classList.remove(
              "unread"
            );

          }
        );

    }

  }
);