// Form Validation and Email Sending
function validateEnrollmentForm() {
    let name = document.getElementById("name");
    let dob = document.getElementById("dob");
    let fatherName = document.getElementById("fatherName");
    let schoolName = document.getElementById("Schoolname");
    let subjectName = document.getElementById("SubjectName");
    let location = document.getElementById("location");
    let classSelect = document.getElementById("class");
    let sendBtn = document.querySelector("button[type='submit']");

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (
            name.value === "" || 
            dob.value === "" || 
            fatherName.value === "" || 
            schoolName.value === "" || 
            subjectName.value === "" || 
            location.value === "" || 
            classSelect.value === ""
        ) {
            showErrorAlert();
        } else {
            sendMail(name.value, fatherName.value, schoolName.value, subjectName.value, location.value, classSelect.value);
            showSuccessAlert();
        }
    });
}

function sendMail(name, fatherName, schoolName, subjectName, location, classSelect) {
    emailjs.send("service_2zls3oq", "template_2sdk2rf", {
        name: name,
        father_name: fatherName,
        school_name: schoolName,
        subject_name: subjectName,
        location: location,
        class: classSelect
    });
}

function showErrorAlert() {
    swal({
        title: "Incomplete Form",
        text: "Please fill out all fields before submitting.",
        icon: "error",
    });
}

function showSuccessAlert() {
    swal({
        title: "Form Submitted Successfully",
        text: "Thank you for enrolling! We'll get back to you shortly.",
        icon: "success",
    });
}

validateEnrollmentForm();
