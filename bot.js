function goHome() {
    window.location.href = 'index.html'
}
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "auth.html";
}
document.addEventListener("DOMContentLoaded", () => {


  // ======= Bot Data =======
  const bots = {
    scalper: { level: "Beginner", risk: "Low" },
    swing: { level: "Intermediate", risk: "Medium" },
    arbitrage: { level: "Advanced", risk: "High" }
  };

  // ======= DOM Elements =======
  const botSelect = document.getElementById("botSelect");
  const botLevelEl = document.getElementById("botLevel");
  const botRiskEl = document.getElementById("botRisk");
  const riskSelect = document.getElementById("risk");
  const botStatusText = document.getElementById("botStatusText");
  const statusDot = document.querySelector(".status-dot");

  const depositModal = document.getElementById("depositModal");

  let botRunning = false;

  // ======= Update Bot Details =======
  botSelect.addEventListener("change", () => {
    const selected = botSelect.value;
    if (!selected) {
      botLevelEl.textContent = "-";
      botRiskEl.textContent = "-";
      return;
    }
    const bot = bots[selected];
    botLevelEl.textContent = bot.level;
    botRiskEl.textContent = bot.risk;
    riskSelect.value = bot.risk;
  });

  // ======= Funding check =======
  function isFunded() {
    return localStorage.getItem("depositDone") === "true";
  }

  // ======= Deposit Modal Functions =======
  window.openDepositModal = function() {
    depositModal.style.display = "block";
  }

  window.closeDepositModal = function() {
    depositModal.style.display = "none";
  }

  // ======= Select Crypto =======
  window.selectCrypto = function(button) {
    const asset = button.dataset.asset;
    const depositAddressEl = document.getElementById("depositAddress");
    const depositNetworkEl = document.getElementById("depositNetwork");

    const depositAddresses = {
      BTC: "bc1q-demo-btc-address",
      ETH: "0xDemoEthereumAddress",
      USDC: "0xDemoUSDC_ERC20"
    };

    const networks = {
      BTC: "Network: BTC",
      ETH: "Network: ETH",
      USDC: "Network: ERC-20"
    };

    depositAddressEl.textContent = `Wallet Address: ${depositAddresses[asset]}`;
    depositNetworkEl.textContent = networks[asset];

    // Highlight selected
    document.querySelectorAll(".crypto-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  }

  // ======= Copy Deposit =======
  window.copyDeposit = function() {
    const depositAddressEl = document.getElementById("depositAddress");
    navigator.clipboard.writeText(depositAddressEl.textContent.replace("Wallet Address: ", ""));
    alert("Deposit address copied!");
  }

  // ======= Start Bot =======
  window.startBot = function() {
    const selectedBot = botSelect.value;
    if (!selectedBot) {
      alert("Select a bot first!");
      return;
    }

    if (!isFunded()) {
      openDepositModal();
      return;
    }

    botRunning = true;
    botStatusText.textContent = "Running";
    statusDot.classList.add("active");

    statusDot.style.background =
      riskSelect.value === "High"
        ? "#ef4444"
        : riskSelect.value === "Medium"
        ? "#facc15"
        : "#16a34a";
  }

  // ======= Stop Bot =======
  window.stopBot = function() {
    botRunning = false;
    botStatusText.textContent = "Paused";
    statusDot.classList.remove("active");
    statusDot.style.background = "#aaa";
    statusDot.style.boxShadow = "none";
  }

  // ======= Risk Level Change =======
  riskSelect.addEventListener("change", () => {
    botRiskEl.textContent = riskSelect.value;
    if (botRunning) {
      statusDot.style.background =
        riskSelect.value === "High"
          ? "#ef4444"
          : riskSelect.value === "Medium"
          ? "#facc15"
          : "#16a34a";
    }
  });

  // ======= Glow animation =======
  setInterval(() => {
    if (botRunning) {
      statusDot.style.boxShadow = `0 0 10px ${
        riskSelect.value === "High"
          ? "rgba(239,68,68,0.7)"
          : riskSelect.value === "Medium"
          ? "rgba(250,204,21,0.7)"
          : "rgba(34,197,94,0.7)"
      }`;
    } else {
      statusDot.style.boxShadow = "none";
    }
  }, 500);

});
