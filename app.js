// Auth check
const user = localStorage.getItem("username");

document.getElementById("userName").textContent = user;

function logout() {
  localStorage.clear();
  window.location.href = "auth.html";
}

// Chart creator
function createChart(symbol, container) {
  new TradingView.widget({
    autosize: true,
    symbol,
    interval: "5",
    timezone: "Etc/UTC",
    theme: "dark",
    style: "1",
    locale: "en",
    enable_publishing: false,
    hide_top_toolbar: true,
    hide_legend: true,
    container_id: container
  });
}

// Charts
createChart("BINANCE:BTCUSDT", "btc");
createChart("BINANCE:ETHUSDT", "eth");
createChart("BINANCE:SOLUSDT", "sol");
createChart("BINANCE:BNBUSDT", "bnb");
createChart("BINANCE:ADAUSDT", "ada");
createChart("BINANCE:XRPUSDT", "xrp");







/* =====================
   Bot Logic
===================== */
function startBot() {
  document.getElementById("botStatusText").textContent = "Bot Active";
}

function stopBot() {
  document.getElementById("botStatusText").textContent = "Bot Paused";
}
function goHome() {
    window.location.href = 'index.html'
}


/* =====================
   Deposit Logic
===================== */
function updateDeposit() {
  const asset = document.getElementById("asset").value;
  const network = document.getElementById("network");
  const address = document.getElementById("address");

  if (asset === "USDC") {
    network.textContent = "Network: ERC-20 ONLY";
  } else {
    network.textContent = "Network: Native";
  }

  address.textContent = "Wallet Address: 0xA1B2...FAKE";
}

function copyAddress() {
  navigator.clipboard.writeText("0xA1B2...FAKE");
  alert("Address copied");
}

/* =========================
   DEPOSIT SYSTEM
========================= */
const depositAddresses = {
  BTC: "bc1q-demo-btc-address",
  ETH: "0xDemoEthereumAddress",
  USDC: "0xDemoUSDC_ERC20"
};

function updateDepositUI() {
  const asset = document.getElementById("depositAsset").value;
  const networkText = document.getElementById("depositNetwork");
  const addressText = document.getElementById("depositAddress");

  networkText.textContent =
    asset === "USDC"
      ? "Network: ERC-20 ONLY"
      : "Network: Native";

  addressText.textContent = `Wallet Address: ${depositAddresses[asset]}`;
}

function copyDeposit() {
  const asset = document.getElementById("depositAsset").value;
  navigator.clipboard.writeText(depositAddresses[asset]);
  alert("Deposit address copied");
}
