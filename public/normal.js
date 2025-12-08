"use strict";

const size = 4;
const folder = "images/easy_images";
const tiles = [];

function init() {
  const table = document.getElementById("table");
  table.innerHTML = "";
  tiles.length = 0;

  for (let row = 0; row < size; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < size; col++) {
      const i = row * size + col;
      const td = document.createElement("td");
      td.className = "tile";
      td.index = i;
      td.value = i;

      if (i !== size * size - 1) {
        const img = document.createElement("img");
        img.src = `${folder}/piece_${i}.jpg`;
        td.appendChild(img);
      } else {
        td.classList.add("empty");
      }

      td.onclick = clickTile;
      tr.appendChild(td);
      tiles.push(td);
    }
    table.appendChild(tr);
  }

  shuffleTiles();
}

function shuffleTiles() {
  let blankIndex = size * size - 1;
  const moves = [-1, 1, -size, size]; // 左右上下
  for (let k = 0; k < 500; k++) { // 適度にシャッフル
    const possible = moves
      .map(m => blankIndex + m)
      .filter(n => n >= 0 && n < size * size && !(blankIndex % size === 0 && n === blankIndex - 1) && !(blankIndex % size === size - 1 && n === blankIndex + 1));
    const target = possible[Math.floor(Math.random() * possible.length)];
    swap(blankIndex, target);
    blankIndex = target;
  }
}

function clickTile(e) {
  const i = e.target.index ?? e.target.parentNode.index;
  if (i == null) return;

  const blank = size * size - 1;

  if (i - size >= 0 && tiles[i - size].value === blank) swap(i, i - size);
  else if (i + size < tiles.length && tiles[i + size].value === blank) swap(i, i + size);
  else if (i % size !== 0 && tiles[i - 1].value === blank) swap(i, i - 1);
  else if (i % size !== size - 1 && tiles[i + 1].value === blank) swap(i, i + 1);

  checkClear();
}

function swap(i, j) {
  const tmpVal = tiles[i].value;
  tiles[i].value = tiles[j].value;
  tiles[j].value = tmpVal;

  const imgI = tiles[i].querySelector("img");
  const imgJ = tiles[j].querySelector("img");

  tiles[i].innerHTML = "";
  tiles[j].innerHTML = "";

  if (imgJ) tiles[i].appendChild(imgJ);
  else tiles[i].classList.add("empty");

  if (imgI) tiles[j].appendChild(imgI);
  else tiles[j].classList.add("empty");

  tiles[i].classList.remove("empty");
  tiles[j].classList.remove("empty");
}

let cleared = false; // 一度だけクリア判定用

function checkClear() {
  if (cleared) return; // すでにクリア済みなら無視

  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].value !== i) return;
  }

  cleared = true;
  // 0.1秒後にクリア画面に遷移
  setTimeout(() => {
    location.href = "clear.html?level=easy";
  }, 100);
}

window.onload = init;
// テスト用 即クリア関数
const testBtn = document.getElementById("testClear");
  if (testBtn) {
    testBtn.onclick = () => {
      setTilesSolved(); // 即クリア関数
    };
  }

function setTilesSolved() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].value = i;
    const img = tiles[i].querySelector("img");
    tiles[i].innerHTML = "";

    if (i !== tiles.length - 1) {
      if (img) tiles[i].appendChild(img);
      tiles[i].classList.remove("empty");
    } else {
      tiles[i].classList.add("empty");
    }
  }

  checkClear();
}

