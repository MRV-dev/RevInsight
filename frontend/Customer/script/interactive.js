const authButtons = document.querySelectorAll('.auth-button');

authButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    authButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
  });
});