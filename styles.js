let heart = document.querySelectorAll(".card .heart-icon");
let callBtn = document.querySelectorAll(".card .call-btn");
let copyBtn = document.querySelectorAll(".card .copy-btn");
let callHistoryContainer = document.getElementById("call-history");
let clearCallHistoryBtn = document.getElementById("clear-call-history-btn");

let heartCounted = 0;
let coinCounted = 100;
let copyCounted = 0;
let callHistory = [];

// Copy Button Functionality
function copyNumber(e) {
  let copyCount = document.getElementById("copy-count");
  copyCounted++;
  copyCount.innerText = copyCounted;
  // copy the number
  let target = e.target;
  let card = target.closest(".card");
  let serviceNumber = card.querySelector("#service-number").innerText;

  navigator.clipboard.writeText(serviceNumber);
  alert(`Number Copied : ${serviceNumber}`);
}

copyBtn.forEach((item) => {
  item.addEventListener("click", copyNumber);
});

// Clear History
function clearHistory() {
  callHistory.length = 0;
  callHistoryContainer.innerHTML = "";
}

clearCallHistoryBtn.addEventListener("click", clearHistory);

// Creating History for every call
function createHistory(number, name) {
  let currentTime = new Date().toLocaleTimeString();
  let history = {
    number,
    name,
    currentTime,
  };
  callHistory.unshift(history);

  callHistoryContainer.innerHTML = "";
  callHistory.forEach((item) => {
    callHistoryContainer.innerHTML += ` <div
              class="flex justify-between items-center bg-[#f5f5f5] py-4 px-3 rounded-lg"
            >
              <div>
                <h2 id="history-name" class="font-bold">
                  ${item.name}
                </h2>
                <p id="history-number" class="text-gray-600">${item.number}</p>
              </div>
              <h1 id="history-time">${item.currentTime}</h1>
            </div>`;
  });
}

// Call Button Functionality
function call(e) {
  let target = e.target;
  let card = target.closest(".card");

  let coinCount = document.getElementById("coin-count");
  let serviceNumber = card.querySelector("#service-number").innerText;
  let serviceName = card.querySelector(".service-name").innerText;

  if (20 > coinCounted) {
    alert(
      "❌ You do not have sufficiant balance. you need minimum 20 coin for each call..!!"
    );
    return;
  }
  alert(`📞 Calling ${serviceName} ${serviceNumber}...`);

  coinCounted -= 20;
  coinCount.innerText = coinCounted;

  createHistory(serviceNumber, serviceName);
}

callBtn.forEach((item) => {
  item.addEventListener("click", call);
});

// Heart Button Functionality
function increaseHeart() {
  let heartCount = document.getElementById("heart-count");
  heartCounted++;
  heartCount.innerText = heartCounted;
}

heart.forEach((item) => {
  item.addEventListener("click", increaseHeart);
});