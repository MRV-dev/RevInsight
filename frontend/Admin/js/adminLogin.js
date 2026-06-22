// Admin Login JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const rememberMe = document.querySelector('input[name="remember"]').checked;

        // Validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Disable button during submission
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        // Simulate API call (in real app, send to backend)
        setTimeout(() => {
            // Demo credentials
            const validEmails = ['admin@mmps.com', 'admin@email.com'];
            const validPassword = 'admin123';

            if (validEmails.includes(email.toLowerCase()) && password === validPassword) {
                // Store credentials if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('rememberEmail', email);
                } else {
                    localStorage.removeItem('rememberEmail');
                }

                // Set authentication token
                localStorage.setItem('adminToken', 'token_' + Date.now());
                localStorage.setItem('adminEmail', email);

                showSuccess('Login successful! Redirecting...');

                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'adminDashboard.html';
                }, 1500);
            } else {
                showError('Invalid email or password');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }, 1500);
    });

    // Load remembered email
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.querySelector('input[name="remember"]').checked = true;
    }

    // Forgot password
    document.querySelector('.forgot-password').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Password reset link would be sent to your email');
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        document.querySelector('form').insertBefore(errorDiv, document.querySelector('form').firstChild);
    }
    errorDiv.textContent = message;
    errorDiv.classList.add('show');

    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

function showSuccess(message) {
    let successDiv = document.querySelector('.success-message');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        document.querySelector('form').insertBefore(successDiv, document.querySelector('form').firstChild);
    }
    successDiv.textContent = message;
    successDiv.classList.add('show');
}
