var form = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
// Output sections
var nameOutput = document.getElementById('name-output');
var emailOutput = document.getElementById('email-output');
var phoneOutput = document.getElementById('phone-output');
var profilePicOutput = document.getElementById('profile-pic-output');
// Dynamic sections
var educationList = document.getElementById('education-list');
var workExperienceList = document.getElementById('work-experience-list');
var skillsList = document.getElementById('skills-list');
// Handle form submission
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Personal Information
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var profilePic = (_a = document.getElementById('profile-pic').files) === null || _a === void 0 ? void 0 : _a[0];
    // Generate the resume content dynamically
    nameOutput.innerHTML = name;
    emailOutput.innerHTML = email;
    phoneOutput.innerHTML = phone;
    // Display the profile picture
    if (profilePic) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePicOutput.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(profilePic);
    }
    // Education
    educationList.innerHTML = '';
    var education = document.getElementById('education').value;
    education.split(/\r?\n|,/).forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item.trim();
        educationList.appendChild(li);
    });
    // Work Experience
    workExperienceList.innerHTML = '';
    var workExperience = document.getElementById('work-experience').value;
    workExperience.split(/\r?\n|,/).forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item.trim();
        workExperienceList.appendChild(li);
    });
    // Skills
    skillsList.innerHTML = '';
    var skills = document.getElementById('skills').value;
    skills.split(/\r?\n|,/).forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item.trim();
        skillsList.appendChild(li);
    });
    // Show the resume
    resumeOutput.style.display = 'block';
});
// Add editing functionality
document.querySelectorAll('.edit-btn').forEach(function (button) {
    button.addEventListener('click', function (event) {
        var section = event.target.dataset.section;
        if (section === "education" || section === "work-experience" || section === "skills") {
            var listElement = document.getElementById("".concat(section, "-list"));
            var listItems = listElement.getElementsByTagName('li');
            if (button.textContent === 'Edit') {
                // Convert list items to editable
                for (var i = 0; i < listItems.length; i++) {
                    listItems[i].setAttribute('contentEditable', 'true');
                    listItems[i].focus();
                }
                button.textContent = 'Save';
            }
            else {
                // Save changes and disable contentEditable
                for (var i = 0; i < listItems.length; i++) {
                    listItems[i].setAttribute('contentEditable', 'false');
                }
                button.textContent = 'Edit';
            }
        }
        else {
            var sectionSpan = document.getElementById("".concat(section, "-output"));
            if (sectionSpan.contentEditable === "true") {
                // Save edits and disable contentEditable
                sectionSpan.contentEditable = "false";
                event.target.textContent = 'Edit';
            }
            else {
                // Enable editing
                sectionSpan.contentEditable = "true";
                sectionSpan.focus(); // Focus the section for editing
                event.target.textContent = 'Save';
            }
        }
    });
});
