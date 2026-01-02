const tabBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

let index = 0;
let slideInterval;

const hideBlocks = () => {
  tabBlocks.forEach(item => item.style.display = "none");
  tabs.forEach(item => item.classList.remove("tab_content_item_active"));
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
