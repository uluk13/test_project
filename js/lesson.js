const tabBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

let index = 0;
let slideInterval;

const hideBlocks = () => {
  tabBlocks.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tab_content_item_active");
  });
};

const showBlock = (index = 0) => {
  tabBlocks[index].style.display = "block";
  tabs[index].classList.add("tab_content_item_active");
};

hideBlocks();
showBlock();

tabsParent.addEventListener("click", (event) => {
  if (event.target.tagName.toLowerCase() === "button") {
    tabs.forEach((item, index) => {
      if (item === event.target) {
        index = index;
        hideBlocks();
        showBlock(index);
      }
    });
  }
  stopAutoSlide
  startSlider()
});



const startSlider = () => {
  slideInterval = setInterval(() => {
    index = (index + 1) % tabs.length;
    hideBlocks();
    showBlock(index);
  }, 5000);
};

const stopAutoSlide = () => {
  if (slideInterval) clearInterval(slideInterval);
};

startSlider();
