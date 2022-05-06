"use strict";

const shape = document.getElementById("shape");
shape.style.right = `${
  document.querySelector(".container").clientWidth * 0.5 - 100
}px`;
console.log(shape.style.right);
const randomNumberInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sizeFunc = function () {
  let num = randomNumberInterval(50, 300);
  console.log(num);
  shape.style.width = shape.style.height = `${num}px`;
};
const colorFunc = function () {
  //   const colorArr = [
  //     "gold",
  //     "blue",
  //     "red",
  //     "aquamarine",
  //     "purple",
  //     "green",
  //     "orange",
  //     "blueviolet",
  //     "teal",
  //     "turquoise",
  //     "pink",
  //     "coral",
  //     "crimson",
  //   ];
  //   let i = Math.floor(Math.random() * (13 - 0 + 1)) + 0;
  //   console.log(i);

  //   shape.style.backgroundColor = `${colorArr[i]}`;

  let red = randomNumberInterval(0, 255);
  let green = randomNumberInterval(0, 255);
  let blue = randomNumberInterval(0, 255);
  shape.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
};
const borderFunc = function () {
  const styles = [
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
  ];
  let red = randomNumberInterval(127, 255);
  let green = randomNumberInterval(127, 255);
  let blue = randomNumberInterval(127, 255);

  let i = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  shape.style.borderStyle = `${styles[i]}`;
  shape.style.borderColor = `rgb(${red}, ${green}, ${blue})`;
};
const radiusFunc = function () {
  let i = randomNumberInterval(0, 1);
  console.log(i);
  if (i === 0) {
    shape.style.borderRadius = "0%";
  } else {
    shape.style.borderRadius = "50%";
  }
};
const positionFunc = function () {
  const containerWidth = document.querySelector(".container").clientWidth - 20;

  let randomTop = Math.trunc(
    Math.random() * (500 - parseInt(shape.style.height))
  );

  let randomRight = Math.trunc(
    Math.random() * (containerWidth - parseInt(shape.style.width))
  );
  shape.style.top = `${randomTop}px`;
  shape.style.right = `${randomRight}px`;
  console.log(shape.style.width);
  console.log(randomRight);
};

//begin timer
let startTime = new Date();
//user action
shape.addEventListener("click", function () {
  //calculate time elapsed
  let miliseconds = new Date() - startTime;
  //display time
  document.querySelector("#user-time").textContent = (
    miliseconds / 1000
  ).toFixed(2);
  //hide current shape
  shape.style.visibility = "hidden";
  //create new shape
  sizeFunc();
  colorFunc();
  borderFunc();
  radiusFunc();
  positionFunc();
  //display new shape
  shape.style.visibility = "visible";
  //restart timer
  startTime = new Date();
});
