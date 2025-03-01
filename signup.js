document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const signupBtn = document.getElementById('signup-btn');
    
    // Password requirement elements
    const lengthReq = document.getElementById('length');
    const uppercaseReq = document.getElementById('uppercase');
    const lowercaseReq = document.getElementById('lowercase');
    const numberReq = document.getElementById('number');
    
    // Password validation
    password.addEventListener('input', function() {
        const value = password.value;
        
        // Check requirements
        const isLengthValid = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        
        // Update requirement indicators
        updateRequirement(lengthReq, isLengthValid);
        updateRequirement(uppercaseReq, hasUppercase);
        updateRequirement(lowercaseReq, hasLowercase);
        updateRequirement(numberReq, hasNumber);
        
        // Check if all requirements are met
        checkPasswordValidity();
    });
    
    // Password match validation
    confirmPassword.addEventListener('input', function() {
        checkPasswordValidity();
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (isFormValid()) {
            // Show loading state
            signupBtn.textContent = 'Creating account...';
            signupBtn.disabled = true;
            
            // This would be replaced with your actual signup API call
            simulateSignUp({
                email: email.value,
                password: password.value
            });
        }
    });
    
    // Helper functions
    function updateRequirement(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    }
    
    function checkPasswordValidity() {
        const value = password.value;
        const confirmValue = confirmPassword.value;
        
        const isLengthValid = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        
        const allRequirementsMet = isLengthValid && hasUppercase && hasLowercase && hasNumber;
        const passwordsMatch = value === confirmValue && confirmValue !== '';
        
        if (allRequirementsMet && passwordsMatch) {
            signupBtn.disabled = false;
        } else {
            signupBtn.disabled = true;
        }
    }
    
    function isFormValid() {
        // Email validation
        if (!email.checkValidity()) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Password validation
        const value = password.value;
        const isLengthValid = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        
        if (!(isLengthValid && hasUppercase && hasLowercase && hasNumber)) {
            alert('Please make sure your password meets all requirements.');
            return false;
        }
        
        // Password match validation
        if (password.value !== confirmPassword.value) {
            alert('Passwords do not match.');
            return false;
        }
        
        return true;
    }
    
   function simulateSignUp(userData) {
    // This function simulates an API call for signup
    console.log('Signup data:', userData);
    
    // Simulate server delay
    setTimeout(() => {
        // Redirect to the create.html page with email parameter
        window.location.href = 'create.html?email=' + encodeURIComponent(userData.email);
        
        // If there's an error, you would handle it here
        // resetButton();
        // alert('Error creating account. Please try again.');
    }, 2000);
}
});

// Google Sign-Up callback function
function handleGoogleSignUp(googleUser) {
    // This function will be called when a user successfully signs up with Google
    // The response contains the user's Google profile info that you can use to create an account
    
    console.log('Google Sign-Up successful:', googleUser);
    
    // Extract necessary information
    const profile = googleUser.credential;
    
    // Here you would typically send this information to your server
    // to create a new user account or log the user in if they already exist
    
    // For demo purposes, we'll just simulate a successful signup
    alert('Google Sign-Up successful!');
    
    // Redirect to dashboard or welcome page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}