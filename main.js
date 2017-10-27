'use strict';

let itemsCount = 0;

class KnapsackItemInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const valueLabel = document.createElement('label');
    const weightLabel = document.createElement('label');
    this.valueInput = document.createElement('input');
    this.weightInput = document.createElement('input');
    valueLabel.innerHTML = `Value item ${itemsCount}: `;
    this.valueInput.setAttribute('type', 'number');
    weightLabel.innerHTML = `Weight item ${itemsCount}: `;
    this.weightInput.setAttribute('type', 'number');
    
    shadow.appendChild(valueLabel);
    shadow.appendChild(this.valueInput);
    shadow.appendChild(weightLabel);
    shadow.appendChild(this.weightInput);
  }

  get data() {
    return {
      value: parseInt(this.valueInput.value, 10),
      weight: parseInt(this.weightInput.value, 10),
    };
  }
}

customElements.define('knapsack-item-input', KnapsackItemInput);

const container = document.getElementById('container');
const addItemButton = document.getElementById('add');
const removeItemButton = document.getElementById('remove');
const calculateButton = document.getElementById('calculate');

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
  itemsCount = itemsCount - 1;
}

function addItem() {
  const knapsackItemInput = document.createElement('knapsack-item-input');
  knapsackItemInput.setAttribute('id', `item${itemsCount}`);
  container.appendChild(knapsackItemInput);
  itemsCount = itemsCount + 1;
}

function calculate() {
  const objects = [];
  for(let i = 0; i < itemsCount; i++) {
    const knapsackItemInput = document.getElementById(`item${i}`);
    objects.push(knapsackItemInput.data);
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