// Category selection UX
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", (event) => {
    // Get all the radio inputs
    let options = document.querySelectorAll(
        '.standard-option input[type="radio"]'
    );

    // Add a click event listener to each radio input
    options.forEach((option) => {
        option.addEventListener("click", (e) => {
            // First reset all images to black and white and lowered position
            options.forEach((otherOption) => {
                let img = otherOption.nextElementSibling.querySelector(
                    ".card-img-top"
                );
                img.style.filter = "grayscale(70%)";
                img.style.transform = "translateY(30px)";
            });

            // Then color and raise the image of the selected radio
            let img = e.target.nextElementSibling.querySelector(
                ".card-img-top"
            );
            img.style.filter = "grayscale(0%)";
            img.style.transform = "translateY(0)";
        });
    });
});

//random subject line placeholder

document.addEventListener("DOMContentLoaded", (event) => {
    const prompts = [
        "struggling to implement differentiation into my mathematics lesson",
        "How could I prepare my art lessons more effectively with 1 technician available?",
        "How can I handle a professional conversation about marking workload?",
        "How can I set consistently high expectations for all students in a diverse classroom?",
        "What strategies can be used to motivate students who struggle with self-confidence?",
        "What are effective methods to challenge high-achieving students in a mixed-ability class?",
        "How can I track student progress in real-time during lessons?",
        "What techniques can help identify when a student is about to fall behind?",
        "How can peer-assessment be used to promote progress in a collaborative project?",
        "How can I stay updated with the latest developments in my subject area?",
        "What are some creative ways to integrate interdisciplinary knowledge into a subject?",
        "What role does technology play in enhancing subject knowledge for students?",
        "How can I plan lessons to accommodate unexpected disruptions?",
        "What are some time-saving tips for lesson planning without sacrificing quality?",
        "How could I prepare my art lessons more effectively with 1 technician available?",
        "What are practical approaches to differentiate instruction in a large class?",
        "How can technology be leveraged for differentiated learning paths?",
        "Struggling to implement differentiation into my mathematics lesson.",
        "How can I design assessments that give meaningful feedback to each student?",
        "What are the pros and cons of formative vs. summative assessments?",
        "How can I handle a professional conversation about marking workload?",
        "What classroom management techniques are effective without stifling creativity?",
        "How can I ensure a fair behavior policy that adapts to individual student needs?",
        "How can I turn challenging behavior into a learning opportunity for the whole class?",
        "What are some strategies for maintaining a work-life balance as a teacher?",
        "How can I foster a culture of continuous professional development among staff?",
        "What is the role of reflective practice in personal and professional growth as an educator?"
    ];

    const subjectInput = document.getElementById("id_subject");
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    subjectInput.placeholder =
        "Enter your subject line here e.g. " + randomPrompt;
});

//text placeholder disappears when user starts typing

document.addEventListener("DOMContentLoaded", (event) => {
    const contentArea = document.getElementById("id_content");
    contentArea.addEventListener(
        "focus",
        function () {
            if (this.defaultValue === this.value) {
                this.value = "";
            }
        },
        { once: true }
    ); // The event will only trigger once
});

//tags: map category to a "locked" tag

document.addEventListener("DOMContentLoaded", (event) => {
    // Object mapping radio button values to tags
    const tagsMap = {
        1: "high_expectations",
        2: "promoting_progress",
        3: "subject_knowledge",
        4: "planning",
        5: "differentiation",
        6: "assessment",
        7: "behaviour_management",
        8: "professionalism"
    };

    // Function to update the tag list
    function updateTag(selectedValue) {
        // Get the tag list and locked tag elements
        const tagList = document.querySelector(".tag-list");
        const lockedTag = document.querySelector(".tag.locked");

        // Create a new locked tag only if it doesn't exist
        if (!lockedTag) {
            const tag = document.createElement("span");
            tag.className = "tag badge badge-secondary locked"; // Include Bootstrap classes for consistent styling
            tag.textContent = tagsMap[selectedValue];
            // Add a Font Awesome lock icon to the tag
            const lockIcon = document.createElement("i");
            lockIcon.className = "fas fa-lock mr-2"; // 'mr-2' for a little space between icon and text
            tag.prepend(lockIcon); // Add the lock icon before the tag text

            // Append the new locked tag to the tag list
            tagList.appendChild(tag);
        } else {
            // Update the text and value of the existing locked tag
            lockedTag.textContent = tagsMap[selectedValue];
            const lockIcon = document.createElement("i");
            lockIcon.className = "fas fa-lock mr-2";
            lockedTag.prepend(lockIcon);
        }
    }

    // Attach event listeners to radio buttons
    const standardOptions = document.querySelectorAll(
        '.standard-option input[type="radio"]'
    );
    standardOptions.forEach((option) => {
        option.addEventListener("change", (e) => {
            updateTag(e.target.value);
        });
    });
});

//tags: standard input

let tags = [];

function addTag(e) {
    let code = e.keyCode ? e.keyCode : e.which;
    let errorElement = document.getElementById("tag-error");
    errorElement.style.display = "none"; // Hide error initially
    if (code === 13 || code === 32) {
        // Enter key or Space bar
        e.preventDefault(); // Prevent default form submission
        e.stopPropagation(); // Stop event from propagating to parent elements

        let tag = e.target.value.trim();

        //Validation: only 5 tags
        if (tags.length >= 5) {
            showError("Only 5 tags can be added.");
            tagInput.value = "";
            return;
        }

        // Validation: Check if tag is empty or already exists
        if (!tag || tag.length < 1 || tags.includes(tag)) {
            showError("Tag cannot be empty or already used");
            e.target.value = "";
            return;
        }

        // Validation: Allow only letters, numbers, hyphens, and underscores
        if (!/^[A-Za-z0-9-_]+$/.test(tag)) {
            showError(
                "Tags can only contain letters, numbers, hyphens, and underscores."
            );
            e.target.value = "";
            return;
        }

        // Optional: Check tag length, change 20 to desired max length
        if (tag.length > 20) {
            showError("Tags should not be longer than 20 characters.");
            e.target.value = "";
            return;
        }

        tags.push(tag);

        let tagItem = document.createElement("div"); 
        tagItem.classList.add("item");
        tagItem.innerHTML = `
            <span class="delete-btn" onclick="deleteTag(this, '${tag}')">
                &times;
            </span>
            <span>${tag}</span>
        `;
        document.querySelector(".tag-input .tag-list").appendChild(tagItem);
        e.target.value = "";
    }
}

function deleteTag(ref, tag) {
    let parent = ref.parentNode.parentNode;
    parent.removeChild(ref.parentNode);
    let index = tags.indexOf(tag);
    tags.splice(index, 1);
}

function showError(message) {
    let errorElement = document.getElementById("tag-error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

document.querySelector(".tag-input input").addEventListener("keyup", addTag);

// quill editor
    var quill = new Quill('#quill-editor', {
        theme: 'snow' 
    });

    // Function to update hidden textarea
    function updateContent() {
        var content = document.querySelector('#quill-content');
        content.value = JSON.stringify(quill.getContents());
    }

    // Listen for text change in the Quill editor
    quill.on('text-change', updateContent);

    document.getElementById('standards-form').addEventListener('submit', updateContent);

