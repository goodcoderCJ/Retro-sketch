//document elements for project
let h1 = document.querySelector("h1");
let neutralBtn = document.querySelector(".neutral-btn");
let rainbowBtn = document.querySelector(".rainbow-btn");
let removeBtn = document.querySelector(".remove-btn");
let clearBtn = document.querySelector(".clear-btn");
let slider = document.querySelector("#size");
let color = document.querySelector("#color");
let sizeIndicator = document.querySelector(".grid-size");
let grid = document.querySelector(".grid-row");

//calling function on target
slider.addEventListener("change", (e) => {
  createGrid(e.target.value);
});
slider.addEventListener("input", (e) => {
  createGrid(e.target.value);
});
color.addEventListener("change", (e) => {
  setColor(e.target.value);
});
removeBtn.addEventListener("click", () => {
  setMode("erase");
});
neutralBtn.addEventListener("click", () => {
  setMode("neutral");
});
rainbowBtn.addEventListener("click", () => {
  setMode("rainbow");
});
clearBtn.addEventListener("click", () => {
  clearGrid();
});
//variable state
const initialMode = "neutral";
const initialColor = "#cc0000";
const initialSize = 16;

let presentMode = initialMode;
let presentColor = initialColor;
let presentSize = initialSize;
let choosenColor;
let mode;

function setMode(newMode) {
  presentMode = newMode;
  mode = newMode;
  useMode();
  console.log(mode);
}
function setColor(newColor) {
  presentColor = newColor;
  choosenColor = newColor;
}
function setSize(newSize) {
  presentSize = newSize;
  console.log(newSize);
}
function randomColor(num) {
  return Math.floor(Math.random() * num + 1);
}
function setGrid(gridSize) {
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-items";
    gridItem.addEventListener("click", () => {
      let randomChoosenColor = `rgb(${randomColor(255)},${randomColor(
        255
      )},${randomColor(255)})`;
      if (neutralBtn.classList.contains("active")) {
        gridItem.style.backgroundColor = choosenColor;
        h1.style.color = choosenColor;
      } else if (rainbowBtn.classList.contains("active")) {
        gridItem.style.backgroundColor = randomChoosenColor;
        h1.style.color = randomChoosenColor;
      } else if (removeBtn.classList.contains("active")) {
        gridItem.style.backgroundColor = `rgb(148, 10, 10)`;
        h1.style.color = `rgb(148, 10, 10)`;
      }
    });
    grid.appendChild(gridItem);
  }
}
let clear = false;
function clearGrid() {
  grid.innerHTML = "";
}
function showGridVal(val) {
  sizeIndicator.innerHTML = `${val} x ${val}`;
}
function createGrid(val) {
  clearGrid();
  setSize(val);
  setGrid(val);
  showGridVal(val);
}

function useMode() {
  if (mode === "neutral") {
    neutralBtn.classList.add("active");
    rainbowBtn.classList.remove("active");
    removeBtn.classList.remove("active");
  } else if (mode === "rainbow") {
    neutralBtn.classList.remove("active");
    rainbowBtn.classList.add("active");
    removeBtn.classList.remove("active");
  } else {
    neutralBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
    removeBtn.classList.add("active");
  }
}
window.addEventListener("load", () => {
  setMode(presentMode);
  setGrid(presentSize);
  setColor(presentColor);
});
