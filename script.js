

const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const ageInput = document.getElementById('age');
const dobInput = document.getElementById('dob');
const salaryInput=document.getElementById('salary')

const form = document.getElementById('form');
const list = document.querySelector('.emp-list'); 


const URL = "http://localhost:3000/api/user";


function displayData(data) {
    console.log();
    const elements = data.map((employee) => {
        const { firstname, lastname, age, dateOfBirth,salary } = employee;

        return (
            `
          <div class="list">
            <p class="Fname">${firstname}</p>
            <p class="Lname">${lastname}</p>
            <p class="dob">${dateOfBirth.substring(0,10)}</p>
            <p class="age">${age}</p>
            <p class="salary">${salary}</p>
        </div>        `
        )
    })
    list.innerHTML = elements.join("");
}

async function getAllEmployee() {
    try {
        const result = await axios.get(URL, {
            withCredentials: true,
        });
        console.log(result.data);
        // return result.data;
        displayData(result.data.data);
    } catch (err) {
        console.log(err.message);
        // return err.message;
    }
}
async function postEmployee({ firstname, lastname, age, dob,salary }) {
    try {
        const result = await axios.post(URL, {
            firstname,
            lastname,
            age,
            dateofbirth:dob,
            salary
        }, {
            withCredentials: true
        });
        getAllEmployee();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
     
}

function handleSubmit(e) {
    e.preventDefault();
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const age = ageInput.value;
    const dob = dobInput.value;
    const salary=salaryInput.value;
    console.log({
        firstname,
        lastname,
        age,
        dob,
        salary,
    })
    firstnameInput.value = "";
    lastnameInput.value = "";
    ageInput.value = "";
    dobInput.value = "";
    salaryInput.value="";

    postEmployee({firstname,lastname,age,dob,salary})
}


window.addEventListener("load", () => {
    getAllEmployee();
})
form.addEventListener('submit', handleSubmit);