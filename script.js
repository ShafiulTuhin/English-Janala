const getLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const getLevelWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data));
};

const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    console.log(word);

    const wordDiv = document.createElement("div");
    wordDiv.classList =
      "word-card bg-white py-20 px-5 md:w-[490px] w-full space-y-4";
    wordDiv.innerHTML = `
    <h2 class="text-black text-[32px] font-bold">${word.word}</h2>
          <p class="text-[20px] font-medium">Meaning / Pronounciation</p>
          <h2 class="font-bangla font-semibold text-[#18181B] text-[32px]">"${word.meaning} / ${
            word.pronunciation
          }"</h2>
          <div class="flex justify-between items-center px-6 mt-10 >
              <button class=""><i class="fa-solid fa-circle-exclamation bg-slate-100 text-[24px]"></i></button>
            <button class=""><i class="fa-solid fa-volume-low bg-slate-100 text-[24px]"></i></button>
        </div>
    `;

    wordContainer.appendChild(wordDiv);
  });
};
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    console.log(lesson);
    const divBtn = document.createElement("div");
    divBtn.innerHTML = `
     <button onclick = "getLevelWords(${lesson.level_no})" class="inline-block text-[#422AD5] border-1 font-semibold px-4 py-2 cursor-pointer hover:bg-blue-800 hover:text-white transition duration-300 rounded-lg">
       <i class="fa-solid fa-book"></i>
        <span class="ml-2">Level - ${lesson.level_no}</span>
     </button
                >
    `;
    levelContainer.appendChild(divBtn);
  }
};
getLessons();
