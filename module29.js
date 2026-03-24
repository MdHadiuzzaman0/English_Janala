
      function pronounceWord(word) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-EN"; // English
        window.speechSynthesis.speak(utterance);
      }

      function level() {
        fetch("https://openapi.programming-hero.com/api/levels/all")
          .then((response) => response.json())
          .then((result) => {
            // console.log(result);

            const levelcontainer = document.getElementById("levelcontainer");

            // levelconatiner.innerHTML="";

            //   result.data.forEach(element => {
            //     console.log(element.level_no);
            //     const div=document.createElement("div");
            //     div.innerHTML=`
            //     <button onclick="levelData(${element.level_no})" class="btn btn-outline btn-info border-[#422AD5] text-[#422AD5] mt-8 hover:text-white"><i class="fa-brands fa-leanpub"></i>Lesson ${element.level_no}</button>`;

            //     // const btn=div.querySelector('button');
            //     // btn.addEventListener("click", function(){
            //     // console.log(`${element.level_no}`)});

            //     levelcontainer.append(div);
            //   });

            // })

            result.data.forEach((element) => {
              const btn = document.createElement("button");
              btn.className =
                "btn btn-outline lesson-btn border-[#422AD5] text-[#422AD5] mt-8 ";
              btn.innerHTML = `<i class="fa-brands fa-leanpub"></i> Lesson ${element.level_no}`;

              // সরাসরি এখানে ক্লিক ইভেন্ট যোগ করা
              btn.addEventListener("click", function () {
                // ১. চেক করা হচ্ছে এই বাটনে কি আগে থেকেই লাল রঙ আছে?
                const isActive = btn.classList.contains("bg-[#422AD5]");

                // ২. প্রথমে সব বাটন থেকে লাল রঙ সরিয়ে দেওয়া (রিসেট)
                document.querySelectorAll("#levelcontainer .lesson-btn").forEach((allBtn) => {
                  allBtn.classList.remove("bg-[#422AD5]", "text-white");
                });

                // ৩. টগল লজিক: যদি আগে লাল না থাকে, তবে এখন লাল করো
                if (!isActive) {
                  btn.classList.add("bg-[#422AD5]", "text-white");
                }
                // else{
                //   btn.classList.remove('bg-red-600', 'text-white');
                // }
                // যদি আগে লাল থাকতো, তবে রিসেট লুপ সেটি মুছে ফেলেছে,
                // তাই আলাদা করে else{ remove } লেখার প্রয়োজন পড়ে না।

                // ৩. ডেটা লোড করার ফাংশন কল করা
                levelData(element.level_no);
              });

              levelcontainer.append(btn);
            });
          });
      }

      level();

      let currentLevel = null;
      function levelData(levelNo) {
        // console.log("Clicked Lesson", levelNo);

        // if (currentLevel == levelNo) {
        //   cardInfo.innerHTML = `<section class=" bg-[#F8F8F8] w-11/12 mx-auto text-center py-20 rounded-xl mt-5 space-y-4 grid col-span-3">
        // <p class="font-bangla text-[#79716B] text-[14px]">আপনি এখনো কোন Lesson Select করেন ন</p>
        // <p class="font-bangla text-[#292524] text-3xl">একটি Lesson Select করুন।</p>
        //     </section>`;
        //   currentLevel = null;
        //   return;
        // }

         if (currentLevel == levelNo) {
          cardInfo.innerHTML = `<section class=" bg-[#F8F8F8] w-11/12 mx-auto text-center py-20 rounded-xl mt-5 space-y-4 grid col-span-3">
            <h3 class="text-3xl text-center font-bold">
            <span class="text-[#00BCFF]">You were on Lesson-0${levelNo} card
            </h3>
          </section>`;
          currentLevel = null;
          return;
        }
        currentLevel = levelNo;

        fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`)
          // console.log(`https://openapi.programming-hero.com/api/level/${levelNo}`);
          .then((levelDataResponse) => levelDataResponse.json())
          .then((levelDataResult) => {
            const cardInfo = document.getElementById("cardInfo");
            cardInfo.innerHTML = " ";
            
            const cardInfoSection = document.getElementById("cardInfoSection");
            

            if (levelDataResult.data.length == 0) {
              cardInfo.innerHTML = `
            <section  class="bg-[#F8F8F8] w-11/12 mx-auto text-center py-15 rounded-xl mt-5 space-y-y grid col-span-3">

            <img src="./assets/alert-error.png" alt="" class="block mx-auto">
            <!-- block: ইমেজটিকে পুরো লাইনের জায়গা দখল করতে বাধ্য করে।
            mx-auto: বাম এবং ডান পাশের মার্জিন সমান করে দেয়, ফলে ইমেজটি মাঝখানে চলে আসে। -->
      
            <p class="font-bangla text-[#79716B] tetx-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="font-bangla text-[#292524] text-3xl">নেক্সট Lesson এ যান</p>
            </section>`;
              return;
            }

            levelDataResult.data.forEach((cardElement) => {
              // console.log(cardElement);

              // cardInfoSection.classList.add(
              //   "mt-8",
              //   "w-11/12",
              //   "mx-auto",
              //   "rounded-xl",
              //   "bg-[#F8F8F8]",
              // );
              

              const cardDiv = document.createElement("div");

              cardDiv.innerHTML = `
              
              <div class="space-y-3 text-center w-[447px] bg-white py-8 rounded-lg border-[#18181B]/20 border h-full flex flex-col justify-between">
              <h1 class="font-bold text-3xl">${cardElement.word ? cardElement.word : "word খুঁজে পাওয়া যায়নি"}</h1>
              <h3 class="font-medium text-[20px]">Meaning /Pronounciation</h3>
              <p class="text-[#18181B] font-semibold text-3xl font-bangla">"${cardElement.meaning ? cardElement.meaning : "অর্থ খুঁজে পাইনি"}/${cardElement.pronunciation ? cardElement.pronunciation : "pronunciation খুঁজে পাইনি"}"</p>
              <div class="flex justify-evenly gap-[232px] items-center mt-7">
                 <img onclick="loadWordDetails(${cardElement.id})" src="./assets/Group 10.png" alt="" class="hover:bg-blue-300 rounded-xl">
                 <img onclick="pronounceWord('${cardElement.word}')"  src="./assets/Group 7.png" alt="" class="hover:bg-blue-300 rounded-xl">
              
              </div>`;

              cardInfo.append(cardDiv);
            });
          });
      }

      // let currentLevel = null;
      // function levelData(levelNo) {
      //   // console.log("Clicked Lesson", levelNo);

      //   if (currentLevel == levelNo) {
      //     cardInfo.innerHTML = ``;  // ai portion ta change korci, be alert! aita korte hoile html p-6 delete korte hobe
      
      //     cardInfo.classList.remove('p-6');
      //     cardInfo.classList.add('p-0');
      //     currentLevel = null;
      //     return;
      //   }
      //   currentLevel = levelNo;

      //   fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`)
      //     // console.log(`https://openapi.programming-hero.com/api/level/${levelNo}`);
      //     .then((levelDataResponse) => levelDataResponse.json())
      //     .then((levelDataResult) => {
      //       const cardInfo = document.getElementById("cardInfo");
      //       cardInfo.innerHTML = " ";
            
      //       const cardInfoSection = document.getElementById("cardInfoSection");
            

      //       if (levelDataResult.data.length == 0) {
      //         cardInfo.innerHTML = `
      //       <section  class="bg-[#F8F8F8] w-11/12 mx-auto text-center py-15 rounded-xl mt-5 space-y-y grid col-span-3">

      //       <img src="./assets/alert-error.png" alt="" class="block mx-auto">
      //       <!-- block: ইমেজটিকে পুরো লাইনের জায়গা দখল করতে বাধ্য করে।
      //       mx-auto: বাম এবং ডান পাশের মার্জিন সমান করে দেয়, ফলে ইমেজটি মাঝখানে চলে আসে। -->
      
      //       <p class="font-bangla text-[#79716B] tetx-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      //       <p class="font-bangla text-[#292524] text-3xl">নেক্সট Lesson এ যান</p>
      //       </section>`;
      //         return;
      //       }

      //       levelDataResult.data.forEach((cardElement) => {
      //         // console.log(cardElement);

      //         cardInfoSection.classList.add(
      //           "mt-8",
      //           "w-11/12",
      //           "mx-auto",
      //           "rounded-xl",
      //           "bg-[#F8F8F8]",
      //         );
              

      //         const cardDiv = document.createElement("div");

      //         cardInfo.classList.remove('p-0');
      //         cardInfo.classList.add('p-6')
      //         cardDiv.innerHTML = `
              
      //         <div class="space-y-3 text-center w-[447px] bg-white py-8 rounded-lg border-[#18181B]/20 border h-full flex flex-col justify-between">
      //         <h1 class="font-bold text-3xl">${cardElement.word ? cardElement.word : "word খুঁজে পাওয়া যায়নি"}</h1>
      //         <h3 class="font-medium text-[20px]">Meaning /Pronounciation</h3>
      //         <p class="text-[#18181B] font-semibold text-3xl font-bangla">"${cardElement.meaning ? cardElement.meaning : "অর্থ খুঁজে পাইনি"}/${cardElement.pronunciation ? cardElement.pronunciation : "pronunciation খুঁজে পাইনি"}"</p>
      //         <div class="flex justify-evenly gap-[232px] items-center mt-7">
      //            <img onclick="loadWordDetails(${cardElement.id})" src="./assets/Group 10.png" alt="" class="hover:bg-blue-300 rounded-xl">
      //            <img onclick="pronounceWord('${cardElement.word}')"  src="./assets/Group 7.png" alt="" class="hover:bg-blue-300 rounded-xl">
              
      //         </div>`;

      //         cardInfo.append(cardDiv);
      //       });
      //     });
      // }

      function loadWordDetails(id) {

        function createElements(array) {
          const synonyms = array.map(synonymsItem => `<h3 class="bg-[#D7E4EF] p-3 rounded-lg">${synonymsItem}</h3>`);
          return synonyms.join(" ");
        }

        const url = `https://openapi.programming-hero.com/api/word/${id}`;
        // console.log(url)
        fetch(url)
          .then((loadDataResponse) => loadDataResponse.json())
          .then((loadDataResult) => {

            // console.log(loadDataResult.data);
            const detailsBox = document.getElementById("details-container");

            detailsBox.innerHTML = `<div class="w-[735px] p-6 border rounded-2xl space-y-3">
          <h1 class="font-bold text-3xl">${loadDataResult.data.word} (<i class="fa-solid fa-microphone-lines"></i>: ${loadDataResult.data.pronunciation} )</h1>
          <h3 class="text-[24px] font-semibold mt-8">Meaning</h3>
          <h3 class="text-[24px] font-semibold font-bangla">${loadDataResult.data.meaning} </h3>
          <h3 class="text-[24px] font-semibold mt-8">Example</h3>
          <h3 class="text-[24px]">${loadDataResult.data.sentence} </h3>
          <h3 class="text-[24px] font-semibold font-bangla mt-8">সমার্থক শব্দ গুলো</h3>
          <div class="text-[20px] flex gap-2">
            ${createElements(loadDataResult.data.synonyms)}
          </div>
    
          <button class="btn bg-[#422AD5] text-white rounded-xl mt-8 p-7">Complete Learning</button>

          </div>`;

            document.getElementById("word_modal").showModal();
          });
      }

      

      function displaySearchResults(filteredWordArray) {
        const cardInfo = document.getElementById("cardInfo");
        const cardInfoSection = document.getElementById("cardInfoSection");

        cardInfo.innerHTML = ""; // আগের সব কার্ড মুছে ফেলবে

        if (filteredWordArray.length === 0) {
          cardInfo.innerHTML = `<h2 class="text-2xl text-center col-span-3 py-10 font-bold bg-[#F8F8F8]">No Card Found!</h2>`;
          return;
        }

        cardInfoSection.classList.add(
          "mt-8",
          "w-11/12",
          "mx-auto",
          "rounded-xl",
          "bg-[#F8F8F8]",
        );

        filteredWordArray.forEach((cardElement) => {
          const cardDiv = document.createElement("div");
          cardDiv.innerHTML = `
      <div class="space-y-3 text-center w-[447px] bg-white py-8 rounded-lg border-[#18181B]/20 border h-full flex flex-col justify-between">
        <h1 class="font-bold text-3xl">${cardElement.word}</h1>
        <h3 class="font-medium text-[20px]">Meaning / Pronunciation</h3>
        <p class="text-[#18181B] font-semibold text-3xl font-bangla">"${cardElement.meaning}/${cardElement.pronunciation}"</p>
        <div class="flex justify-evenly gap-[232px] items-center mt-7">
           <img onclick="loadWordDetails(${cardElement.id})" src="./assets/Group 10.png" alt="" class="hover:bg-blue-300 rounded-xl cursor-pointer">

           <img onclick="pronounceWord('${
             cardElement.word
           }')" src="./assets/Group 7.png" alt="" class="hover:bg-blue-300 rounded-xl cursor-pointer">
        </div>
      </div>`;
          cardInfo.append(cardDiv);
        });
      }

      document
        .getElementById("btn-search")
        .addEventListener("click", function () {
          const input = document.getElementById("input-search");
          const searchValue = input.value.trim().toLowerCase();

          if (searchValue === "") {
          alert("দয়া করে কিছু একটা লিখে সার্চ করুন!");
          return; 
          }

          fetch("https://openapi.programming-hero.com/api/words/all")
            .then((response) => response.json())
            .then((json) => {
              const allWord= json.data;
              const filteredWord= allWord.filter((item) =>
                item.word.toLowerCase().includes(searchValue),
              );
              displaySearchResults(filteredWord);

              document.querySelectorAll(".lesson-btn").forEach((allBtn) => {
                allBtn.classList.remove("bg-[#422AD5]", "text-white");
              });
              currentLevel = null;
            });
        });




          