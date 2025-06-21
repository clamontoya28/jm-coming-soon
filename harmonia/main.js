document.addEventListener('DOMContentLoaded', function() {
    // Social Share for Daily Quote
    const likeAudio = document.getElementById('likeAudio');
    const quoteTextElem = document.getElementById('anninaDailyQuoteText');
    const shareX = document.getElementById('shareX');
    const shareLinkedin = document.getElementById('shareLinkedin');
    const shareInstagram = document.getElementById('shareInstagram');

    function getQuote() {
        return quoteTextElem ? quoteTextElem.innerText.trim() : '';
    }

    if (shareX) {
        shareX.addEventListener('click', function(e) {
            e.preventDefault();
            const quote = getQuote();
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(quote + ' #HarmoniaApp');
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        });
    }
    if (shareLinkedin) {
        shareLinkedin.addEventListener('click', function(e) {
            e.preventDefault();
            const quote = getQuote();
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(quote);
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
        });
    }
    if (shareInstagram) {
        shareInstagram.addEventListener('click', function(e) {
            e.preventDefault();
            const quote = getQuote();
            navigator.clipboard.writeText(quote).then(function() {
                shareInstagram.title = 'Frase copiata! Incolla su Instagram Stories.';
                shareInstagram.style.color = 'var(--harmonia-secondary)';
                setTimeout(() => {
                    shareInstagram.title = 'Copia per Instagram';
                    shareInstagram.style.color = '';
                }, 2000);
            });
        });
    }

    // Theme Switcher
    const themeSwitchHarmonia = document.getElementById('theme-switch-harmonia');
    const currentThemeHarmonia = localStorage.getItem('harmoniaTheme');

    function setHarmoniaTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        document.documentElement.classList.toggle('dark-mode-active', isDark); // Applica classe a HTML
        themeSwitchHarmonia.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('harmoniaTheme', isDark ? 'dark' : 'light');
    }

    if (currentThemeHarmonia === 'dark') {
        setHarmoniaTheme(true);
    } else {
        setHarmoniaTheme(false); // Default to light
        // document.documentElement.classList.remove('dark-mode-active'); // Gestito da setHarmoniaTheme(false)
    }

    themeSwitchHarmonia.addEventListener('click', () => {
        setHarmoniaTheme(!document.body.classList.contains('dark-mode'));
    });

    // Language Switcher interattivo (inserito in fondo per garantire funzionamento)
    (function() {
        const langSwitcher = document.querySelector('.lang-switcher');
        if (!langSwitcher) return;
        const langDropdown = langSwitcher.querySelector('.lang-dropdown');
        const currentLangFlag = document.getElementById('current-lang-flag');
        if (!langDropdown || !currentLangFlag) return;
        currentLangFlag.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!langSwitcher.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
        langDropdown.querySelectorAll('.lang-flag-item').forEach(item => {
            item.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const flag = this.querySelector('img').src;
                currentLangFlag.src = flag;
                langDropdown.classList.remove('active');
                // Qui puoi aggiungere la logica per cambiare lingua (testi dinamici)
            });
        });
    })();

    // Mobile Menu
    const mobileMenuHarmonia = document.getElementById('mobile-menu-harmonia');
    const navLinksHarmonia = document.querySelector('.harmonia-nav .nav-links');

    mobileMenuHarmonia.addEventListener('click', () => {
        navLinksHarmonia.classList.toggle('active');
        mobileMenuHarmonia.innerHTML = navLinksHarmonia.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        if (navLinksHarmonia.classList.contains('active')) {
            navLinksHarmonia.querySelector('a').focus();
        }
    });
    
    document.querySelectorAll('.harmonia-nav .nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksHarmonia.classList.contains('active')) {
                navLinksHarmonia.classList.remove('active');
                mobileMenuHarmonia.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuHarmonia.focus();
            }
        });
    });
    // Migliora focus visibile su tab
    document.body.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    document.body.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.5) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Simple scroll animations for cards/sections (optional)
    // Seleziona gli elementi che dovrebbero avere l'animazione
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .timeline-container-harmonia, #annina-ai .content-split > div, #mission-harmonia .section-content > p, .features-table');

    // Crea un IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando l'elemento entra nel viewport, applica gli stili finali
                // Questi stili sono gestiti dalla transizione CSS definita altrove
                // Qui ci assicuriamo che lo stato finale sia raggiunto
                entry.target.style.opacity = ''; // Rimuove lo stile inline per permettere al CSS di prendere il controllo
                entry.target.style.transform = ''; // Rimuove lo stile inline
                entry.target.style.transition = ''; // Rimuove lo stile inline

                // Smetti di osservare l'elemento una volta animato
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Applica gli stili iniziali (nascosti) e osserva gli elementi
    animatedElements.forEach(el => {
        // Controlla se l'elemento è una card all'interno di una griglia carosello mobile
        const parentGrid = el.parentElement;
        const isMobileCarouselCard = (
            (parentGrid && (parentGrid.classList.contains('features-grid') || parentGrid.classList.contains('pricing-grid'))) &&
            window.innerWidth <= 768 // Controlla se siamo su uno schermo mobile
        );

        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Harmonia Roadmap Interactivity
    const timelineContentsHarmonia = document.querySelectorAll('#harmonia-roadmap .timeline-content-harmonia');

    timelineContentsHarmonia.forEach(content => {
        content.addEventListener('click', function() {
            // Confetti
            if (typeof confetti === 'function') {
                const rect = this.getBoundingClientRect();
                const x = (rect.left + rect.right) / 2 / window.innerWidth;
                const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { x: x, y: y }
                });
            }

            // Image Preview
            const imagePreview = this.querySelector('.timeline-image-preview');
            if (imagePreview) {
                document.querySelectorAll('.timeline-image-preview.visible').forEach(visiblePreview => {
                    if (visiblePreview !== imagePreview) visiblePreview.classList.remove('visible');
                });
                imagePreview.classList.toggle('visible');
            }
        });
    });

    // === Daily Quote Feature ===
    const quotes = [
        "Ogni giorno è una nuova opportunità per splendere. ✨",
        "La gentilezza è un linguaggio che il sordo può udire e il cieco può vedere. ❤️",
        "Anche il viaggio più lungo inizia con un singolo passo. 🚶‍♀️",
        "Sii il cambiamento che desideri vedere nel mondo. 🌍",
        "La felicità non è una destinazione, ma un modo di viaggiare. 😊",
        "Non smettere mai di sognare, i sogni sono il nutrimento dell'anima. 🌙",
        "Un sorriso è la curva più bella sul corpo di una persona. 😄",
        "Ricorda di respirare, sei esattamente dove devi essere. 🌬️",
        "La gratitudine trasforma ciò che abbiamo in abbastanza. 🙏",
        "Piccoli gesti di cura verso te stesso fanno una grande differenza. 🌸",
        "Ascolta il tuo cuore, conosce la strada. 🧭",
        "La resilienza è la capacità di sbocciare anche dopo la tempesta.🌷"
    ];

    const quoteTextElement = document.getElementById('anninaDailyQuoteText');
    const likeButton = document.getElementById('likeQuoteButton');
    const heartsContainer = document.getElementById('floatingHeartsContainer');
    const likesCountElement = document.getElementById('anninaDailyQuoteLikesCount');

    if (!quoteTextElement || !likeButton || !heartsContainer) {
        // console.warn('Elementi per la Frase del Giorno non trovati.');
        return;
    }

    function typewriterEffect(element, text, speed = 60, callback) {
        element.innerHTML = ''; // Pulisce il contenuto precedente
        let i = 0;
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor-quote';
        // cursorSpan.textContent = '▍'; // Carattere cursore, ora gestito da CSS
        
        const textNode = document.createTextNode('');
        element.appendChild(textNode);
        element.appendChild(cursorSpan);

        function type() {
            if (i < text.length) {
                textNode.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Rimuovi il cursore alla fine
                if(cursorSpan.parentNode) {
                    cursorSpan.parentNode.removeChild(cursorSpan);
                }
                if (callback) callback();
            }
        }
        type();
    }

    let currentQuoteIndex = -1; // Per tenere traccia della frase corrente

    function resetLikeStateForNewQuote() {
        localStorage.removeItem(`anninaQuoteLiked_${new Date().toDateString()}`);
    }

    function getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    function displayDailyQuote() {
        // Determina l'indice della frase per oggi
        const todayDateString = new Date().toDateString();
        const lastQuoteDate = localStorage.getItem('anninaQuoteDate');
        let newQuoteIndex;

        if (lastQuoteDate === todayDateString && localStorage.getItem('anninaQuoteIndex') !== null) {
            // Se è ancora lo stesso giorno e l'indice è salvato, usalo
            newQuoteIndex = parseInt(localStorage.getItem('anninaQuoteIndex'), 10);
        } else {
            // Nuovo giorno o nessun indice salvato, calcola l'indice e resetta
            const dayIndex = getDayOfYear() - 1; // 0-indexed
            newQuoteIndex = dayIndex % quotes.length;
            localStorage.setItem('anninaQuoteDate', todayDateString);
            localStorage.setItem('anninaQuoteIndex', newQuoteIndex.toString());
            // Resetta lo stato "liked" e il contatore per la nuova frase del giorno
                resetLikeStateForNewQuote(); // Resetta solo il like dell'utente per il nuovo giorno
        }

        currentQuoteIndex = newQuoteIndex; // Aggiorna l'indice della frase corrente
        const quoteToDisplay = quotes[currentQuoteIndex] || "Torna domani per una nuova frase!";
        
        typewriterEffect(quoteTextElement, quoteToDisplay, 60, updateLikeButtonState);
    }

    function updateLikeButtonState() {
        const todayDateString = new Date().toDateString();
        const isLiked = localStorage.getItem(`anninaQuoteLiked_${todayDateString}`) === 'true';
            const totalLikes = parseInt(localStorage.getItem(`anninaQuoteTotalLikes_${currentQuoteIndex}`) || '0', 10);

        if (isLiked) {
            likeButton.classList.add('liked');
            likeButton.innerHTML = '<i class="fas fa-heart"></i>'; // Cuore pieno
            likeButton.setAttribute('aria-label', 'Non mi piace più questa frase');
            likeButton.setAttribute('aria-pressed', 'true');
        } else {
            // Assicurati che l'icona sia quella vuota se non è "liked"
            likeButton.classList.remove('liked');
            likeButton.innerHTML = '<i class="far fa-heart"></i>'; // Cuore vuoto
            likeButton.setAttribute('aria-label', 'Mi piace questa frase');
            likeButton.setAttribute('aria-pressed', 'false');
        }
        // Aggiorna il testo del contatore
        likesCountElement.textContent = totalLikes;
    }

    function createFloatingHeart() {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart floating-heart'; // Usa 'fas' per cuore pieno
        
        // Posizione iniziale e variazioni
        const randomXOffset = (Math.random() - 0.5) * 60; // Variazione orizzontale più ampia
        const randomYOffset = (Math.random() - 0.5) * 25; // Variazione verticale iniziale
        const randomScale = Math.random() * 0.5 + 0.7; // Scala tra 0.7 e 1.2
        const animationDuration = 1.5 + Math.random() * 1.0; // Durata tra 1.5s e 2.5s
        const finalYTranslation = -180 - Math.random() * 50; // Sale tra -180px e -230px
        const finalScale = 0.2 + Math.random() * 0.3; // Scala finale tra 0.2 e 0.5

        heart.style.transform = `translate(${randomXOffset}px, ${randomYOffset}px) scale(${randomScale})`;
        heart.style.opacity = '1';
        
        heartsContainer.appendChild(heart);

        // Animazione custom con JS per più controllo
        heart.animate([
            { transform: `translate(${randomXOffset}px, ${randomYOffset}px) scale(${randomScale})`, opacity: 1 },
            { transform: `translate(${randomXOffset * 0.5}px, ${finalYTranslation / 2}px) scale(${randomScale * 0.8})`, opacity: 0.8 }, // Punto intermedio
            { transform: `translate(${randomXOffset * 0.2}px, ${finalYTranslation}px) scale(${finalScale})`, opacity: 0 }
        ], {
            duration: animationDuration * 1000, // in ms
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => heart.remove();
    }

    likeButton.addEventListener('click', () => {
        const todayDateString = new Date().toDateString();
        let isLiked = localStorage.getItem(`anninaQuoteLiked_${todayDateString}`) === 'true';
                let totalLikes = parseInt(localStorage.getItem(`anninaQuoteTotalLikes_${currentQuoteIndex}`) || '0', 10);

        likeButton.classList.add('pulsing'); // Aggiungi animazione pulsazione
        setTimeout(() => likeButton.classList.remove('pulsing'), 500);

        if (isLiked) {
            localStorage.removeItem(`anninaQuoteLiked_${todayDateString}`);
            totalLikes = Math.max(0, totalLikes - 1); // Decrementa, ma non sotto zero
        } else {
            localStorage.setItem(`anninaQuoteLiked_${todayDateString}`, 'true'); 
            totalLikes += 1; // Incrementa il contatore totale
            for (let i = 0; i < 7 + Math.floor(Math.random() * 6); i++) { // Da 7 a 12 cuori
                setTimeout(createFloatingHeart, i * 90); // Creazione scaglionata
            }
                    // Riproduci il suono del "mi piace"
                    if (likeAudio) {
                        likeAudio.volume = 0.4; // Imposta un volume non troppo invasivo
                        likeAudio.currentTime = 0; // Riavvolge l'audio se viene cliccato di nuovo rapidamente
                        likeAudio.play().catch(error => console.error("La riproduzione audio non è riuscita:", error));
                    }
        }
                localStorage.setItem(`anninaQuoteTotalLikes_${currentQuoteIndex}`, totalLikes.toString());
        updateLikeButtonState(); // Aggiorna l'icona e il contatore visibile
    });

    displayDailyQuote();

    // Funzione per l'animazione di scrittura nella chat
    function typeWriterForChat(element, fullMessage, loopDelay = 3000, typingSpeed = 70, enableLoop = true) {
        let prefix = "";
        let textToType = fullMessage;

        // Estrae il prefisso (es. "Annina: ")
        const prefixMatch = fullMessage.match(/^[^:]+:\s*/);
        if (prefixMatch) {
            prefix = prefixMatch[0];
            textToType = fullMessage.substring(prefix.length);
        } else {
            textToType = fullMessage; // Se non c'è prefisso, anima tutto il messaggio
        }

        let currentIndex = 0;
        element.innerHTML = ''; // Pulisce l'elemento target inizialmente

        const prefixNode = document.createTextNode(prefix);
        element.appendChild(prefixNode);

        const typedTextNode = document.createTextNode(''); // Nodo per il testo che viene scritto
        element.appendChild(typedTextNode);

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor'; // Usa la stessa classe del cursore dell'hero
        cursorSpan.textContent = '▍';
        element.appendChild(cursorSpan);

        function typeCharacter() {
            if (currentIndex < textToType.length) {
                typedTextNode.textContent += textToType.charAt(currentIndex);
                currentIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Testo completamente scritto
                if (enableLoop) {
                    setTimeout(() => {
                        typedTextNode.textContent = ''; // Cancella solo la parte scritta
                        currentIndex = 0;
                        typeCharacter(); // Ricomincia
                    }, loopDelay);
                } else {
                    // Loop non abilitato, rimuovi il cursore se esiste
                    if (cursorSpan && cursorSpan.parentNode) {
                        cursorSpan.parentNode.removeChild(cursorSpan);
                    }
                }
            }
        }
        typeCharacter(); // Avvia l'animazione
    }

    // Animazione di scrittura per il titolo Harmonia
    const heroTitle = document.getElementById('harmonia-hero-title');
    if (heroTitle) {
        const originalText = "Harmonia: Ascolto, Comprensione, Benessere.";
        let i = 0;
        heroTitle.innerHTML = ''; // Pulisci il contenuto iniziale
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        cursorSpan.textContent = '▍'; // Carattere cursore
        heroTitle.appendChild(cursorSpan);

        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.insertBefore(document.createTextNode(originalText.charAt(i)), cursorSpan);
                i++;
                setTimeout(typeWriter, 90); // Velocità di scrittura
            } else {
                // Pausa prima di ricominciare l'animazione
                setTimeout(() => {
                    heroTitle.innerHTML = ''; // Cancella il testo scritto
                    heroTitle.appendChild(cursorSpan); // Riappendi il cursore per mantenerlo visibile
                    i = 0; // Resetta l'indice per ricominciare
                    typeWriter(); // Richiama la funzione per ricominciare a scrivere
                }, 2000); // Pausa di 2 secondi prima di ricominciare
            }
        }
        typeWriter();
    }
    const langSwitcher = document.querySelector('.lang-switcher');
    const langDropdown = langSwitcher.querySelector('.lang-dropdown');
    const currentLangFlag = document.getElementById('current-lang-flag');
    currentLangFlag.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });
    document.addEventListener('click', function(e) {
        if (!langSwitcher.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
    langDropdown.querySelectorAll('.lang-flag-item').forEach(item => {
        item.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            const flag = this.querySelector('img').src;
            currentLangFlag.src = flag;
            langDropdown.classList.remove('active');
            // Qui puoi aggiungere la logica per cambiare lingua (testi dinamici)
        });
    });

    // Logica per la chat demo di Harmonia
    const chatDisplay = document.getElementById('harmoniaChatDisplay');
    const chatInput = document.getElementById('harmoniaChatInput');
    const sendBtn = document.getElementById('harmoniaChatSendBtn');

    function addChatMessage(text, sender) {
        if (!chatDisplay) return;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'annina-message');            
        
        chatDisplay.appendChild(messageDiv);
        if (sender === 'annina') {
            // Per i messaggi di Annina (risposte), usa l'effetto typewriter senza loop
            typeWriterForChat(messageDiv, text, 0, 50, false); // loopDelay non rilevante, typingSpeed 50ms, enableLoop false
        } else {
            // Per i messaggi dell'utente, imposta il testo direttamente
            messageDiv.textContent = text;
        }
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    function handleHarmoniaUserMessage() {
        if (!chatInput || !sendBtn) return;
        const userText = chatInput.value.trim();
        if (userText) {
            addChatMessage(`Tu: ${userText}`, 'user');
            chatInput.value = '';
            setTimeout(() => {
                let anninaResponse = "Ciao! Questa è solo una piccola demo. La vera Annina arriverà presto! 🥰";
                if (userText.toLowerCase().includes("come stai")) anninaResponse = "Io sto bene, grazie! Spero anche tu stia passando una buona giornata.";
                else if (userText.toLowerCase().includes("harmonia")) anninaResponse = "Harmonia è pensata per darti uno spazio di ascolto e comprensione. ✨";
                addChatMessage(`Annina: ${anninaResponse}`, 'annina');
            }, 700);
        }
    }
    if (sendBtn) sendBtn.addEventListener('click', handleHarmoniaUserMessage);
    if (chatInput) chatInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') handleHarmoniaUserMessage(); });
    
    // Aggiunge il messaggio iniziale di Annina con l'effetto typewriter
    if (chatDisplay) {
        const initialAnninaMessageDiv = document.createElement('div');
        initialAnninaMessageDiv.classList.add('chat-message', 'annina-message');
        chatDisplay.appendChild(initialAnninaMessageDiv);
        
        const initialAnninaText = "Annina: Ciao! Scrivimi qualcosa per provare. 😊";
        typeWriterForChat(initialAnninaMessageDiv, initialAnninaText, 3000, 70, true); // enableLoop è true per il messaggio iniziale
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Assicura che il messaggio sia visibile
    } 
});
