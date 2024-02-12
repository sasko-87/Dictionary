const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of ${word}`;

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    if (data.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;

      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = data[0].word;
      console.log(titleEl);
      meaningEl.innerText = data[0].meanings[0].definitions[0].definition;
      audioEl.src = data[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = `An error happend. Try again later`;
  }
}
inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
