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

const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
const card = document.querySelector(".card");

const todos_api = "https://jsonplaceholder.typicode.com/todos";
let todosId = 1;

const fetchTodos = (id) => {
  fetch(`${todos_api}/${id}`)
    .then((response) => {
      if (response.status !== 200) {
        card.innerHTML = `  <p style="color: red;">Error occured</p>`;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const { id, title, completed } = data;
      const color = completed ? "green" : "orange";
      card.style.borderColor = `2px solid ${color}`;
      card.innerHTML = `
        <h3>ID ${data.id}</h3>
        <p>Title: ${data.title}</p>
        <p>Status: ${data.completed ? "finished" : "pending"}</p>
      `;
    });
};

fetchTodos(todosId);

btnNext.addEventListener("click", () => {
  todosId++;

  if (todosId > 200) todosId = 1;

  fetchTodos(todosId);
});

btnPrev.addEventListener("click", () => {
  todosId--;
  if (todosId < 1) todosId = 200;
  fetchTodos(todosId);
});

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data));
