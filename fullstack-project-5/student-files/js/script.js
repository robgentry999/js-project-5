urlAPI = 'https://randomuser.me/api/?results=12';
const galleryDiv = document.getElementById('gallery');
let apiInfo = [];

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
    console.log(employeeHTML);
    galleryDiv.innerHTML = employeeHTML;
}


getJson();