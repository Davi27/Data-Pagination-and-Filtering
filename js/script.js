// Get elements from the DOM
let studentList = document.querySelector('.student-list');
let btnList = document.querySelector('.link-list');
let header = document.querySelector('.header');



/********************* EXCEEDS EXPECTATIONS *****************/

// Create search area
header.innerHTML += `
                     <label for="search" class="student-search">
                        <span>Search by name</span>
                        <input id="search" placeholder="Search by name...">
                        <button type="button" id="search-btn"><img src="img/icn-search.svg" alt="Search icon"></button>
                     </label>
`;

let foundArr = [];
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');

function searchName(place, text) {
   foundArr = [];
   let val = text.value.toLowerCase();
   for(let i = 0; i < place.length; i++) {
      let firName = place[i].name.first.toLowerCase();
      let lasName = place[i].name.last.toLowerCase();
      let bothNames = firName + ' ' + lasName;

      if(firName.includes(val) || lasName.includes(val) || bothNames.includes(val)) {
         foundArr.push(place[i]);
      }
   }

 //  in case there are no results
   if(foundArr.length === 0) {
      studentList.innerHTML = `<h3>No results</h3>`;
      btnList.innerHTML = '';
   } else {
      studentList.innerHTML = '';
      showPage(foundArr, 1);
      addPagination(foundArr);
   }
}


// Create event for searching names
searchBtn.addEventListener('click', e => {
   e.preventDefault();
   
   searchName(data, searchInput);

});

searchInput.addEventListener('keyup', e => {
   e.preventDefault();
   
   searchName(data, searchInput);

});


/********************* EXCEEDS EXPECTATIONS END *****************/


function showPage(list, page) {
   // Split students in fractions of 9
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;

   // Update endIndex in case the list has less than 9 students
   if(endIndex > list.length){
      let subt = parseInt(endIndex) - parseInt(list.length);
      endIndex -= subt;
   }

   //Loop for adding students in the DOM
   for(let i = startIndex; i < endIndex; i++) {
      let actualStd = list[i];
      studentList.innerHTML += `
                              <li class="student-item cf">
                                 <div class="student-details">
                                    <img class="avatar" src="${actualStd.picture.medium}" alt="Profile Picture">
                                    <h3>${actualStd.name.first} ${actualStd.name.last}</h3>
                                    <span class="email">${actualStd.email}</span>
                                 </div>
                                 <div class="joined-details">
                                    <span class="date">Joined ${actualStd.registered.date}</span>
                                 </div>
                              </li>
                              `;

   }
}



function addPagination(list) {
   btnList.innerHTML = '';
   let totalButtons = Math.ceil(list.length / 9);
   if(list.length >= 10) {
      //Loop for creating and adding the buttons to the DOM
      for(let i = 0; i < totalButtons; i++) {
         btnList.innerHTML += `
                              <li>
                                 <button type="button" class='pagin'>${i + 1}</button>
                              </li>
                              `;
      }
      //Give the class active for the first button
      btnList.firstElementChild.firstElementChild.classList.add('active');

   } else {
      // Don't create buttons for just one page
      btnList.innerHTML = '';
   }
}

btnList.addEventListener('click', e => {
   if(e.target.className === 'pagin') {
      // Change the button with active class
      document.querySelector('.active').classList.remove('active');
      e.target.classList.add('active');
      // Clear the page and call the showPage with the new value
      studentList.innerHTML = '';
      if(searchInput.value.length === 0) {
         showPage(data, parseInt(e.target.innerText));
      } else {
         showPage(foundArr, parseInt(e.target.innerText));
      }
   }
})

// Call functions
showPage(data, 1);
addPagination(data);


