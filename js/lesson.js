const tabBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

let index = 0;
let slideInterval;

const hideBlocks = () => {
  tabBlocks.forEach((item) => (item.style.display = "none"));
  tabs.forEach((item) => item.classList.remove("tab_content_item_active"));
};

const showBlock = (i = 0) => {
  tabBlocks[i].style.display = "block";
  tabs[i].classList.add("tab_content_item_active");
};

hideBlocks();
showBlock(index);

const startSlider = () => {
  slideInterval = setInterval(() => {
    index = (index + 1) % tabs.length;
    hideBlocks();
    showBlock(index);
  }, 5000);
};

const stopAutoSlide = () => {
  clearInterval(slideInterval);
};

tabsParent.addEventListener("click", (event) => {
  if (event.target.tagName.toLowerCase() === "button") {
    tabs.forEach((item, i) => {
      if (item === event.target) {
        index = i;
        hideBlocks();
        showBlock(index);
      }
    });

    stopAutoSlide();
    startSlider();
  }
});

startSlider();

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const euroInput = document.querySelector("#eur");

const converter = (element) => {
  element.oninput = () => {
    const requester = new XMLHttpRequest();
    requester.open("GET", "../data/converter.json");
    requester.setRequestHeader("Content-Type", "application/json");
    requester.send();

    requester.onload = () => {
      const { usd, eur } = JSON.parse(requester.response);
      const value = element.value;

      if (element.id === "som") {
        usdInput.value = (value / usd).toFixed(2);
        euroInput.value = (value / eur).toFixed(2);
      }

      if (element.id === "usd") {
        somInput.value = (value * usd).toFixed(2);
        euroInput.value = ((value * usd) / eur).toFixed(2);
      }

      if (element.id === "eur") {
        somInput.value = (value * eur).toFixed(2);
        usdInput.value = ((value * eur) / usd).toFixed(2);
      }

      if (value === "") {
        somInput.value = "";
        usdInput.value = "";
        euroInput.value = "";
      }
    };
  };
};

converter(somInput);
converter(usdInput);
converter(euroInput);
