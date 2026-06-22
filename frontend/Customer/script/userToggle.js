document.querySelector('.user-toggle').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.user-dropdown').classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.user-menu')) {
        document.querySelector('.user-dropdown').classList.remove('active');
      }
    });