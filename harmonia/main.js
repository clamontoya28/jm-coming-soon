document.addEventListener('DOMContentLoaded', function() {
    // Elementi per la condivisione
    const likeAudio = document.getElementById('likeAudio');
    const quoteTextElem = document.getElementById('anninaDailyQuoteText');
    const shareX = document.getElementById('shareX');
    const shareLinkedin = document.getElementById('shareLinkedin');
    const shareInstagram = document.getElementById('shareInstagram');
    const shareModal = document.getElementById('share-modal');
    const closeShareModalBtn = document.getElementById('close-share-modal');
    const sharePreviewImage = document.getElementById('share-preview-image');
    const sharePreviewLoader = document.getElementById('share-preview-loader');
    const backgroundOptionsContainer = document.getElementById('background-options');
    const fontOptionsContainer = document.getElementById('font-options');
    const finalShareButton = document.getElementById('final-share-button');

    let currentCardBlob = null; // Per memorizzare il blob dell'immagine generata

    function getQuote() {
        return quoteTextElem ? quoteTextElem.innerText.trim() : '';
    }

    // --- Logica per la condivisione social e la modale ---

    // Condivisione diretta per X (Twitter) e LinkedIn
    if (shareX) {
        shareX.addEventListener('click', (e) => {
            e.preventDefault();
            const quote = getQuote();
            const shareText = `"${quote}" - Annina AI via Harmonia`;
            const pageUrl = 'https://jmenterprises.it/harmonia.html';
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}&hashtags=Harmonia,Benessere,AnninaAI`;
            window.open(twitterUrl, '_blank', 'width=600,height=400,resizable=yes,scrollbars=yes');
        });
    }

    if (shareLinkedin) {
        shareLinkedin.addEventListener('click', (e) => {
            e.preventDefault();
            const pageUrl = 'https://jmenterprises.it/harmonia.html';
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
            window.open(linkedinUrl, '_blank', 'width=600,height=550,resizable=yes,scrollbars=yes');
        });
    }

    // Apertura modale per Instagram
    if (shareInstagram) {
        shareInstagram.addEventListener('click', (e) => {
            e.preventDefault();
            openShareModal();
        });
    }

    function openShareModal() {
        if (!shareModal) return;
        shareModal.classList.add('active'); // Usa la classe per le transizioni CSS
        document.body.style.overflow = 'hidden';

        const defaultBg = backgroundOptionsContainer?.querySelector('.active')?.dataset.bg || 'aura-celeste';
        const defaultFont = fontOptionsContainer?.querySelector('.active')?.dataset.font || 'Inter';
        updateSharePreview(defaultBg, defaultFont);
    }

    function closeShareModal() {
        if (!shareModal) return;
        shareModal.classList.remove('active'); // Usa la classe per le transizioni CSS
        document.body.style.overflow = '';
    }

    async function updateSharePreview(backgroundType, fontType = 'Inter') {
        if (!sharePreviewImage || !sharePreviewLoader) return;

        sharePreviewLoader.style.display = 'block';
        sharePreviewImage.style.opacity = '0.5';

        const quote = getQuote();
        const isDarkMode = document.body.classList.contains('dark-mode');

        try {
            const dataUrl = await createQuoteCard(quote, isDarkMode, backgroundType, fontType);
            sharePreviewImage.src = dataUrl;
            // Converti in blob per la condivisione
            const response = await fetch(dataUrl);
            currentCardBlob = await response.blob();
        } catch (error) {
            console.error("Errore durante l'aggiornamento dell'anteprima:", error);
            sharePreviewImage.alt = "Errore nella creazione dell'anteprima.";
        } finally {
            sharePreviewLoader.style.display = 'none';
            sharePreviewImage.style.opacity = '1';
        }
    }

    async function shareCard() {
        if (!currentCardBlob) {
            alert("Attendi la generazione dell'immagine prima di condividere.");
            return;
        }

        const downloadPermission = document.getElementById('download-permission');
        const formGroup = downloadPermission.parentElement;

        if (!downloadPermission.checked) {
            alert("Per favore, acconsenti al download dell'immagine prima di procedere.");
            if (formGroup) {
                formGroup.classList.add('is-invalid');
            }
            return;
        }
        if (formGroup) {
            formGroup.classList.remove('is-invalid');
        }

        const quote = getQuote();
        const file = new File([currentCardBlob], "harmonia_frase_del_giorno.png", { type: currentCardBlob.type });

        // Usa la Web Share API se disponibile
        if (navigator.share && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'Frase del Giorno da Harmonia',
                    text: `"${quote}" - via Harmonia App`,
                });
                closeShareModal(); // Chiudi la modale dopo la condivisione
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Errore durante la condivisione:', error);
                    alert("Condivisione fallita. L'immagine verrà scaricata come alternativa.");
                    downloadImage(sharePreviewImage.src, "harmonia_frase_del_giorno.png");
                }
            }
        } else {
            // Fallback per browser non supportati (es. desktop)
            alert("La condivisione diretta non è supportata dal tuo browser. L'immagine verrà scaricata per permetterti di condividerla manualmente.");
            downloadImage(sharePreviewImage.src, "harmonia_frase_del_giorno.png");
        }
    }

    // Listeners per la modale
    if (closeShareModalBtn) closeShareModalBtn.addEventListener('click', closeShareModal);
    if (finalShareButton) finalShareButton.addEventListener('click', shareCard);
    if (shareModal) shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) closeShareModal(); // Chiudi cliccando sull'overlay
    });
    if (backgroundOptionsContainer) {
        backgroundOptionsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.background-option');
            if (button && !button.classList.contains('active')) {
                backgroundOptionsContainer.querySelector('.active')?.classList.remove('active');
                button.classList.add('active');
                const fontType = fontOptionsContainer?.querySelector('.active')?.dataset.font || 'Inter';
                updateSharePreview(button.dataset.bg, fontType);
            }
        });
    }
    if (fontOptionsContainer) {
        fontOptionsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.font-option');
            if (button && !button.classList.contains('active')) {
                fontOptionsContainer.querySelector('.active')?.classList.remove('active');
                button.classList.add('active');
                const backgroundType = backgroundOptionsContainer.querySelector('.active')?.dataset.bg || 'aura-celeste';
                updateSharePreview(backgroundType, button.dataset.font);
            }
        });
    }


    // Rimuovi lo stato di errore dalla checkbox quando viene selezionata
    const downloadPermissionCheckbox = document.getElementById('download-permission');
    if (downloadPermissionCheckbox) {
        downloadPermissionCheckbox.addEventListener('change', () => {
            if (downloadPermissionCheckbox.checked) downloadPermissionCheckbox.parentElement.classList.remove('is-invalid');
        });
    }

    /**
 * Crea un'immagine della frase del giorno su un canvas e restituisce la sua Data URL.
 * @param {string} quote - La frase da visualizzare sull'immagine.
 * @param {boolean} isDark - Se `true`, genera la card in tema scuro.
 * @param {string} backgroundType - Il tipo di sfondo da usare ('aura-celeste', 'light', 'dark', etc.).
 * @returns {Promise<string>} - Una Promise che si risolve con la Data URL dell'immagine PNG.
 */
async function createQuoteCard(quote, isDark = false, backgroundType = 'aura-celeste', fontType = 'Inter') {
    const canvas = document.createElement('canvas');
    // Dimensioni standard per un post Instagram (quadrato)
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Definisce i colori in base al tema
    const colors = {
        cardBg: isDark ? '#2a2a3e' : '#ffffff',
        shadow: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)',
        primaryText: isDark ? '#e0e0e0' : '#333333',
        secondaryText: isDark ? '#a0a0b0' : '#666666',
        cardBorder: isDark ? 'rgba(130, 192, 204, 0.4)' : 'rgba(130, 192, 204, 0.6)'
    };

    // 1. Disegna lo sfondo in base al tipo
    let bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height); // Gradiente verticale
    switch (backgroundType) {
        case 'light':
            bgGradient.addColorStop(0, '#e0e0e0'); // Grigio chiaro
            bgGradient.addColorStop(1, '#ffffff'); // Bianco
            break;
        case 'dark':
            bgGradient.addColorStop(0, '#2c3e50'); // Blu notte
            bgGradient.addColorStop(1, '#465a6c'); // Grigio-blu scuro
            break;
        case 'aura-rosa':
            if (isDark) {
                bgGradient.addColorStop(0, '#c2185b'); // Magenta scuro
                bgGradient.addColorStop(1, '#e94e77'); // Rosa più chiaro e vibrante
            } else {
                bgGradient.addColorStop(0, '#d91e5b'); // Rosa intenso
                bgGradient.addColorStop(1, '#fccde0'); // Rosa molto chiaro
            }
            break;
        case 'aura-verde':
            if (isDark) {
                bgGradient.addColorStop(0, '#16a085'); // Verde mare
                bgGradient.addColorStop(1, '#58d68d'); // Smeraldo chiaro
            } else {
                bgGradient.addColorStop(0, '#27ae60'); // Verde nefrite
                bgGradient.addColorStop(1, '#b3e6c9'); // Menta molto chiaro
            }
            break;
        case 'aura-viola':
            if (isDark) {
                bgGradient.addColorStop(0, '#8e44ad'); // Glicine
                bgGradient.addColorStop(1, '#c39bd3'); // Lavanda
            } else {
                bgGradient.addColorStop(0, '#8e44ad'); // Glicine
                bgGradient.addColorStop(1, '#e1cde8'); // Lavanda molto chiaro
            }
            break;
        case 'aura-celeste':
        default:
            if (isDark) {
                bgGradient.addColorStop(0, '#2c3e50'); // Blu notte
                bgGradient.addColorStop(1, '#5d8aa8'); // Blu Air Force
            } else {
                bgGradient.addColorStop(0, '#3498db'); // Blu Peter River
                bgGradient.addColorStop(1, '#c5e3f8'); // Azzurro cielo molto chiaro
            }
            break;
    }
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Disegna la card con l'ombra e il bordo
    ctx.shadowColor = colors.shadow;
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;

    // Crea il percorso per la card
    ctx.beginPath();
    ctx.roundRect(60, 60, canvas.width - 120, canvas.height - 120, 30);

    // Riempi la card
    ctx.fillStyle = colors.cardBg;
    ctx.fill();

    // Resetta l'ombra prima di disegnare il bordo per non avere un'ombra anche sul bordo
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Disegna il bordo
    ctx.strokeStyle = colors.cardBorder;
    ctx.lineWidth = 2; // Un bordo sottile di 2px
    ctx.stroke(); // Disegna il contorno del percorso corrente

    // 3. Disegna il testo della frase
    const fontFamily = fontType === 'Playfair Display' ? '"Playfair Display", serif' : // Existing
                       fontType === 'Caveat' ? '"Caveat", cursive' : // Existing
                       fontType === 'Roboto' ? '"Roboto", sans-serif' : // New
                       fontType === 'Lora' ? '"Lora", serif' : // New
                       fontType === 'Pacifico' ? '"Pacifico", cursive' : // New
                       '"Inter", sans-serif'; // Default

    // Regola la dimensione del font in base al tipo per un aspetto bilanciato
    let fontSize = 48;
    if (fontType === 'Caveat') {
        fontSize = 64; // Il font Caveat è più "sottile", quindi lo rendiamo più grande
    } else if (fontType === 'Playfair Display') {
        fontSize = 52; // Playfair è un font serif elegante
    } else if (fontType === 'Roboto') {
        fontSize = 48; // Roboto è un sans-serif standard, va bene la dimensione base
    } else if (fontType === 'Lora') {
        fontSize = 50; // Lora è un serif, leggermente più grande per leggibilità
    } else if (fontType === 'Pacifico') {
        fontSize = 60; // Pacifico è un font script, necessita di una dimensione maggiore
    } else {
        // Default for 'Inter'
        fontSize = 48;
    }

    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = colors.primaryText;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const maxWidth = canvas.width - 240; // Larghezza massima per il testo (con più padding)
    const lineHeight = fontSize * 1.25; // Altezza di riga dinamica in base alla dimensione del font
    const lines = getWrappedText(ctx, quote, maxWidth);

    // Calcola la posizione Y per centrare verticalmente il blocco di testo
    const totalTextHeight = lines.length * lineHeight;
    let startY = (canvas.height - totalTextHeight) / 2;

    lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
    });

    // 4. Disegna il logo e il testo nell'angolo in basso a sinistra
    const logoSize = 60; // Dimensione del logo (quadrato)
    const logoX = 80;   // Distanza dal bordo sinistro
    const logoY = canvas.height - 120; // Distanza dal bordo inferiore
    const textX = logoX + logoSize + 10; // Posizione X del testo (a destra del logo)
    const textY = logoY + logoSize / 2;  // Posizione Y del testo (centrato rispetto al logo)

    try {
        const logoImg = await loadImage('/assets/annina.png');
        // Disegna l'immagine del logo, ritagliandola in un cerchio per un look pulito
        ctx.save();
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2, true);
        ctx.clip();
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        ctx.restore(); // Rimuove il clipping path per i disegni successivi
    } catch (error) {
        console.error("Impossibile caricare l'immagine del logo /assets/annina.png:", error);
        // In caso di errore, non viene disegnato nessun logo, ma si potrebbe aggiungere un fallback.
    }

    // 5. Disegna il testo a fianco al logo, gestendo il wrapping
    ctx.font = '24px "Inter", sans-serif';
    ctx.fillStyle = colors.secondaryText;
    ctx.textAlign = 'left'; // Allinea il testo a sinistra
    ctx.textBaseline = 'middle';

    const footerText = 'Harmonia | Benessere Mentale';
    const footerMaxWidth = canvas.width - textX - 80; // Larghezza massima = canvas width - start X - padding destro
    const footerLines = getWrappedText(ctx, footerText, footerMaxWidth);
    const footerLineHeight = 28; // Altezza riga per il footer, leggermente superiore alla dimensione del font

    const startFooterY = textY - ((footerLines.length - 1) * footerLineHeight) / 2; // Calcola la Y iniziale per centrare il blocco
    footerLines.forEach((line, index) => {
        ctx.fillText(line, textX, startFooterY + (index * footerLineHeight));
    });

    return canvas.toDataURL('image/png');
}

/**
 * Funzione helper per caricare un'immagine come Promise.
 * @param {string} src - L'URL dell'immagine.
 * @returns {Promise<HTMLImageElement>}
 */
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Failed to load image's URL: ${src}`));
        img.src = src;
    });
}

/**
 * Scarica una Data URL come file.
 * @param {string} dataUrl - La Data URL dell'immagine.
 * @param {string} filename - Il nome del file da scaricare.
 */
function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link); // Necessario per Firefox
    link.click();
    document.body.removeChild(link); // Pulisci il DOM
}

/**
 * Avvolge il testo per adattarlo a una larghezza massima sul canvas.
 * @param {CanvasRenderingContext2D} context - Il contesto del canvas.
 * @param {string} text - Il testo da avvolgere.
 * @param {number} maxWidth - La larghezza massima consentita per una riga.
 * @returns {string[]} - Un array di stringhe, dove ogni stringa è una riga di testo.
 */
function getWrappedText(context, text, maxWidth) {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line.trim());
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line.trim());
    return lines;
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