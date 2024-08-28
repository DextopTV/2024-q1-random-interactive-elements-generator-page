"use strict";

const interactivePanel = document.querySelector(".interactive-panel");
const generateButton = document.querySelector(".generate-button");
const generateButtonHeight = parseFloat(getComputedStyle(generateButton).getPropertyValue("height"));

let move = false,
  currentElement,
  offsetX,
  offsetY;

interactivePanel.addEventListener("mousedown", handleMouseDown);
interactivePanel.addEventListener("mousemove", handleMouseMove);
interactivePanel.addEventListener("mouseup", handleMouseUp);

generateButton.addEventListener("click", function() {
  generateElements(50, 50);
});

function handleMouseDown(e) {
  move = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  currentElement = e.target;
}

function handleMouseMove(e) {
  if (move && currentElement.className == "interactive-element") {
    currentElement.style.left = e.clientX - offsetX + "px";
    currentElement.style.top = e.clientY - generateButtonHeight - offsetY + "px";
  }
}

function handleMouseUp() {
  move = false;
}

function generateElements(elementWidth = 25, elementHeight = 25) {
  interactivePanel.innerHTML = "";

  for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");

    div.classList.add("interactive-element");
    div.style.width = elementWidth + "px";
    div.style.height = elementHeight + "px";

    div.style.left = getRandomValue(window.innerWidth - elementWidth + 1) + "px";
    div.style.top = getRandomValue(window.innerHeight - elementHeight - generateButtonHeight + 1) + "px";
    div.style.backgroundColor = getRandomColor();

    interactivePanel.append(div);
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[getRandomValue(16)];
  }

  return color;
}

function getRandomValue(max) {
  return Math.floor(Math.random() * max);
}
