document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username") || "Jone";

  // Only set text if the element exists
  const navbarUsernameEl  = document.getElementById("navbarUsername");
  const dropdownUsernameEl = document.getElementById("dropdownUsername");
  const pageUsernameEl     = document.getElementById("pageUsername");

  if (navbarUsernameEl)  navbarUsernameEl.textContent  = username;
  if (dropdownUsernameEl) dropdownUsernameEl.textContent = username;
  if (pageUsernameEl)     pageUsernameEl.textContent     = username;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();             // just in case
      localStorage.removeItem("username");
      window.location.href = "./signup.html"; // adjust path if needed
    });
  } else {
    console.warn("#logoutBtn not found");
  }
});
