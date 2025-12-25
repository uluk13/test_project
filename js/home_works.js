const inputElement = document.querySelector("#gmail_input");
const gmailBtn = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const child = document.querySelector(".child_block");
const parent = document.querySelector(".parent_block");
const parentWidth = parent.offsetWidth;

const regex = /\w+@gmail\.com/;

gmailBtn.addEventListener("click", () => {
  if (regex.test(inputElement.value)) {
    gmailResult.style.color = "green";
    gmailResult.innerHTML = "Valid Gmail address";
  } else {
    gmailResult.style.color = "red";
    gmailResult.innerHTML = "Invalid Gmail address";
  }
});

let left = 0;
const dvizhenieBtn = () => {
  if (left < parentWidth - child.offsetWidth) {
    left += 10;
    child.style.left = `${left}px`;
    requestAnimationFrame(dvizhenieBtn);
  }
};

requestAnimationFrame(dvizhenieBtn);
