// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll(".btn-color");
const javaScript = document.querySelector("#js-color");

const generateRandomColor = () => {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
};

const setRandomColors = () => {
  buttonsColor.forEach((buttonColor) => {
    buttonColor.innerHTML = generateRandomColor();
    buttonColor.onclick = (event) => {
      javaScript.style.color = event.target.innerHTML;
    };
  });
};

window.onload = () => setRandomColors();
window.onkeydown = (event) => {
  if (event.code.toLowerCase() === "space") {
    event.preventDefault();
    setRandomColors();
  }
};

// SLIDER BLOCK

const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
let index = 0;

const hideSlide = () => {
  slides.forEach(slide => {
    slide.style.opacity = 0;
    slide.classList.remove("active_slide");
  });
};

const showSlide = (i = 0) => {
  if (!slides.length) return;      
  if (!slides[i]) i = 0;           

  hideSlide();

  slides[i].style.opacity = 1;
  slides[i].classList.add("active_slide");

  index = i;
};


hideSlide();
showSlide(index);
let sliderInterval = null;

const autoSlider = () => {
  if (sliderInterval) return; // защита от дубликатов

  sliderInterval = setInterval(() => {
    index++;

    if (index >= slides.length) {
      index = 0;
    }

    hideSlide();
    showSlide(index);
  }, 10000);
};


const resetAutoSlider = () => {
  clearInterval(sliderInterval);
  sliderInterval = null;
  autoSlider();
};

if (next && prev) {
  next.onclick = () => {
    index = index < slides.length - 1 ? index + 1 : 0;
    hideSlide();
    showSlide(index);
    resetAutoSlider();
  };

  prev.onclick = () => {
    index = index > 0 ? index - 1 : slides.length - 1;
    hideSlide();
    showSlide(index);
    resetAutoSlider();
  };
}


