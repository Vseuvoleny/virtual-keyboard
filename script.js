const EngLayout = [[96,49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61,'Backspace'],
['Tab',113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93,'Delete'],
['Capslock',97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 92,'Enter'],
['Left Shift', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47,'Right Shift','&#9650;'],
['Ctrl Left', 'Win', 'Alt Left', 'SPACE', 'Alt Right', 'Ctrl Right', '&#9668;', '&#9660;', '&#9658;']];

const rusLayout = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace', 'Tab', 1081, 1094, 1091,
1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 'DELETE', 'Caps Lock', 1092, 1099, 1074, 1072, 1087, 1088,
1086, 1083, 1076, 1078, 1101, 92, 'ENTER', 'Shift L', 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46,
'Shift R','&#9650;', 'Ctrl L', 'Win', 'Alt L', 'SPACE', 'Alt R', 'Ctrl R', '&#9668;', '&#9660;', '&#9658;'];

const keyboardsID = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8",
"Digit9", "Digit0", "Minus", "Equal",'backspace',
'Tab',"KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight",'DELETE',
"CapsLock","KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Backslash",
"ENTER","ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash",'ShiftRight','ArrowUp',
'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

function createField() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    "<div class=keyboard> <div class=keyboard_container></div></div>"
  );
}
createField();

class Keyboard {
  constructor() {
    this.container = document.querySelector(".keyboard_container");
  }

  addKeyboard() {
    this.addKeyboardsRows();
    this.createBtnIntoRow();
    this.addIDtoSpecSymbols();
  }
  addKeyboardsRows() {
    let row = "";
    for (let i = 1; i <= 5; i++) {
      row += `<div class = 'rows row${i}'></div>`;
      this.container.innerHTML = row;
    }
  }

  createBtnIntoRow() {
    let rows = document.querySelectorAll(".rows");
    rows.forEach((el, i) => {
      EngLayout[i].map(e => {
        if (typeof e === "number") {
          el.insertAdjacentHTML(
            "beforeend",
            `<button class = "key_btn">${String.fromCharCode(e)}</button>`
          );
        } else {
          el.insertAdjacentHTML(
            "beforeend",
            `<button class = "key_btn spec_key">${e}</button>`
          );
        }
      });
    });
  }

  addIDtoSpecSymbols() {
    const spec = document.querySelectorAll(".key_btn");
    spec.forEach((el, i) => (el.id = keyboardsID[i]));
  }

  addTextarea() {
    this.container.insertAdjacentHTML(
      "afterbegin",
      '<textarea class = "textarea"  row =100 column = 50 id = "textarea"></textarea>'
    );
  }
}

const keyboard = new Keyboard();
keyboard.addKeyboard();
keyboard.addTextarea();

const textarea = document.querySelector("#textarea");
let currentPos = textarea.selectionStart;
let arrElem = [];
let isEng = true;
let kyeContainer = document.querySelector(".keyboard_container");

class Button {
  constructor() {
    this.keys = document.querySelectorAll(".key_btn");
  }

  keyDown(event) {
    this.keys.forEach(el => {
      if (el.id.toUpperCase() === event.code.toUpperCase()) {
        arrElem.push(el);
        arrElem.map(el => el.classList.add("active"));
      }
    });
  }

  keyup() {
    arrElem.map(el => el.classList.remove("active"));
    arrElem = [];
  }

  keyboardTyping() {
    arrElem.forEach(el => {
      console.log(el.textContent);
      console.log(el.id);
      if (
        el.textContent.length === 1 &&
        el.id != "ArrowDown" &&
        el.id != "ArrowRight" &&
        el.id != "ArrowLeft" &&
        el.id != "ArrowUp"
      ) {
        textarea.value += String(el.innerHTML);
      } else {
        switch (el.id) {
          case "backspace":
            textarea.value = textarea.value.slice(0, currentPos - 1);
            break;
          case "Tab":
            textarea.value += " " + " ";
            break;
          case "Space":
            textarea.value += " ";
            break;
          case "ENTER":
            textarea.value += "\n";
            break;
          case "DELETE":
            textarea.value = textarea.value.slice(0, currentPos + 1);
            break;
          case "ArrowLeft":
            textarea.selectionStart -= 1;
            break;
          case "ArrowRight":
            textarea.selectionStart += 1;
            break;
          case "ArrowUp":
            textarea.selectionStart += 100;
            break;
          case "ArrowDown":
            textarea.selectionStart -= 100;
            break;
           case 'ShiftLeft':
             console.log(22)
               this.keys.forEach(e=>{
                  e.innerHTML = e.innerHTML.toUpperCase();
               })
             break;
        }
      }
    });
  }
  LangRus() {
    let shift = document.querySelector("#ShiftLeft");
    let ctrlL = document.querySelector("#ControlLeft");

    if (arrElem.includes(shift) && arrElem.includes(ctrlL)) {
      switch (isEng) {
        case true:
          this.keys.forEach((el, i) => {
            if (
              el.innerHTML.length === 1 &&
              el.id != "ArrowDown" &&
              el.id != "ArrowRight" &&
              el.id != "ArrowLeft" &&
              el.id != "ArrowUp"
            ) {
              el.textContent = String.fromCharCode(rusLayout[i]);
            }
          });
          isEng = false;
          break;
        case false:
          this.keys.forEach((el, i) => {
            if (
              el.innerHTML.length === 1 &&
              el.id != "ArrowDown" &&
              el.id != "ArrowRight" &&
              el.id != "ArrowLeft" &&
              el.id != "ArrowUp"
            ) {
              el.textContent = String.fromCharCode(EngLayout.flat()[i]);
            }
          });
          isEng = true;
          break;
      }
    }
  }
}



let button = new Button();
document.addEventListener("keydown", function(event) {
  textarea.blur();
  button.keyDown(event);
  button.keyboardTyping();
  button.LangRus();
});
document.addEventListener("keyup", function() {
  button.keyup();
});

kyeContainer.addEventListener(
  "mousedown",
  function mousedown(event) {
    button.keys.forEach((el, i) => {
      if (el.id === event.target.id) {
        console.log("dfgldf");
        arrElem.push(button.keys[i]);
        arrElem.map(elem => elem.classList.add("active"));
      }
    });
  },
  button.keyboardTyping(event)
);

kyeContainer.addEventListener("mouseup", function mouseUp() {
  arrElem.map(el => el.classList.remove("active"));
  arrElem = [];
});

let board = [];
document.onkeypress = function(event) {
  board.push(event.charCode);
  console.log(board);
};
// document.onkeypress = function(event) {
//   board.push(event.code);
//   console.log(board);
// };
