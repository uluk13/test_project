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
  element.oninput = async () => {
    try {
      const response = await fetch("../data/converter.json");

      if (!response.ok) {
        throw new Error("Failed to load rates");
      }

      const { usd, eur } = await response.json();
      const value = element.value;

      if (value === "") {
        somInput.value = "";
        usdInput.value = "";
        euroInput.value = "";
        return;
      }

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

    } catch (error) {
      console.error("Converter error:", error);
    }
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

const fetchTodos = async (id) => {
  try {
    const response = await fetch(`${todos_api}/${id}`);

    if (!response.ok) {
      card.innerHTML = `<p style="color: red;">Error occured</p>`;
      return;
    }

    const data = await response.json();

    const { completed } = data;
    const color = completed ? "green" : "orange";

    card.style.border = `2px solid ${color}`;
    card.innerHTML = `
      <h3>ID ${data.id}</h3>
      <p>Title: ${data.title}</p>
      <p>Status: ${completed ? "finished" : "pending"}</p>
    `;
  } catch (error) {
    card.innerHTML = `<p style="color: red;">Error occured</p>`;
    console.error(error);
  }
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

fetch("https://api-fcb.pulselive.com/football/stats/player/110491?teams=49&detail=2&comps=2%2C21%2C23%2C24%2C25%2C29%2C3")
  .then((response) => response.json())
  .then((data) => console.log(data));


const cityInput = document.querySelector(".cityName");
const btnSearsch = document.querySelector("#search"); 
const cityName = document.querySelector(".city");
const tempText = document.querySelector(".temp");

const key = 'a6f7a778e164b2ea4b803a1f15c8e74f'
const BASE_API = 'https://api.openweathermap.org/data/2.5/weather'

fetchWeather = async() => {
  if (cityInput.value === ''){
    cityName.innerHTML = 'Укажите город';
    tempText.innerHTML = '';
  }else{
    const response = await fetch(`${BASE_API}?q=${cityInput.value}&units=metric&lang=ru&appid=${key}`);
    if (!response.ok){
      cityName.innerHTML = 'Город не найден';
      tempText.innerHTML = '';
      return;
    }
    const data = await response.json();
    const {name, main: {temp}} = data;
    cityName.innerHTML = name;
    tempText.innerHTML = `${temp} градусов`
  }
  cityInput.value = '';
}

btnSearsch.addEventListener("click", fetchWeather);
