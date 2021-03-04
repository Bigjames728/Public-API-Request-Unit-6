
//Global variables 
const gallery = document.querySelector('.gallery');
const card = document.querySelector('.card');
let peopleNames = [];


//The fetchData function serves as a template for fetching data from an API (or url), parsing the data to JSON, then passing that JSON to the next 3 functions (generatePersonOnPage, generateModal, and addClickHandler).
// const parseResponseToJson = ;
const generatePersonOnPage = (data) => generatePerson(data);
const parseResponseToJson = (res) => res.json();



function fetchData(url) {
    return fetch(url)
            .then(parseResponseToJson)
            .then( data => {
                generatePersonOnPage(data);
                generateModal(data);
                addClickHandler(data);
            })
}


//Below I've called my fetchData function and added the API as an argument.
fetchData('https://randomuser.me/api/?results=12&inc=name,gender,location,email,picture,cell,dob,nat&nat=au,br,ca,us')

//Search functionality below. I selected the search-container div and assigned it to the variable searchDiv. I then inserted the proper HTML into the search-div using insertAdjacentHTML with beforeend.
const searchDiv = document.querySelector('.search-container');
searchDiv.insertAdjacentHTML('beforeend', `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
`);

const searchBtn = document.querySelector('#search-submit');
const searchInput = document.querySelector('#search-input');


searchBtn.addEventListener('click', (e) => {
    e.preventDefault;
    card.forEach((card) => {
        console.log(card);
        
        
        // if (card.name.tooLowerCase().includes(searchInput.value)) {
        //     style.display = 'block';
        // } else {
        //     style.display = 'none';
        // }
    })
    
})




//The generatePerson function pulls everyone's data from the API (I specified 12 in the API itself) and runs a forEach loop to add each of the 12 peoples info to the card that is then added to the gallery. This shows
//the 12 employees on the web page.
function generatePerson(data) {
    
    let html = '';
    data.results.forEach((emp) =>
        html += `
        <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${emp.picture.large}" alt="profile picture">
                </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${emp.name.first} ${emp.name.last}</h3>
                <p class="card-text">${emp.email}</p>
                <p class="card-text cap">${emp.location.city}, ${emp.location.state}</p>
            </div>
        </div>
        `);
    gallery.insertAdjacentHTML('beforeend', html);
};

//The below function generates the initial modal with the elements of it that will always remain the same, like the modal-container div, modal div, and the close button. It then inserts the modal window into the gallery for viewing. 
function generateModal() {
    let modal = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                </div>       
            </div>
        </div>
        `;
    gallery.insertAdjacentHTML('afterend', modal)
    document.querySelector(".modal-container").style.display = "none"; 

    document.getElementById('modal-close-btn').addEventListener('click', (e) => {
        document.querySelector(".modal-container").style.display = "none";
    })
}

function updateModal(emp) {
    //The below code is to get the DOB data and structure it like mm/dd/yyyy on the modal
    const date = new Date (`${emp.dob.date}`);
    const month = date.getMonth() + 1,
            day = date.getDate(),
            year = date.getFullYear();
    const mmddyy = `${month}/${day}/${year}`;
    //The below code selects the modal-info-container and sets the innerHTML to empty. Then, I set the innerHTML to the employee that is clicked.
    let modalInfo = document.querySelector('.modal-info-container');
    modalInfo.innerHTML = '';
    modalInfo.innerHTML = `
        <img class="modal-img" src="${emp.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${emp.name.first} ${emp.name.last}</h3>
            <p class="modal-text">${emp.email}</p>
            <p class="modal-text cap">${emp.location.city}</p>
            <hr>
            <p class="modal-text">${emp.cell}</p>
            <p class="modal-text">${emp.location.street.number} ${emp.location.street.name}, ${emp.location.city}, ${emp.location.state} ${emp.location.postcode}</p>
            <p class="modal-text">Birthday: ${mmddyy}</p>
        `;
}

//The below function adds a click handler to each card in the gallery to make a modal window pop up on click and updates the modal window with the currently clicked employees info.
function addClickHandler(myData) {
    document.querySelectorAll('.card').forEach((card, i) => {
        card.addEventListener('click', () => {
            document.querySelector(".modal-container").style.display = "block";
            updateModal(myData.results[i]);
        })
    })
}


