// signup.js

function mockPost(url, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: async () => ({ id: 12345, status: "created" })
      });
    }, 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  if (!form) {
    console.error("[app] #signupForm not found");
    return;
  }

  // Get the submit button from the form
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) {
    console.error("[app] submit button not found");
  }

  const toastEl = document.getElementById("successToast");
  const toast = (window.bootstrap && toastEl) ? new bootstrap.Toast(toastEl) : null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    // Button feedback
    const original = submitBtn ? submitBtn.innerHTML : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Submitting...
      `;
    }

    try {
      const res = await mockPost("/api/signup", payload);
      if (!res.ok) throw new Error("mock error");
      await res.json();

      if (toast) toast.show();
      form.reset();
      form.classList.remove("was-validated");

      const target = "./dashboard.html";
      setTimeout(() => {
        window.location.replace(target);
      }, toast ? 700 : 0);
    } catch (err) {
      console.error("[app] submit error:", err);
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;
      }
    }
  });
});
