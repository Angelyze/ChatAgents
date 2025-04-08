document.addEventListener('DOMContentLoaded', () => {
    const langHrButton = document.getElementById('lang-hr');
    const langEnButton = document.getElementById('lang-en');
    const currentYearSpan = document.getElementById('current-year');

    // --- Functions ---
    function setLanguage(lang) {
        document.documentElement.lang = lang; // Set lang attribute on <html>

        // Select all elements with data-lang-hr attribute (or -en, doesn't matter which)
        document.querySelectorAll('[data-lang-hr]').forEach(element => {
            const text = element.getAttribute(`data-lang-${lang}`);
            if (text !== null) {
                 // Handle specific elements like META and TITLE
                if (element.tagName === 'META') {
                    element.setAttribute('content', text);
                }
                else if (element.tagName === 'TITLE') {
                    element.textContent = text;
                }
                // Handle the footer text (replace %YEAR% placeholder)
                else if (element.hasAttribute('data-lang-hr') && element.hasAttribute('data-lang-en') && element.closest('footer')) {
                     const year = new Date().getFullYear();
                     element.innerHTML = text.replace('%YEAR%', year);
                 }
                 // Handle the logo specifically to allow HTML link
                 else if (element.classList.contains('logo')) {
                     element.innerHTML = text;
                 }
                 // Handle standard elements
                 else {
                     element.textContent = text;
                 }
            }
        });

        // Update active button style
        if (lang === 'hr') {
            langHrButton.classList.add('active');
            langEnButton.classList.remove('active');
        } else {
            langEnButton.classList.add('active');
            langHrButton.classList.remove('active');
        }

        // Store preference
        localStorage.setItem('preferredLanguage', lang);
    }

    // --- Event Listeners ---
    langHrButton.addEventListener('click', () => setLanguage('hr'));
    langEnButton.addEventListener('click', () => setLanguage('en'));

    // --- Initial Setup ---
    // Try to load preferred language, default to Croatian ('hr')
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'hr';
    setLanguage(preferredLanguage); // This will now also set the initial year in the footer

    // --- Swiper Initialization ---
    const swiper = new Swiper('.portfolio-swiper', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true, // Optional: enables continuous loop mode
        grabCursor: true,

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
             // when window width is >= 1200px
            1200: {
                slidesPerView: 4, // Show 4 if space allows
                spaceBetween: 30
            }
        }
    });

    // ADD: Modal Functionality
    const modal = document.getElementById('chatbot-modal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalCloseBtn = modal.querySelector('.modal-close');
    const chatbotIframe = document.getElementById('chatbot-iframe');
    const modalTriggers = document.querySelectorAll('.modal-trigger'); // Select by new class

    function openModal(url) {
        if (!modal || !chatbotIframe) return;
        chatbotIframe.src = url; // Set iframe src
        modal.style.display = 'flex'; // Show modal (use flex to enable centering)
        document.body.classList.add('modal-open'); // Prevent body scroll
         // Focus the close button for accessibility
        modalCloseBtn.focus();
    }

    function closeModal() {
        if (!modal || !chatbotIframe) return;
        modal.style.display = 'none'; // Hide modal
        chatbotIframe.src = 'about:blank'; // Reset src
        document.body.classList.remove('modal-open'); // Allow body scroll
    }

    // Add listeners to trigger links
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link navigation
            const chatbotUrl = trigger.getAttribute('href'); // Get URL from href
            openModal(chatbotUrl);
        });

         // Optional: Add a more prominent visual cue on focus for accessibility
         // (You might have this from the previous step, keep it)
        trigger.addEventListener('focus', () => {
            trigger.style.outline = `2px solid ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color')}`;
            trigger.style.outlineOffset = '2px';
        });
        trigger.addEventListener('blur', () => {
            trigger.style.outline = 'none';
        });
    });

    // Add listeners to close modal
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

     // Optional: Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    // END Modal Functionality

}); 