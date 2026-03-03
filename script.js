// Fetching all levels
const getLevels = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevels(json.data));
};
// Remove active from all buttons
const removeActive = () => {
  const lessonsButtons = document.querySelectorAll(".lesson-btn");
  lessonsButtons.forEach((btn) => {
    btn.classList.remove("bg-blue-800", "text-white");
  });
};
// Spinner
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};
// Fetching all words that related to the level
const getLevelWords = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const activeBtn = document.getElementById(`active-btn-${id}`);
      activeBtn.classList.add("bg-blue-800", "text-white", "py-2");

      displayLevelWords(data.data);
    });
};
// Fetching details of a word
const getWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => displayWordDetails(data.data));
  const res = await fetch(url);
  const data = await res.json();
  displayWordDetails(data.data);
};
// rendering synonyms array from word details
const getSynonyms = (arr) => {
  return arr && arr.length > 0
    ? arr
        .map(
          (syn) =>
            `<span class="bg-slate-200 px-4 py-2 rounded-lg">${syn}</span>`,
        )
        .join(" ")
    : `<span class= "bg-slate-200 px-4 py-2 rounded-lg">No synonyms found</span>`;
};
// Display details in word Modal
const displayWordDetails = (word) => {
  console.log(word);

  const detailModal = document.getElementById("modal-details");
  detailModal.innerHTML = ` 
        <h2 class="font-semibold text-4xl mb-5">${word.word} (<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>
          <p class="font-semibold text-2xl mb-2">Meaning</p>
          <p class="font-bangla font-medium text-2xl mb-5">${word.meaning}</p>
          <p class="font-semibold text-2xl">Example</p>
          <p class="mb-5">${word.sentence}</p>
          <p class="font-bangla font-semibold text-2xl mb-2">সমার্থক শব্দগুলো</p>
    
          <p>${getSynonyms(word.synonyms)}</p>
           <button class=" text-[#422AD5] border-1 font-semibold px-4 py-2 cursor-pointer hover:bg-blue-800 hover:text-white transition duration-300 rounded-lg mt-5">Complete Learning</button>
          `;

  const wordModal = document.getElementById("word_modal");
  wordModal.showModal();
};
// Display all levels
const displayLevels = (lessons) => {
  const levelContainer = document.getElementById("level");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const divBtn = document.createElement("div");
    divBtn.innerHTML = `
     <button id="active-btn-${lesson.level_no}" onclick = "getLevelWords(${lesson.level_no})" class="inline-block text-[#422AD5] border-1 font-semibold px-4 py-2 cursor-pointer hover:bg-blue-800 hover:text-white transition duration-300 rounded-lg lesson-btn">
       <i class="fa-solid fa-book"></i>
        <span class="ml-2">Level - ${lesson.level_no}</span>
     </button
                >
    `;
    levelContainer.appendChild(divBtn);
  }
};
// Display all words, word container
const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
     <div class="space-y-5 py-16 text-center w-full">
       <img src="assets/alert-error.png" alt="" class="mx-auto">
          <p class="font-bangla text-[#79716B]">
           এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="font-bold text-[34px] text-[#292524] font-bangla">
            নেক্সট Lesson এ যান
          </h2>
        </div>
    `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.classList =
      "word-card bg-white py-20 px-5 md:w-[480px] w-full h-[450px] space-y-4";

    wordDiv.innerHTML = `
        <h2 class="text-black text-[32px] font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="text-[20px] font-medium">Meaning / Pronounciation</p>
        <h2 class="font-bangla font-semibold text-[#18181B] text-[32px]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${
          word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"
        }"
        </h2>
        <div class="flex justify-between items-center px-6 mt-10" >
            <button onclick="getWordDetails(${word.id})" class="bg-slate-200 p-3 rounded-lg hover:bg-[#18181B] hover:text-white transition duration-300">
                <i class="fa-solid fa-circle-exclamation  text-[24px]"></i>
            </button>

            <button class="bg-slate-200 p-3 rounded-lg hover:bg-[#18181B] hover:text-white transition duration-300">
                <i class="fa-solid fa-volume-low text-[24px]"></i>
            </button>
        </div>
    `;

    wordContainer.appendChild(wordDiv);
  });
  manageSpinner(false);
};

getLevels();
