const authButtons = document.querySelectorAll('.auth-button');

authButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    authButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Check which button was clicked
    const isRegister = this.textContent.trim() === 'Register';
    
    // Slide immediately (no delay)
    document.body.classList.toggle('register-active', isRegister);
    
    // Delay only the form switch
    setTimeout(() => {
      document.body.classList.toggle('form-ready', isRegister);
    }, 200);  // Adjust delay for form change
  });
});