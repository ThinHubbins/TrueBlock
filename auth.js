// =====================
// Auth Check
// =====================
const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser && window.location.pathname !== "/auth.html") {
  window.location.href = "auth.html";
}
if (loggedInUser) {
  const userNameEl = document.getElementById("userName");
  if (userNameEl) userNameEl.textContent = loggedInUser;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "auth.html";
}

// =====================
// Registration
// =====================
function handleRegister() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const errorDiv = document.getElementById("registerError");

  if (!email || !password) {
    showMessage(errorDiv, "Please fill in all fields", "red");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    showMessage(errorDiv, "Email already registered!", "red");
    return;
  }

  users[email] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  showMessage(errorDiv, "Account created! You can login now.", "green");
}

// =====================
// Login
// =====================
function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const userName = document.getElementById("regName").value.trim();
  const errorDiv = document.getElementById("loginError");

  if (!email || !password) {
    showMessage(errorDiv, "Please fill in all fields", "red");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email] && users[email].password === password) {
    localStorage.setItem("loggedInUser", userName);
    showMessage(errorDiv, "Login successful! Redirecting...", "green");
    setTimeout(() => window.location.href = "dashboard.html", 1000);
  } else {
    showMessage(errorDiv, "Invalid email or password!", "red");
  }
}

// =====================
// Helper: Show Messages
// =====================
function showMessage(el, message, color = "white") {
  el.textContent = message;
  el.style.color = color;
  el.style.opacity = 1;
  setTimeout(() => {
    el.style.transition = "opacity 0.5s";
    el.style.opacity = 0;
  }, 3000);
}
