// =====================
// DOM Ready
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Auth check
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "auth.html";
    return;
  }


  // Display username
  const userNameEl = document.getElementById("userName");
  if (userNameEl) userNameEl.textContent = loggedInUser;

  // Initialize TradingView charts
  const tokens = [
    { symbol: "BINANCE:BTCUSDT", id: "btc" },
    { symbol: "BINANCE:ETHUSDT", id: "eth" },
    { symbol: "BINANCE:SOLUSDT", id: "sol" },
    { symbol: "BINANCE:BNBUSDT", id: "bnb" },
    { symbol: "BINANCE:ADAUSDT", id: "ada" },
    { symbol: "BINANCE:XRPUSDT", id: "xrp" }
  ];

  tokens.forEach(t => createChart(t.symbol, t.id));
});
function goHome() {
  window.location.href = "index.html"; // replace with your homepage URL
}


// =====================
// Logout
// =====================
function logout() {
  localStorage.removeItem("loggedInUser"); // remove user from storage
  window.location.href = "auth.html";       // redirect to login
}

// =====================
// TradingView Charts
// =====================
function createChart(symbol, containerId) {
  // Ensure container exists
  if (!document.getElementById(containerId)) return;

  new TradingView.widget({
    autosize: true,
    symbol: symbol,
    interval: "5",            // 5-min candlesticks
    timezone: "Etc/UTC",
    theme: "dark",
    style: "1",               // candlestick style
    locale: "en",
    enable_publishing: false,
    hide_top_toolbar: true,
    hide_legend: true,
    container_id: containerId
  });
}

let botFunded = false; // tracks if the selected bot has been funded

// Bot definitions
const bots = {
  scalper: { level: "Beginner", risk: "Low" },
  swing: { level: "Intermediate", risk: "Medium" },
  arbitrage: { level: "Advanced", risk: "High" }
};

// Update bot info on selection
function updateBotDetails() {
  const botSelect = document.getElementById("botSelect");
  const bot = botSelect.value;

  const levelSpan = document.getElementById("botLevel");
  const riskSpan = document.getElementById("botRisk");
  const statusBadge = document.getElementById("botStatus");

  if (bot && bots[bot]) {
    levelSpan.textContent = bots[bot].level;
    riskSpan.textContent = bots[bot].risk;
    statusBadge.textContent = "Ready";
    statusBadge.className = "badge"; // reset any previous active class
    botFunded = false; // reset funding when bot changes
  } else {
    levelSpan.textContent = "-";
    riskSpan.textContent = "-";
    statusBadge.textContent = "Paused";
    statusBadge.className = "badge";
    botFunded = false;
  }
}

// Start bot with deposit check
function startBot() {
  const botSelect = document.getElementById("botSelect");
  const selectedBot = botSelect.value;
  const statusBadge = document.getElementById("botStatus");

  if (!selectedBot) {
    alert("Please select a bot first!");
    return;
  }

  if (!botFunded) {
    // Show deposit modal before running
    openDepositModal(selectedBot);
  } else {
    // Bot already funded, start running
    statusBadge.textContent = "Running";
    statusBadge.className = "badge active";
  }
}

// Stop bot
function stopBot() {
  const statusBadge = document.getElementById("botStatus");
  statusBadge.textContent = "Paused";
  statusBadge.className = "badge";
}

// Deposit modal logic
function openDepositModal(bot) {
  const modal = document.getElementById("depositModal"); // your modal div
  const modalTitle = document.getElementById("depositModalTitle");
  modalTitle.textContent = `Fund your ${bot} Bot`;

  // Show modal
  modal.style.display = "block";
}

// Call this function when deposit is confirmed
function confirmDeposit() {
  botFunded = true;
  const statusBadge = document.getElementById("botStatus");
  statusBadge.textContent = "Running";
  statusBadge.className = "badge active";

  // Close modal
  const modal = document.getElementById("depositModal");
  modal.style.display = "none";
}


// Default selected crypto
let selectedAsset = "BTC";

function openDepositModal() {
  document.getElementById("depositModal").style.display = "block";
  selectCrypto(document.querySelector(`.crypto-btn[data-asset="${selectedAsset}"]`));
}

function closeDepositModal() {
  document.getElementById("depositModal").style.display = "none";
}

function selectCrypto(btn) {
  if (!btn) return;
  
  // Remove active class from all buttons
  document.querySelectorAll(".crypto-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  
  // Update deposit info
  selectedAsset = btn.dataset.asset;
  const networkText = document.getElementById("depositNetwork");
  const addressText = document.getElementById("depositAddress");

  switch(selectedAsset){
    case "BTC":
      networkText.textContent = "Network: BTC";
      addressText.textContent = "Wallet Address: bc1q-demo-btc-address";
      break;
    case "ETH":
      networkText.textContent = "Network: ETH";
      addressText.textContent = "Wallet Address: 0xDemoEthereumAddress";
      break;
    case "TRON":
      networkText.textContent = "Network: TRX";
      addressText.textContent = "Wallet Address: 0xDemoUSDC_ERC20";
      break;
  }
}

function copyDeposit() {
  let address = "";
  switch(selectedAsset){
    case "BTC": address = "bc1q-demo-btc-address"; break;
    case "ETH": address = "0xDemoEthereumAddress"; break;
    case "USDC": address = "0xDemoUSDC_ERC20"; break;
  }
  navigator.clipboard.writeText(address);
  showNotification("Deposit address copied!");
}

// Close modal if clicked outside
window.onclick = function(event) {
  const modal = document.getElementById("depositModal");
  if (event.target === modal) modal.style.display = "none";
};


// =====================
// Notification Helper
// =====================
function showNotification(message) {
  let notif = document.createElement("div");
  notif.textContent = message;
  notif.className = "notification";
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = "0";
    setTimeout(() => notif.remove(), 500);
  }, 2000);
}
