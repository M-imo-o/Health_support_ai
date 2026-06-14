// ==========================
// PATIENT SUPPORT FORM
// ==========================

const patientForm = document.getElementById("patientForm");

if(patientForm){

patientForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    patientForm.querySelector('input[type="text"]').value;

    const symptoms =
    patientForm.querySelectorAll("textarea")[0].value;

    let summary = `
Patient Summary

Name: ${name}

Symptoms:
${symptoms}

Priority:
Volunteer Review Required
`;

    alert(summary);

});
}

// ==========================
// VOLUNTEER FORM
// ==========================

const volunteerForm =
document.getElementById("volunteerForm");

if(volunteerForm){

volunteerForm.addEventListener("submit", function(e){

    e.preventDefault();

    alert(
      "Thank you for registering as a volunteer!"
    );

});
}

// ==========================
// AI CHATBOT
// ==========================

const sendBtn =
document.getElementById("sendBtn");

const questionInput =
document.getElementById("questionInput");

const responseArea =
document.getElementById("responseArea");

if(sendBtn){

sendBtn.addEventListener("click", function(){

    const question =
    questionInput.value.toLowerCase();

    let response =
    "Sorry, I don't have an answer for that question.";

    if(question.includes("fever")){

        response =
        "Stay hydrated, rest well and consult a doctor if symptoms persist.";

    }

    else if(question.includes("headache")){

        response =
        "Drink water, rest and avoid prolonged screen exposure.";

    }

    else if(question.includes("cold")){

        response =
        "Keep yourself warm, stay hydrated and monitor symptoms.";

    }

    else if(question.includes("volunteer")){

        response =
        "You can register using the volunteer form available on this page.";

    }

    responseArea.innerHTML = `
    <div class="bot-msg">
        ${response}
    </div>
    `;

    questionInput.value = "";

});

}