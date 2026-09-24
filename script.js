// Initialize EmailJS with your Public Key
(function() {
    emailjs.init({
        publicKey: "Iv_wgKOfEI_xvLJJM",
    });
})();

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Drawer Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('hidden');
        });

        // Close drawer when clicking any link inside it
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.add('hidden');
            });
        });
    }

    // 2. Dynamic Year in Footer
    const yearSpan = document.getElementById('yearSpan');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. EmailJS Form Handling
    const inquiryForm = document.getElementById('inquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    const formNotification = document.getElementById('formNotification');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Hide previous notification if visible
            if (formNotification) {
                formNotification.classList.add('hidden');
            }

            // Disable button and show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }

            // Send form using EmailJS v4
            emailjs.sendForm('service_e0g2xi8', 'template_9l5unfo', e.target)
                .then(() => {
                    // Success
                    if (formNotification) {
                        formNotification.classList.remove('hidden');
                    }
                    inquiryForm.reset();
                })
                .catch((error) => {
                    // Error logging
                    console.error('EmailJS Error Object:', error);
                    alert("Failed to send inquiry: " + (error.text || "Check console for details") + "\n\nPlease call us directly at +234 703 502 0023.");
                })
                .finally(() => {
                    // Re-enable button
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Inquiry';
                    }
                });
        });
    }
});

// 4. Category Filtering Functionality
function filterCategory(categoryName) {
    const filterButtons = document.querySelectorAll('.filter-tab');
    
    // Normalize target category string
    const targetCategory = categoryName.trim().toLowerCase();

    // 1. Update active tab styles
    filterButtons.forEach(btn => {
        const btnText = btn.textContent.trim().toLowerCase();
        
        if (btnText === targetCategory || (categoryName === 'All' && btnText === 'all')) {
            btn.className = "filter-tab active px-4 py-2 rounded-lg text-xs font-bold bg-gold text-navy-dark transition";
        } else {
            btn.className = "filter-tab px-4 py-2 rounded-lg text-xs font-bold text-slate-300 bg-navy-card hover:text-gold transition border border-slate-800";
        }
    });

    // 2. Hide / Show Catalog Cards based on data-category
    const catalogCards = document.querySelectorAll('.catalog-card');
    catalogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category')?.trim().toLowerCase();
        
        if (categoryName === 'All' || cardCategory === targetCategory) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // 3. Smooth scroll down to the listings section
    const listingsSection = document.getElementById('listings');
    if (listingsSection && window.scrollY < listingsSection.offsetTop - 200) {
        listingsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
