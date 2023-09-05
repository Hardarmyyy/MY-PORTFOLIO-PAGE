// // Create a match function
// function myFunction(x) {
//     let nav = document.body;
//     if (x.matches) {
        
//     }else {
//         nav.style.color = "white";
//     }
// }

// // // Create a MediaQueryList object
// const mmObj = window.matchMedia("(max-width: 600px)")

// // Call the match function at run time:
// myFunction(mmObj);

// // Add the match function as a listener for state changes:
// mmObj.addListener(myFunction);


// function find_max(nums) {
//         let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers
//         for (let num of nums) {
//         if (num > max_num) {
//             max_num = num;  
//         }
//     }
//     console.log(max_num)
//     return max_num;
// }

// find_max([3,5,8,1,2,8])


/* Open when someone clicks on the menu icon */
const menuIcon = document.querySelector('.menu-icon');

menuIcon.addEventListener('click', () => {
    document.getElementById("myNav").style.width = "100%";
    menuIcon.style.display = "none";
})


/* Close when someone clicks on button or link tag inside the overlay */

window.addEventListener('click', (e) => {
    const closeBtn = document.querySelector(`a[class="${e.target.className}"]`)
    const closeIcon = document.querySelector(`i[class="${e.target.className}"]`)

    if (closeBtn || closeIcon) {
        document.getElementById("myNav").style.width = "0%";
        menuIcon.style.display = "block";
    }
})


// contact form submission

// define an object constructor for the contact information;
class Contact {
    constructor (name, email, subject, messageBody) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.messageBody = messageBody;
    }
}

// check and validate the form fields;
let clientName = document.getElementById("name");
let clientEmail = document.getElementById("email");
let subject = document.getElementById("subject");
let messageBody = document.getElementById("message");

let emptyName = document.getElementById("emptyName")
let emptyEmail = document.getElementById("emptyEmail")
let emptySubject = document.getElementById("emptySubject")
let emptyTextarea = document.getElementById("emptyTextarea")

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

clientName.addEventListener("input", () => {
    if (clientName.value === '') {
        emptyName.innerText = "Kindly enter your name in the field above"
    }
    else {
        emptyName.innerText = '';
    }
})

clientEmail.addEventListener("input", () => {
    if (clientEmail.value === '') {
        emptyEmail.innerText = "Please enter your email in the field above"
    }
    else if (!(emailRegex.test(clientEmail.value))) {
        emptyEmail.innerText = "Please enter a valid email in the field above"
    }
    else {
        emptyEmail.innerText = '';
    }
})

subject.addEventListener("input", () => {
    if (subject.value === '') {
        emptySubject.innerText = "please enter a subject in the field above"
    }
    else {
        emptySubject.innerText = '';
    }
})

messageBody.addEventListener("input", () => {
    if (messageBody.value === '') {
        emptyTextarea.innerText = "Kindly enter your message in the field above"
    }
    else {
        emptyTextarea.innerText = '';
    }
})


// submit the form;
var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    let status = document.getElementById("my-form-status");

    let data = new FormData(event.target);

    fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(response => {
        console.log(response)
    if (response.ok && clientName.value && clientEmail.value && subject.value && messageBody.value) {
        status.innerHTML = "Thanks for your submission!";
        form.reset()
        setTimeout(() => {
            status.innerHTML = ''
        }, 4000)
    } 
    // else if (response.ok && !clientName.value) {
    //     emptyName.innerText = "Kindly enter your name in the field above"
    // } 
    // else if (response.ok && !clientEmail.value) {
    //     emptyEmail.innerText = "Please enter a valid email in the field above"
    // } 
    // else if (response.ok && !subject.value) {
    //     emptySubject.innerText = "please enter a subject in the field above"
    // }
    // else if (response.ok && !messageBody.value) {
    //     emptyTextarea.innerText = "Kindly enter your message in the field above"
    // }
    else {
        response.json().then(data => {
            console.log(data)
        if (Object.hasOwn(data, 'errors')) {
            emptyName.innerText = "Kindly enter your name in the field above"
            emptyEmail.innerText = "Please enter a valid email in the field above"
            emptySubject.innerText = "please enter a subject in the field above"
            emptyTextarea.innerText = "Kindly enter your message in the field above"
        } 
        // else {
        //     status.innerHTML = "Sorry! All fields are required"
        //     status.style.color = "#FF4A57"
        // }
        })
    }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
        status.style.color = "#FF4A57"
        setTimeout(() => {
            status.innerHTML = ''
        }, 4000)
    });
}
form.addEventListener("submit", handleSubmit)

