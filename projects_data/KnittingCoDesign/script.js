// Get form and response elements
const form = document.getElementById('customerServiceForm');
const responseMessage = document.getElementById('responseMessage');
const submitBtn = document.getElementById('submitBtn');
const fileInput = document.getElementById('file');

// Handle form submission event
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Disable the submit button to prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        question: document.getElementById('question').value,
    };

    // Prepare email parameters
    const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.question
    };

    // Check if file is uploaded
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64File = event.target.result.split(",")[1]; // Remove metadata

            // Add attachment to emailParams
            emailParams.file_attachment = base64File;
            emailParams.file_name = file.name;

            // Send email with attachment
            sendEmail(emailParams);
        };
        reader.readAsDataURL(file);  // Read file as base64
    } else {
        // Send email without attachment
        sendEmail(emailParams);
    }
});

// Function to send email using EmailJS
function sendEmail(emailParams) {
    emailjs.send("service_34c4w8b","template_syngn48", emailParams)
        .then(function(response) {
            responseMessage.textContent = "Thank you for your question. Our customer service will get back to you soon.";
            responseMessage.className = "message success";
            responseMessage.style.display = "block";
        }, function(error) {
            responseMessage.textContent = "There was an issue submitting your question. Please try again later.";
            responseMessage.className = "message error";
            responseMessage.style.display = "block";
        })
        .finally(() => {
            // Re-enable the submit button and reset text
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Question";
            form.reset();  // Reset the form after submission
        });
}
