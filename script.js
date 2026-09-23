    //Script//
    tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        navy: {
                            DEFAULT: '#071931',
                            dark: '#031021',
                            light: '#0c2445',
                            card: '#0e294d'
                        },
                        gold: {
                            DEFAULT: '#E3B341',
                            hover: '#cda032',
                            light: '#f5d688',
                            dark: '#a87f1f'
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                        motto: ['Great Vibes', 'cursive']
                    }
                }
            }
        }
<!-- EmailJS Browser SDK -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script type="text/javascript">
    (function(){
        // Replace with your EmailJS Public Key
        emailjs.init({
            publicKey: "Iv_wgKOfEI_xvLJJM",
        });
    })();
</script>

<script>
  document.getElementById('inquiryForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const notification = document.getElementById('formNotification');

      // Change button state to loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      // Replace YOUR_SERVICE_ID and YOUR_ADMIN_TEMPLATE_ID with your values
      emailjs.sendForm('service_e0g2xi8', 'template_bwa6pwc', this)
          .then(function() {
              // Show success message
              notification.classList.remove('hidden');
              document.getElementById('inquiryForm').reset();
              
              // Reset button state
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Inquiry';
          }, function(error) {
              alert('Failed to send inquiry. Please try again or call us directly.');
              console.error('EmailJS Error:', error);
              
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Inquiry';
          });
  });
</script>
