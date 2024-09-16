const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLElement;

// Output sections
const nameOutput = document.getElementById('name-output') as HTMLSpanElement;
const emailOutput = document.getElementById('email-output') as HTMLSpanElement;
const phoneOutput = document.getElementById('phone-output') as HTMLSpanElement;
const profilePicOutput = document.getElementById('profile-pic-output') as HTMLImageElement;

// Dynamic sections
const educationList = document.getElementById('education-list') as HTMLUListElement;
const workExperienceList = document.getElementById('work-experience-list') as HTMLUListElement;
const skillsList = document.getElementById('skills-list') as HTMLUListElement;

// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Personal Information
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const profilePic = (document.getElementById('profile-pic') as HTMLInputElement).files?.[0];

    // Generate the resume content dynamically
    nameOutput.innerHTML = name;
    emailOutput.innerHTML = email;
    phoneOutput.innerHTML = phone;

    // Display the profile picture
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicOutput.src = e.target?.result as string;
        };
        reader.readAsDataURL(profilePic);
    }

    // Education
    educationList.innerHTML = '';
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    education.split(/\r?\n|,/).forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        educationList.appendChild(li);
    });

    // Work Experience
    workExperienceList.innerHTML = '';
    const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
    workExperience.split(/\r?\n|,/).forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        workExperienceList.appendChild(li);
    });

    // Skills
    skillsList.innerHTML = '';
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    skills.split(/\r?\n|,/).forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        skillsList.appendChild(li);
    });

    // Show the resume
    resumeOutput.style.display = 'block';
});

// Add editing functionality
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const section = (event.target as HTMLButtonElement).dataset.section;

        if (section === "education" || section === "work-experience" || section === "skills") {
            const listElement = document.getElementById(`${section}-list`) as HTMLUListElement;
            const listItems = listElement.getElementsByTagName('li');

            if (button.textContent === 'Edit') {
                // Convert list items to editable
                for (let i = 0; i < listItems.length; i++) {
                    listItems[i].setAttribute('contentEditable', 'true');
                    listItems[i].focus();
                }
                button.textContent = 'Save';
            } else {
                // Save changes and disable contentEditable
                for (let i = 0; i < listItems.length; i++) {
                    listItems[i].setAttribute('contentEditable', 'false');
                }
                button.textContent = 'Edit';
            }
        } else {
            const sectionSpan = document.getElementById(`${section}-output`) as HTMLElement;

            if (sectionSpan.contentEditable === "true") {
                // Save edits and disable contentEditable
                sectionSpan.contentEditable = "false";
                (event.target as HTMLButtonElement).textContent = 'Edit';
            } else {
                // Enable editing
                sectionSpan.contentEditable = "true";
                sectionSpan.focus(); // Focus the section for editing
                (event.target as HTMLButtonElement).textContent = 'Save';
            }
        }
    });
});