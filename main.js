'use strict';

const container = document.getElementById('container');
const addItemButton = document.getElementById('add');
const removeItemButton = document.getElementById('remove');
const calculateButton = document.getElementById('calculate');

let itemCount = 0;

addItemButton.addEventListener('click', () => {
  addItem();
});

removeItemButton.addEventListener('click', () => {
  removeItem();
});

calculateButton.addEventListener('click', () => {
  calculate();
});

function removeItem() {
  container.removeChild(container.lastChild);
  itemCount = itemCount - 1;
}

function addItem() {
  const itemElement = document.createElement('div');
  const valueLabel = document.createElement('label');
  const weightLabel = document.createElement('label');
  const valueInput = document.createElement('input');
  const weightInput = document.createElement('input');  
  valueLabel.innerHTML = `Value item ${itemCount}: `;
  valueInput.setAttribute('id', `value${itemCount}`);
  valueInput.setAttribute('type', 'number');
  weightLabel.innerHTML = `Weight item ${itemCount}: `;
  weightInput.setAttribute('id', `weight${itemCount}`);
  weightInput.setAttribute('type', 'number');
  
  itemElement.appendChild(valueLabel);
  itemElement.appendChild(valueInput);
  itemElement.appendChild(weightLabel);
  itemElement.appendChild(weightInput);

  container.appendChild(itemElement);

  itemCount = itemCount + 1;
}

function calculate() {
  const objects = [];
  for(let i = 0; i < itemCount; i++) {
    const valueInput = document.getElementById(`value${i}`);
    const weightInput = document.getElementById(`weight${i}`);
    objects.push({
      value: parseInt(valueInput.value),
      weight: parseInt(weightInput.value),
    });
  }

  const maxWeightInput = document.getElementById('maxWeight');
  const maxWeight = maxWeightInput.value;

  const m = [[]];
  for (let i = 0; i <= objects.length; i++) {
    m[0].push(0);
  }
  for(let i = 1; i < maxWeight; i++) {
    const newRow = [];
    for(let j = 0; j < objects.length; j++) {
      console.log(objects[j].weight, i);
      if (objects[j].weight <= i) {
        newRow.push(objects[j].value + m[i - objects[j].weight][objects.length]);
      } else {
        newRow.push(0);
      }
    }
    let maxValue = newRow[0];
    for(let j = 1; j < objects.length; j++) {
      if (newRow[j] > maxValue) {
        maxValue = newRow[j];
      }
    }
    newRow.push(maxValue);
    m[i] = newRow;
  }

  console.log(m);
}