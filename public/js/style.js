document.addEventListener('DOMContentLoaded', function() {
    // Add 3D tilt effect to cards
    const cards = document.querySelectorAll('.listing-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            card.style.transition = 'all 0.5s ease';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-3d');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

 // Add this script to highlight current page in navbar
 document.querySelectorAll('.nav-link').forEach(link => {
    if(link.href === window.location.href) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });


  document.querySelectorAll('.star-select').forEach(star => {
    star.addEventListener('click', function () {
      const value = this.getAttribute('data-value');
      document.getElementById('ratingValue').value = value;
      document.querySelectorAll('.star-select').forEach((s, i) => {
        s.style.color = i < value ? '#ffc107' : '#ccc';
      });
    });
  });

  

    $(document).ready(function() {
      // Character counters
      $('#title').on('input', function() {
        $('#title-counter').text($(this).val().length);
      });

      $('#description').on('input', function() {
        $('#desc-counter').text($(this).val().length);
      });

      // Image URL preview
      $('#image.url').on('change', function() {
        const url = $(this).val();
        const preview = $('#image-preview');
        
        if (url) {
          preview.html(`<img src="${url}" alt="Preview" onerror="this.onerror=null;this.src='#';this.parentElement.innerHTML='<i class=\'fas fa-exclamation-triangle fa-3x text-danger\'></i><p class=\'mt-2 text-danger\'>Invalid image URL</p>'">`);
        } else {
          preview.html('<i class="fas fa-image fa-3x text-muted"></i>');
        }
      });

      // Form validation
      (function() {
        'use strict';
        const forms = document.querySelectorAll('.needs-validation');
        
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      })();
    });