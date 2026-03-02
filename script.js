const getLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonsButtons = document.querySelectorAll(".lesson-btn");
  lessonsButtons.forEach((btn) => {
    btn.classList.remove("bg-blue-800", "text-white");
  });
};
const getLevelWords = (id) => {
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
    return;
  }
  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.classList =
      "word-card bg-white py-20 px-5 md:w-[480px] w-full h-[372px] space-y-4";

    wordDiv.innerHTML = `
        <h2 class="text-black text-[32px] font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="text-[20px] font-medium">Meaning / Pronounciation</p>
        <h2 class="font-bangla font-semibold text-[#18181B] text-[32px]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${
          word.pronunciation
        }"
        </h2>
        <div class="flex justify-between items-center px-6 mt-10 >
            <button class="bg-slate-200 p-3 rounded-lg hover:bg-[#18181B] hover:text-white transition duration-300">
                <i class="fa-solid fa-circle-exclamation  text-[24px]"></i>
            </button>

            <button class="bg-slate-200 p-3 rounded-lg hover:bg-[#18181B] hover:text-white transition duration-300">
                <i class="fa-solid fa-volume-low text-[24px]"></i>
            </button>
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
     <button id="active-btn-${lesson.level_no}" onclick = "getLevelWords(${lesson.level_no})" class="inline-block text-[#422AD5] border-1 font-semibold px-4 py-2 cursor-pointer hover:bg-blue-800 hover:text-white transition duration-300 rounded-lg lesson-btn">
       <i class="fa-solid fa-book"></i>
        <span class="ml-2">Level - ${lesson.level_no}</span>
     </button
                >
    `;
    levelContainer.appendChild(divBtn);
  }
};
getLessons();
