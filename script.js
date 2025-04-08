document.addEventListener('DOMContentLoaded', () => {
    const langHrButton = document.getElementById('lang-hr');
    const langEnButton = document.getElementById('lang-en');
    const currentYearSpan = document.getElementById('current-year');

    // --- Language Data ---
    const translations = {
        hr: {
            pageTitle: "ChatAgents - Vaši AI Chatbot Partneri",
            headerLogo: "ChatAgents",
            heroTitle: "Unaprijedite Svoju Web Stranicu Inteligentnim AI Chatbotovima",
            heroSubtitle: "Angelyze kreira prilagođena chatbot rješenja koja poboljšavaju korisničko iskustvo i potiču angažman.",
            heroButton: "Pogledajte Naš Portfolio",
            aboutTitle: "Zašto AI Chatbot na Vašoj Stranici?",
            benefit1Title: "Trenutni Odgovori 24/7",
            benefit1Text: "Budite dostupni svojim korisnicima u bilo koje doba dana ili noći, pružajući brze odgovore na njihove upite.",
            benefit2Title: "Poboljšano Korisničko Iskustvo",
            benefit2Text: "Vodite korisnike kroz vašu stranicu, odgovarajte na česta pitanja i pružite personaliziranu pomoć.",
            benefit3Title: "Povećanje Angažmana",
            benefit3Text: "Interaktivni chatbotovi zadržavaju posjetitelje duže na stranici i potiču ih na interakciju.",
            benefit4Title: "Filtriranje Upita",
            benefit4Text: "Chatbot može prikupiti osnovne informacije i kvalificirati upite prije nego ih proslijedi vašem timu.",
            portfolioTitle: "Naš Portfolio Chatbotova",
            portfolioSubtitle: "Pogledajte neke od AI chatbot rješenja koja smo razvili za naše klijente. Naš portfolio neprestano raste!",
            portfolio1Title: "Angelyze AI Assistant",
            portfolio1Desc: "AI asistent integriran na Angelyze.org, pruža informacije o uslugama i odgovara na upite korisnika.",
            portfolio2Title: "Chatbot za Klijenta B", // Translate or keep generic
            portfolio2Desc: "Prilagođeni chatbot za tvrtku [Ime Tvrtke B], dizajniran za [specifična svrha, npr. podršku korisnicima, odgovaranje na FAQ].", // Translate or keep generic
            contactTitle: "Kontaktirajte Nas",
            contactSubtitle: "Imate pitanja ili želite chatbot za svoju web stranicu? Javite nam se!",
            contactPhone: "Tel:",
            contactEmail: "Email:",
            contactWeb: "Web:",
            contactButton: "Pošaljite Email",
            footerText: `&copy; ${new Date().getFullYear()} ChatAgents by Angelyze. Sva prava pridržana.`
        },
        en: {
            pageTitle: "ChatAgents - Your AI Chatbot Partners",
            headerLogo: "ChatAgents",
            heroTitle: "Enhance Your Website with Intelligent AI Chatbots",
            heroSubtitle: "Angelyze creates custom chatbot solutions that improve user experience and drive engagement.",
            heroButton: "View Our Portfolio",
            aboutTitle: "Why Have an AI Chatbot on Your Site?",
            benefit1Title: "Instant Responses 24/7",
            benefit1Text: "Be available to your users any time of day or night, providing quick answers to their inquiries.",
            benefit2Title: "Improved User Experience",
            benefit2Text: "Guide users through your site, answer common questions, and provide personalized assistance.",
            benefit3Title: "Increased Engagement",
            benefit3Text: "Interactive chatbots keep visitors on the page longer and encourage interaction.",
            benefit4Title: "Query Filtering",
            benefit4Text: "The chatbot can gather basic information and qualify inquiries before forwarding them to your team.",
            portfolioTitle: "Our Chatbot Portfolio",
            portfolioSubtitle: "Check out some of the AI chatbot solutions we've developed for our clients. Our portfolio is constantly growing!",
            portfolio1Title: "Angelyze AI Assistant",
            portfolio1Desc: "AI assistant integrated on Angelyze.org, providing information about services and answering user queries.",
            portfolio2Title: "Client B Chatbot", // Or provide specific name
            portfolio2Desc: "Custom chatbot for [Client B Company Name], designed for [specific purpose, e.g., customer support, FAQ answering].", // Or provide specific description
            contactTitle: "Contact Us",
            contactSubtitle: "Have questions or want a chatbot for your website? Get in touch!",
            contactPhone: "Phone:",
            contactEmail: "Email:",
            contactWeb: "Web:",
            contactButton: "Send Email",
            footerText: `&copy; ${new Date().getFullYear()} ChatAgents by Angelyze. All rights reserved.`
        }
    };

    // --- Functions ---
    function setLanguage(lang) {
        const langData = translations[lang];
        document.documentElement.lang = lang; // Set lang attribute on <html>

        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (langData[key]) {
                // Use innerHTML for keys that might contain HTML like footerText
                if (key === 'footerText') {
                    element.innerHTML = langData[key];
                } else {
                    element.textContent = langData[key];
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
    // Set current year in footer
     if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
     // Try to load preferred language, default to Croatian ('hr')
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'hr';
    setLanguage(preferredLanguage);

}); 