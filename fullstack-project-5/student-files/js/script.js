urlAPI = 'https://randomuser.me/api/?results=12';
const galleryDiv = document.getElementById('gallery');
let apiInfo = [];
const body = document.querySelector('body');
const employeeCard = document.querySelectorAll('.card');
const modalContainer = document.querySelector('.modal-container');

//gets 12 employees information
function getJson() {
fetch(urlAPI)
.then(response => response.json())
.then(response => response.results)
.then(createEmployeeHtml)
.catch(err => console.log(err))
}

//creates html info for each employee
function createEmployeeHtml(employeeData) {
    employees = employeeData;
    employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class='card' data-index='${index}'>
        <div class='card-img-container'>
        <img class='card-img' src='${picture.large}' alt='profile-picture'>
        </div>
        <div class='card-info-container'>
        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}</p>
        </div>
        </div>
        `   
    });
    galleryDiv.innerHTML = employeeHTML;
}

//event listener for click

galleryDiv.addEventListener('click', e => {
    if (e.target !== galleryDiv) {
        let card = e.target.closest('.card');
        index = card.getAttribute('data-index');
        displayModal(index);  
    }
});


//display modal function
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    
    let date = new Date(dob.date);

    const modalHTML = `
    <div class="modal-container">
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>'
    <div class="modal-info-container">
    <img class="modal-img" src="${picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
    <p class="modal-text">${email}</p>
    <p class="modal-text cap">${city}</p>
    <hr>
    <p class="modal-text">${phone}</p>
    <p class="modal-text">${street.name} ${street.number}, ${state} ${postcode}</p>
    <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    </div>
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    `;
    
    console.log(modalHTML);
    body.insertAdjacentHTML('beforeend', modalHTML);
    body.style.display = 'block';

    const getModal = document.querySelector('.modal-container');
    const getCloseButton = document.getElementById('modal-close-btn');

    getCloseButton.addEventListener('click', (e) => {
      const strong = document.querySelector('strong');
  
      if (e.target == getCloseButton || strong) {
        getModal.remove();
      } 
    });
};

getJson();