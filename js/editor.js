// Retrieve Elements
const consoleLogList = document.getElementById("console-logs");
const executeCodeBtn = document.getElementById("btn-run");
const resetCodeBtn = document.getElementById("btn-clear");
const examplesElm = document.getElementById("examples-select");
const toggleBtn = document.getElementById("btn-toggle");

// Setup Ace
let editor = ace.edit("editor");
let session = editor.session;
let defaultCode =
'# World First Programming in Ol-Chiki\n\nᱪᱟᱞᱟ ᱩᱢᱟᱨ = ᱓᱒;\nᱡᱩᱫᱤ (ᱩᱢᱟᱨ == ᱒᱕) {\n  ᱚᱞ "ᱟᱞᱟᱱᱜ ᱟᱦ ᱩᱢᱟᱨ ᱢᱮᱫ ᱜᱤᱭᱟ"; # We\'re same age\n}\nᱮᱴᱟᱜ ᱡᱩᱫᱤ (ᱩᱢᱟᱨ > ᱒᱕) {\n  ᱚᱞ "ᱟᱞᱟᱱᱜ ᱟᱦ ᱩᱢᱟᱨ ᱵᱟᱱᱜ ᱢᱮᱫ ᱟᱦ"; # We\'re not same age\n}\nᱮᱴᱟᱜ {\n  ᱚᱞ "ᱤᱱᱜ ᱠᱦᱚᱭ ᱟᱢ ᱞᱟᱛᱩ ᱜᱤᱭᱟ"; # Younger to me\n}';
let consoleMessages = [];

let editorLib = {
  clearConsoleScreen() {
    consoleMessages.length = 0;

    // Remove all elements in the log list
    while (consoleLogList.firstChild) {
      consoleLogList.removeChild(consoleLogList.firstChild);
    }
  },
  printToConsole() {
    consoleMessages.forEach((log) => {
      const newLogItem = document.createElement("li");
      const newLogText = document.createElement("pre");

      newLogText.className = log.class;
      newLogText.textContent = `> ${log.message}`;

      newLogItem.appendChild(newLogText);

      consoleLogList.appendChild(newLogItem);
    });
  },
  init() {
    // Configure Ace Options
    editor.setOptions({
      wrap: true,
      // wrap text to view
      showPrintMargin: false,
      indentedSoftWrap: false,
      behavioursEnabled: false,
      enableBasicAutocompletion: [
        {
          getCompletions: function (editor, session, pos, prefix, callback) {
            var kwList = [
              ["cala", "ᱪᱟᱞᱟ"],
              ["ol", "ᱚᱞ"],                                          
              ["judi", "ᱡᱩᱫᱤ"],                                                                                                     
              ["atha", "ᱮᱴᱟᱜ"],
              ["sari", "ᱥᱟᱨᱮ"],
              ["galti", "ᱜᱟᱞᱛᱤ"],
              ["sutam", "ᱝᱩᱱᱪᱛᱤᱚᱱ"],
              ["ror", "ᱨᱩᱟᱨ"],
              ["chaka", "ᱪᱦᱟᱠᱟ"],
              ["hopon", "ᱡᱟᱦᱟᱸ"],
              ["rapud", "ᱨᱟᱯᱩᱫ"],
              ["lay", "ᱞᱟᱭ"],
              ["chai", "ᱪᱟᱥ"],
              ["puthi", "ᱫᱮᱝᱟᱩᱞᱛ"],
              ["hoho", "ᱦᱚᱦᱚ"],
            ];
            callback(
              null,
              kwList.map(function (kw) {
                return {
                  value: kw[0],
                  meta: kw[1],
                }
              }))
          }
        }],
      // to make popup appear automatically, without explicit _ctrl+space_
      enableLiveAutocompletion: true,
      // disable autopairing of brackets and tags
    });

    // Set Default Code
    editor.setValue(defaultCode);
  },
  add(text) {
    session.insert(session.selection.getCursor(), " " + text + " ");
    // Insert the text at the current cursor position
  },
};

// Events
executeCodeBtn.addEventListener("click", () => {
  // Get input from the code editor
  const userCode = editor.getValue();

  // Clear the array first
  consoleMessages = [];

  // Run the user code
  try {
    sakam(userCode);
  } catch (err) {
    console.error(err);
  }

  // Print to the console
  editorLib.printToConsole();
});

resetCodeBtn.addEventListener("click", () => {
  // Clear console messages
  editorLib.clearConsoleScreen();
});

editorLib.init();

digitMapping = ['᱐', '᱑', '᱒', '᱓', '᱔', '᱕', '᱖', '᱗', '᱘', '᱙'];

const REGEX = {
  DIGIT: /[\u1c50\u1c51\u1c52\u1c53\u1c54\u1c55\u1c56\u1c57\u1c58\u1c59]/i,
  IDENTIFIER: /[\u1c5a\u1c5b\u1c5c\u1c5d\u1c5e\u1c5f\u1c60\u1c61\u1c62\u1c63\u1c64\u1c65\u1c66\u1c67\u1c68\u1c69\u1c6a\u1c6b\u1c6c\u1c6d\u1c6e\u1c6f\u1c70\u1c71\u1c72\u1c73\u1c74\u1c75\u1c76\u1c77\u1c78\u1c79\u1c7a\u1c7b\u1c7c\u1c7d\u1c7e\u1c7f]/i,
};


/*/add keyword button dnymically
let Keyword = ["ᱪᱟᱞᱟ", "ᱚᱞ", "ᱡᱩᱫᱤ", "ᱮᱴᱟᱜ", "ᱥᱟᱨᱮ", "ᱜᱟᱞᱛᱤ", "ᱝᱩᱱᱪᱛᱤᱚᱱ", "ᱨᱩᱟᱨ", "ᱪᱦᱟᱠᱟ", "ᱡᱟᱦᱟᱸ", "ᱨᱟᱯᱩᱫ", "ᱞᱟᱭ", "ᱪᱟᱥ", "ᱫᱮᱝᱟᱩᱞᱛ", "ᱦᱚᱦᱚ"];
let KeywordArea = document.getElementsByClassName("hint-area")[0];
Keyword.forEach((keyword) => {
  let newBtn = document.createElement("button");
  newBtn.textContent = keyword;
  newBtn.addEventListener("click", () => {
    editorLib.add(keyword);
  });
  KeywordArea.appendChild(newBtn);
});
*/

// examples
const examples = new Map([
  ["johar", `ᱚᱞ "ᱡᱚᱦᱟᱨ!";`],
  [
    "main",
    "ᱚᱞ ᱒+᱑; # ᱓\nᱚᱞ ᱒-᱑; # ᱑\nᱚᱞ ᱒*᱑; # ᱒\nᱚᱞ ᱒/᱑; # ᱒\nᱚᱞ ᱒%᱑; # ᱐\nᱚᱞ ᱒>᱑; # ᱥᱟᱨᱮ\nᱚᱞ ᱒<᱑; # ᱜᱟᱞᱛᱤ\nᱚᱞ ᱒==᱑; # ᱜᱟᱞᱛᱤ\nᱚᱞ ᱒!=᱑; # ᱥᱟᱨᱮ\nᱚᱞ ᱒>=᱑; # ᱥᱟᱨᱮ\nᱚᱞ ᱒>=᱑; # ᱥᱟᱨᱮ\nᱚᱞ ᱒<=᱑; # ᱜᱟᱞᱛᱤ\nᱚᱞ ᱒&&᱑; # ᱥᱟᱨᱮ\nᱚᱞ ᱒||᱑; # ᱥᱟᱨᱮ",
  ],
  [
    "baha",
    '# Creating an ᱞᱤᱥᱛ\nᱪᱟᱞᱟ ᱠ = [["ᱩᱞ",᱑ ],["ᱱᱮᱢᱩ",᱒],["ᱥᱮᱵ",᱓]];\nᱚᱞ ᱠ;\n\n# Adding elements to a ᱞᱤᱥᱛ\nᱪᱟᱞᱟ ᱞᱟᱛᱩᱦᱚᱨ = []; # ᱠᱦᱟᱞᱤ ᱞᱤᱥᱛ - Empty list\n\nᱪᱟᱞᱟ ᱞᱟᱛᱩᱦᱚᱨ[]= "Kisku";\nᱪᱟᱞᱟ ᱞᱟᱛᱩᱦᱚᱨ[]= "Hansdak";\nᱪᱟᱞᱟ ᱞᱟᱛᱩᱦᱚᱨ[]= "Murmu";\nᱪᱟᱞᱟ ᱞᱟᱛᱩᱦᱚᱨ[]= "Soren";\nᱪᱟᱞᱟ ᱞᱟᱛᱩᱦᱚᱨ[]= "Hembram";\nᱪᱟᱞᱟ ᱞᱟᱛᱩᱦᱚᱨ[]= "Mandi";\nᱪᱟᱞᱟ ᱞᱟᱛᱩᱦᱚᱨ[]= "chori";\n\nᱚᱞ ᱞᱟᱛᱩᱦᱚᱨ;\nᱚᱞ ᱡᱚᱛᱚ(ᱞᱟᱛᱩᱦᱚᱨ);',
  ],
  [
    "add",
    "ᱝᱩᱱᱪᱛᱤᱚᱱ ᱭᱚᱩ(ᱚ,ᱵ){\n    ᱨᱩᱟᱨ ᱚ+ᱵ;\n}\n\nᱚᱞ ᱭᱚᱩ(᱑᱑,᱒᱒); # it will print ᱓᱓ ",
  ],
  [
    "dari",
    '# This will print only till ᱕, it will break after ᱚ = ᱕\nᱪᱦᱟᱠᱟ(ᱪᱟᱞᱟ ᱚ = ᱐; ᱚ < ᱑᱐; ᱪᱟᱞᱟ  ᱚ = ᱚ+ ᱑)\n{\n  ᱡᱩᱫᱤ (ᱚ > ᱕){\n    ᱨᱟᱯᱩᱫ;\n }\n  ᱚᱞ  "ᱚ = " + ᱚ;\n}',
  ],
  [
    "ched",
    'ᱪᱟᱞᱟ ᱩᱢᱟᱨ = ᱓᱒;\nᱡᱩᱫᱤ (ᱩᱢᱟᱨ == ᱒᱕) {\n  ᱚᱞ "ᱟᱞᱟᱱᱜ ᱟᱦ ᱩᱢᱟᱨ ᱢᱮᱫ ᱜᱤᱭᱟ"; \n}\nᱮᱴᱟᱜ ᱡᱩᱫᱤ (ᱩᱢᱟᱨ > ᱒᱕) {\n  ᱚᱞ "ᱟᱞᱟᱱᱜ ᱟᱦ ᱩᱢᱟᱨ ᱵᱟᱱᱜ ᱢᱮᱫ ᱟᱦ"; \n}\nᱮᱴᱟᱜ {\n  ᱚᱞ "ᱤᱱᱜ ᱠᱦᱚᱭ ᱟᱢ ᱞᱟᱛᱩ ᱜᱤᱭᱟ"; \n}',
  ],
  [
    "hoy",
    "ᱪᱟᱞᱟ ᱚ = ᱓;\n\nᱞᱟᱭ (ᱚ) {\n    ᱪᱟᱥ ᱑:\n        ᱚᱞ 'ᱞᱟᱭ ᱑ ᱯᱮᱨᱝᱚᱨᱢ'; # case 1 executed\n    ᱪᱟᱥ ᱒:\n        ᱚᱞ 'ᱞᱟᱭ ᱒ ᱯᱮᱨᱝᱚᱨᱢ'; \n    ᱪᱟᱥ ᱓:\n        ᱚᱞ 'ᱞᱟᱭ ᱓ ᱯᱮᱨᱝᱚᱨᱢ'; \n    ᱫᱮᱝᱟᱩᱞᱛ:\n        ᱚᱞ 'ᱫᱮᱝᱟᱩᱞᱛ ᱪᱟᱥᱩᱟᱞᱞᱟᱭ ᱯᱮᱨᱝᱚᱨᱢ'; \n}",
  ],
  [
    "bang",
    'ᱪᱦᱟᱠᱟ(ᱪᱟᱞᱟ ᱚ = ᱐; ᱚ < ᱑᱐; ᱪᱟᱞᱟ  ᱚ = ᱚ+ ᱑)\n{\n  # ᱪᱦᱟᱠᱟ takes in 3 parameters initial value, and condition, and a step size\n  ᱚᱞ  "ᱚ = " + ᱚ;\n} \n# This will print ᱐ to ᱙',
  ],
  [
    "okay",
    'ᱝᱩᱱᱪᱛᱤᱚᱱ ᱯᱚᱭᱥᱟᱛᱟᱠᱟ(ᱢ,ᱫ,ᱪ){\n    ᱨᱩᱟᱨ ᱢ+(ᱢ*ᱫ*ᱪ/᱑᱐᱐);\n   }\nᱪᱟᱞᱟ ᱛᱤᱱᱟᱜᱟᱱ = ᱑᱐᱐᱐;\nᱪᱟᱞᱟ ᱫᱟᱨᱤ = ᱘;\nᱪᱟᱞᱟ ᱚᱠᱛᱟ = ᱕; \n\nᱚᱞ "ᱯᱚᱭᱥᱟᱛᱟᱠᱟ ="+ᱯᱚᱭᱥᱟᱛᱟᱠᱟ(ᱛᱤᱱᱟᱜᱟᱱ,ᱫᱟᱨᱤ,ᱚᱠᱛᱟ);',
  ],
]);
for (let name of examples.keys()) {
  const elm = document.createElement("option");
  if (name === "johar") elm.selected = true;
  elm.innerText = name;
  examplesElm.appendChild(elm);
}
examplesElm.addEventListener("change", (evt) => {
  if (evt.target.value) {
    editor.setValue(examples.get(evt.target.value), -1);
    editorLib.clearConsoleScreen();
    executeCodeBtn.click();
  }
});
editor.container.addEventListener("keydown", (key) => {
  if (toggleBtn.checked) {
    if (key.code == "Space" || key.code == "Enter") {
      let pos = session.selection.getCursor();
      let text = session.doc.$lines[pos.row]
        .slice(0, pos.column)
        .split(" ")
        .pop();
      let Ol_chiki = Sanscript.t(text, "itrans", "ol_cement");
      editor.session.replace(
        {
          start: {
            row: pos.row,
            column: pos.column - text.length,
          },
          end: pos,
        },
        Ol_chiki
      );
    }
  }
});
