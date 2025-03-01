document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signin-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const signinBtn = document.getElementById('signin-btn');
    const rememberCheckbox = document.getElementById('remember');
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (isFormValid()) {
            // Show loading state
            signinBtn.textContent = 'Signing in...';
            signinBtn.disabled = true;
            
            // This would be replaced with your actual signin API call
            simulateSignIn({
                email: email.value,
                password: password.value,
                remember: rememberCheckbox.checked
            });
        }
    });
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // You could show a modal here or redirect to a password reset page
        const userEmail = email.value || '';
        alert('Password reset instructions will be sent to your email address.' + 
              (userEmail ? ' Please check: ' + userEmail : ''));
    });
    
    // Helper functions
    function isFormValid() {
        // Email validation
        if (!email.checkValidity()) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Password validation (basic check)
        if (password.value.length < 1) {
            alert('Please enter your password.');
            return false;
        }
        
        return true;
    }
    
    function simulateSignIn(userData) {
    // This function simulates an API call for signin
    console.log('Signin data:', userData);
    
    // Simulate server delay
    setTimeout(() => {
        // Check for specific email and password
        if (userData.email === 'zhanglingfei@terabox.jp' && userData.password === '12345##￥') {
            // Successful login
            
            // If "remember me" is checked, store user info in localStorage
            if (userData.remember) {
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', userData.email);
            } else {
                // Use sessionStorage for session-only storage
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userEmail', userData.email);
            }
            
            // Redirect to video page
            window.location.href = 'video.html?email=' + encodeURIComponent(userData.email);
        } else {
            // Invalid credentials - redirect to error page
            window.location.href = 'error.html';
            
            // Alternative: show error message without redirect
            // resetButton();
            // alert('Invalid credentials. Please try again.');
        }
    }, 1500);
}
    
    function resetButton() {
        signinBtn.textContent = 'Sign In';
        signinBtn.disabled = false;
    }
    
    // Check if we've redirected from signup page with an email
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
        email.value = emailParam;
        password.focus(); // Focus on password field for better UX
    }
});

// Google Sign-In callback function
function handleGoogleSignIn(googleUser) {
    // This function will be called when a user successfully signs in with Google
    console.log('Google Sign-In successful:', googleUser);
    
    // Extract necessary information
    const profile = googleUser.credential;
    
    // Here you would typically verify this token with your backend
    // and create a session for the user
    
    // For demo purposes, we'll just simulate a successful login
    sessionStorage.setItem('userLoggedIn', 'true');
    
    // Redirect to home page or dashboard
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}