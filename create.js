document.addEventListener('DOMContentLoaded', function() {
    // Extract email from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    // Display the email in the confirmation message
    const userEmailElement = document.getElementById('user-email');
    if (email) {
        userEmailElement.textContent = email;
    } else {
        userEmailElement.textContent = 'your email';
    }
    
    // Handle resend confirmation link click
    const resendLink = document.getElementById('resend-confirmation');
    resendLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add animation or visual feedback
        this.textContent = 'Sending...';
        
        // Simulate sending confirmation email again
        setTimeout(() => {
            this.textContent = 'Confirmation sent!';
            
            // Reset after 3 seconds
            setTimeout(() => {
                this.textContent = 'Resend confirmation';
            }, 3000);
        }, 1500);
        
        // In a real application, you would make an API call here
        // to request a new confirmation email
    });
});