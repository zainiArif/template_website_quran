
const surahContainer = document.getElementById("surah-container");

// Fungsi untuk membuat elemen dengan kelas dan konten
function createElementWithClass(tag, className, content = "") {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.innerHTML = content;
  return element;
}

arabicVerses.forEach((verse, verseIndex) => {
  const verseContainer = createElementWithClass("div", "verse-container");

  const arabicTranslation = createElementWithClass("p", "arabic-translation");

  verse.forEach((word, index) => {
    const wordContainer = createElementWithClass("div", "word-container");

    const arabicWord = createElementWithClass("div", "arabic-word", word);
    arabicWord.dataset.popup = translationVerses[verseIndex][index];
    wordContainer.appendChild(arabicWord);

    const translationWord = createElementWithClass("div","translation-word", translationVerses[verseIndex][index]);
    wordContainer.appendChild(translationWord);
    arabicTranslation.appendChild(wordContainer);
  });

  //Tambahkan nomor ayat
  const wordContainer = createElementWithClass("div", "word-container");
  const arabicNumber = createElementWithClass("div", "arabic-number", arabicNumberVerses[verseIndex]);
  const translateNumber = createElementWithClass("div", "translate-number");
  wordContainer.appendChild(arabicNumber);
  wordContainer.appendChild(translateNumber);
  arabicTranslation.appendChild(wordContainer);

  verseContainer.appendChild(arabicTranslation);

  const translationContainer = createElementWithClass("p", "translation-container", fullTranslations[verseIndex]);
  verseContainer.appendChild(translationContainer);

  surahContainer.appendChild(verseContainer);
});

// mengatur pilihan tampilan antara tooltip dan Di bawah ayat
function updateDisplay(value) {
  const trWordElements = document.querySelectorAll(".translation-word");
  trWordElements.forEach((element) => {
    element.style.display = value === "tooltip" ? "none" : "block";
  });
}

function toogleBorder(value) {
  const wordContainer = document.querySelectorAll(".word-container");
  wordContainer.forEach((element) => {
    if (value === "tooltip") {
      element.style.border = "";
      element.style.padding = "";
    } else {
      element.style.border = "1px solid #a7fa8e";
      element.style.padding = "3px";
    }
  });
}

// Untuk switch Muncul tooltip dan Di bawah ayat
const switchInput = document.getElementById("mySwitch");
const switchStatus = document.getElementById("switchStatus");
let switchValue = "tooltip"; // Default

function updateSwitchStatus() {
    if (switchInput.checked) {
        switchStatus.textContent = "Di bawah ayat";
        switchValue = "line";
    } else {
        switchStatus.textContent = "Muncul tooltip";
        switchValue = "tooltip";
    }
}

updateSwitchStatus();
updateDisplay(switchValue);
toogleBorder(switchValue);

// Event listener untuk mendeteksi perubahan status switch Muncul tooltip dan Di bawah ayat
switchInput.addEventListener("change", function () {
  updateSwitchStatus();
  updateDisplay(switchValue);
  toogleBorder(switchValue);
});

// untuk hover popup atau tooltip
const popup = document.getElementById("popup");
const hoverElements = document.querySelectorAll(".arabic-word");
hoverElements.forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    const text = element.getAttribute("data-popup");
    popup.innerHTML = text;
    popup.style.display = switchValue === "tooltip" ? "block" : "none";
    popup.style.left = `${e.pageX - 30}px`; // Offset for popup position
    popup.style.top = `${e.pageY - 50}px`;
  });

  element.addEventListener("mousemove", (e) => {
    popup.style.left = `${e.pageX - 30}px`;
    popup.style.top = `${e.pageY - 50}px`;
  });

  element.addEventListener("mouseout", () => {
    popup.style.display = "none";
  });
});

// atur selisih lebar .arabic-word dengan .translation-word
const parentElements = document.querySelectorAll(".word-container");
// Iterasi setiap elemen parent
parentElements.forEach((parent) => {
  const spanCopy0 = document.createElement("span");
  const spanCopy1 = document.createElement("span");
  spanCopy0.classList.add("span-copy0");
  spanCopy1.classList.add("span-copy1");
  // Mengambil children dari setiap elemen parent
  const children = parent.children;
  // Menampilkan children
  spanCopy0.innerHTML = children[0].innerHTML;
  spanCopy1.innerHTML = children[1].innerHTML;
  document.body.appendChild(spanCopy0);
  document.body.appendChild(spanCopy1);
  if (spanCopy1.offsetWidth - spanCopy0.offsetWidth > 75) {
    children[1].style.width = `${spanCopy0.offsetWidth + 70}px`;
  }
  spanCopy0.remove();
  spanCopy1.remove();
});
