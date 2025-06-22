// Reveal effect for sections
document.addEventListener('DOMContentLoaded', function() {
    const revealSections = document.querySelectorAll('.reveal-section');
    const observer = new window.IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18
    });
    revealSections.forEach(section => {
        observer.observe(section);
    });

    // Ottimizzazione menu mobile: chiudi menu dopo click su link
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
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
});
// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const themeSwitchBtn = document.querySelector('.theme-switch');
let darkMode = true;

// Migliora UX Back to Top su mobile
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
    if (window.scrollY > window.innerHeight * 0.5) {
        backToTop.style.opacity = 1;
        backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = 0;
        backToTop.style.pointerEvents = 'none';
    }
});
backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Language switcher functionality
const langFlags = {
    en: 'https://flagcdn.com/24x18/gb.png',
    it: 'https://flagcdn.com/24x18/it.png',
    fr: 'https://flagcdn.com/24x18/fr.png',
    es: 'https://flagcdn.com/24x18/es.png'
};
const langNames = {
    en: 'English',
    it: 'Italiano',
    fr: 'Français',
    es: 'Español'
};
const translations = {
    en: {
        nav_about: 'About',
        nav_products: 'Products',
        nav_roadmap: 'Roadmap',
        nav_team: 'Team',
        hero_title: 'Where Innovation Meets Excellence',
        hero_desc: 'J.M Enterprises pioneers next-generation technologies that redefine human mental health.',
        hero_btn1: 'Explore Harmonia',
        hero_btn2: 'Beta Annina',
        about_title: 'Our Vision',
        about_desc: 'Pioneering the next generation of transformative technologies',
        about_h3: 'Redefining Possibilities',
        about_p1: 'Founded by <strong>Claudio Montoya in 2025</strong>, J.M Enterprises was born from a simple but powerful mission:',
        about_p2: 'To build accessible, intelligent and human-centered products that improve lives -> everywhere.',
        about_p3: 'Our goal is to democratize innovation, offering solutions that combine the power of <strong>AI and modern technology with simplicity and empathy</strong>.',
        about_p4: 'We believe that innovation should not be a luxury, but a right for everyone, regardless of income, language, or background.',
        about_btn: 'Meet Our Visionaries',
        products_title: 'Our Innovations',
        products_desc: 'Revolutionary technologies designed to transform industries',
        product1_title: 'Harmonia',
        product1_desc: 'An intelligent companion app designed to support mental well-being and emotional health. Powered by AI, Harmonia listens, learns and grows with you helping users track their moods, reflect through journaling, and feel understood when it matters most.',
        product1_btn: 'Discover Harmonia',
        product1_tagline: 'Building The Health of Tomorrow',
        product2_title: 'Saint & Co.',
        product2_desc: 'A smart business analytics app designed for modern professionals: from restaurants and hotels, to freelancers and online stores. With customizable interactive dashboards, you can track invoices, website traffic, inventory, expenses, customers flows, and more. Powered by AI, Saint anticipates trends, detects inefficiencies, and offers actionable insights to optimize your operations and reduce waste.',
        product2_btn: 'Explore Saint & Co.',
        product3_title: 'AuraX',
        product3_desc: "AuraX is the world’s first AI-powered coach for cognitive and energetic performance, designed to help individuals unlock their peak focus, emotional balance, and mental clarity. Through real-time analysis and personalized guidance, AuraX empowers users to master their inner state and perform at their best every day.",
        product3_btn: 'Discover Quantum',
        roadmap_title: 'Strategic Roadmap',
        roadmap_desc: 'Our journey to technological leadership',
        roadmap_q1: 'Launch of Harmonia (Free Beta)',
        roadmap_q1_desc: 'The first public release of Harmonia will be completely free for a limited time. The goal is to provide accessible emotional support while collecting user feedback to improve the platform.',
        roadmap_q2: 'Premium Features Integration on Harmonia',
        roadmap_q2_desc: 'Advanced features will be introduced, such as the ability to speak with Annina via AI voice calls and receive personalized audio messages.',
        roadmap_q3: 'Official Launch of Saint & Co.',
        roadmap_q3_desc: 'Saint & Co. will be a professional platform for freelancers, entrepreneurs, and small businesses. It will launch with built-in premium features to support and grow their operations.',
        roadmap_q4: 'AuraX Announcements',
        roadmap_q4_desc: 'AuraX, our AI coach for cognitive and energetic performance, will be the focus of major updates and announcements.',
        team_title: 'Visionary Leadership',
        team_desc: 'The minds shaping our technological future',
        team1_name: 'Claudio Montoya',
        team1_pos: 'Founder & CEO',
        team1_desc: 'Also leading product innovation & engineering.',
        team2_name: 'N/A',
        team2_pos: 'CTO',
        team2_desc: 'N/A',
        team3_name: 'N/A',
        team3_pos: 'CIO',
        team3_desc: 'N/A',
        team4_name: 'N/A',
        team4_pos: 'Quantum Research Lead',
        team4_desc: 'N/A',
        footer_company: 'J.M Enterprises',
        footer_desc: 'Pioneering the future through revolutionary technologies that transform industries and empower human potential.', // Mantengo uguale
        footer_portfolio: 'Our Portfolio',
        footer_about: 'About Us',
        footer_leadership: 'Leadership', // This was already removed in a previous step, but keeping it here for consistency with the original file's structure.
        footer_contact: 'Contact',
        copyright: '&copy; 2025 J.M Enterprises Holdings. All rights reserved. | With love for Annina & Mom.', // This will be updated dynamically by the HTML change
        // Forum translations
        nav_forum: 'Forum',
        forum_main_title: 'Join Our Community',
        forum_main_desc: 'Stay updated, share your interest, or get in touch with us.',
        label_forum_name: 'Name',
        forum_name_ph: 'Your name',
        label_forum_email: 'Email',
        forum_email_ph: 'Your email',
        label_forum_phone: 'Phone (Optional)',
        forum_phone_ph: 'Your phone number',
        label_forum_interest: "I'm interested in",
        forum_select_option: 'Select...',
        forum_interest_newsletter: 'Newsletter',
        forum_interest_wishlist: 'Product Waitlist',
        forum_interest_contact: 'General Contact',
        forum_interest_all: 'All of the above',
        label_forum_consent_text: 'I confirm I want to subscribe to the newsletter and waitlist.',
        forum_submit_btn: 'Submit',
        forum_thank_you_title: 'Request Sent!',
        forum_thank_you_message: "Thank you {name}! Your request has been successfully submitted.",
        error_consent_required: 'You must agree to subscribe to the newsletter and waitlist.',
        sending: 'Sending...'
    },
    it: {
        nav_about: 'Chi siamo',
        nav_products: 'Prodotti',
        nav_roadmap: 'Roadmap',
        nav_team: 'Team',
        hero_title: 'Dove l’innovazione incontra l’eccellenza',
        hero_desc: 'J.M Enterprises guida le tecnologie di nuova generazione che ridefiniscono la salute mentale umana.',
        hero_btn1: 'Scopri Harmonia',
        hero_btn2: 'Beta Annina',
        about_title: 'La nostra visione',
        about_desc: 'Pionieri della prossima generazione di tecnologie trasformative',
        about_h3: 'Ridefinire le possibilità',
        about_p1: 'Fondata da <strong>Claudio Montoya nel 2025</strong>, J.M Enterprises nasce da una missione semplice ma potente:',
        about_p2: 'Costruire prodotti accessibili, intelligenti e umani che migliorano la vita -> ovunque.',
        about_p3: 'Il nostro obiettivo è democratizzare l’innovazione, offrendo soluzioni che uniscono la potenza di <strong>AI e tecnologia moderna con semplicità ed empatia</strong>.',
        about_p4: 'Crediamo che l’innovazione non debba essere un lusso, ma un diritto per tutti, indipendentemente da reddito, lingua o provenienza.',
        about_btn: 'Conosci i visionari',
        products_title: 'Le nostre innovazioni',
        products_desc: 'Tecnologie rivoluzionarie per trasformare le industrie',
        product1_title: 'Harmonia',
        product1_desc: 'Un’app intelligente per il benessere mentale ed emotivo. Grazie all’AI, Harmonia ascolta, impara e cresce con te aiutando a monitorare l’umore, riflettere e sentirsi compresi quando conta di più.',
        product1_btn: 'Scopri Harmonia',
        product1_tagline: 'Costruire la salute di domani',
        product2_title: 'Saint & Co.',
        product2_desc: 'App di business analytics per professionisti moderni: da ristoranti e hotel a freelance e negozi online. Dashboard interattive e personalizzabili per monitorare fatture, traffico, inventario, spese, clienti e altro. Con AI, Saint anticipa trend, rileva inefficienze e offre insight per ottimizzare e ridurre sprechi.',
        product2_btn: 'Scopri Saint & Co.',
        product3_title: 'AuraX',
        product3_desc: 'AuraX è il primo coach al mondo basato su AI per la performance cognitiva ed energetica, progettato per aiutare le persone a sbloccare la massima concentrazione, l’equilibrio emotivo e la chiarezza mentale. Grazie ad analisi in tempo reale e guida personalizzata, AuraX permette di dominare il proprio stato interiore e dare il meglio ogni giorno.',
        product3_btn: 'Scopri Quantum',
        roadmap_title: 'Roadmap strategica',
        roadmap_desc: 'Il nostro percorso verso la leadership tecnologica',
        roadmap_q1: 'Lancio di Harmonia (Beta gratuita)',
        roadmap_q1_desc: 'Il primo rilascio pubblico di Harmonia sarà completamente gratuito per un periodo di tempo limitato. L’obiettivo è offrire supporto emotivo accessibile a tutti, raccogliendo feedback per il miglioramento della piattaforma..',
        roadmap_q2: 'Integrazione funzionalità Premium su Harmonia',
        roadmap_q2_desc: 'Verranno introdotte nuove funzionalità avanzate, come la possibilità di parlare direttamente con Annina tramite chiamate vocali AI, e ricevere messaggi audio personalizzati.',
        roadmap_q3: 'Lancio ufficiale di Saint & Co.',
        roadmap_q3_desc: 'Saint & Co. sarà una piattaforma professionale per freelancers, imprenditori e piccole attività. Il lancio avverrà con già attive funzionalità premium dedicate alla gestione e al potenziamento del proprio business.',
        roadmap_q4: 'Novità su AuraX',
        roadmap_q4_desc: 'AuraX, il nostro AI coach per la performance cognitiva ed energetica, sarà protagonista di importanti annunci e rivelazioni.',
        team_title: 'Leadership visionaria',
        team_desc: 'Le menti che plasmano il nostro futuro tecnologico',
        team1_name: 'Claudio Montoya',
        team1_pos: 'Fondatore & CEO',
        team1_desc: 'Guida anche innovazione prodotto & ingegneria.',
        team2_name: 'N/D',
        team2_pos: 'CTO',
        team2_desc: 'N/D',
        team3_name: 'N/D',
        team3_pos: 'CIO',
        team3_desc: 'N/D',
        team4_name: 'N/D',
        team4_pos: 'Responsabile Quantum Research',
        team4_desc: 'N/D',
        footer_company: 'J.M Enterprises',
        footer_desc: 'Pionieri del futuro con tecnologie rivoluzionarie che trasformano le industrie e valorizzano il potenziale umano.',
        footer_portfolio: 'Il nostro portfolio',
        footer_about: 'Chi siamo',
        footer_leadership: 'Leadership', // This was already removed in a previous step, but keeping it here for consistency with the original file's structure.
        footer_contact: 'Contatti',
        copyright: '&copy; 2025 J.M Enterprises Holdings. Tutti i diritti riservati. | Con amore per Annina & Mamma.',
        // Forum translations
        nav_forum: 'Forum',
        forum_main_title: 'Unisciti alla Community',
        forum_main_desc: 'Rimani aggiornato, esprimi il tuo interesse o contattaci.',
        label_forum_name: 'Nome',
        forum_name_ph: 'Il tuo nome',
        label_forum_email: 'Email',
        forum_email_ph: 'La tua email',
        label_forum_phone: 'Telefono (Opzionale)',
        forum_phone_ph: 'Il tuo numero di telefono',
        label_forum_interest: 'Sono interessato/a a',
        forum_select_option: 'Seleziona...',
        forum_interest_newsletter: 'Newsletter',
        forum_interest_wishlist: "Lista d'attesa Prodotti",
        forum_interest_contact: 'Contatto generico',
        forum_interest_all: 'Tutte le precedenti',
        label_forum_consent_text: "Confermo di volermi iscrivere alla newsletter e alla lista d'attesa.",
        forum_submit_btn: 'Invia',
        forum_thank_you_title: 'Richiesta Inviata!',
        forum_thank_you_message: "Grazie {name}! La tua richiesta è stata inviata con successo.",
        error_consent_required: "Devi accettare per iscriverti alla newsletter e alla lista d'attesa.",
        sending: 'Invio in corso...'
    },
    fr: {
        nav_about: 'À propos',
        nav_products: 'Produits',
        nav_roadmap: 'Feuille de route',
        nav_team: 'Équipe',
        hero_title: "Où l’innovation rencontre l’excellence", 
        hero_desc: 'J.M Enterprises ouvre la voie à une nouvelle génération de technologies qui transforment en profondeur la santé mentale humaine.',
        hero_btn1: 'Découvrir Harmonia',
        hero_btn2: 'Beta Annina',
        about_title: 'Notre vision',
        about_desc: 'Pionniers de la prochaine génération de technologies transformatrices',
        about_h3: 'Redéfinir les possibles',
        about_p1: 'Fondée par <strong>Claudio Montoya en 2025</strong>, J.M Enterprises est née d’une mission simple mais puissante :',
        about_p2: 'Créer des produits accessibles, intelligents et humains qui améliorent la vie -> partout.',
        about_p3: 'Notre objectif est de démocratiser l’innovation, en offrant des solutions qui allient la puissance de <strong>l’IA et de la technologie moderne à la simplicité et à l’empathie</strong>.',
        about_p4: 'Nous pensons que l’innovation ne doit pas être un luxe, mais un droit pour tous, quel que soit le revenu, la langue ou l’origine.',
        about_btn: 'Rencontrer les visionnaires',
        products_title: 'Nos innovations',
        products_desc: 'Des technologies révolutionnaires pour transformer les industries',
        product1_title: 'Harmonia',
        product1_desc: 'Une application intelligente pour le bien-être mental et émotionnel. Grâce à l’IA, Harmonia écoute, apprend et évolue avec vous, aidant à suivre l’humeur, à réfléchir et à se sentir compris quand cela compte le plus.',
        product1_btn: 'Découvrir Harmonia',
        product1_tagline: 'Construire la santé de demain',
        product2_title: 'Saint & Co.',
        product2_desc: 'Application d’analyse commerciale pour les professionnels modernes : des restaurants et hôtels aux indépendants et boutiques en ligne. Tableaux de bord interactifs et personnalisables pour suivre factures, trafic, stocks, dépenses, clients et plus. Avec l’IA, Saint anticipe les tendances, détecte les inefficacités et propose des insights pour optimiser et réduire le gaspillage.',
        product2_btn: 'Découvrir Saint & Co.',
        product3_title: 'AuraX',
        product3_desc: 'AuraX est le premier coach au monde alimenté par l’IA pour la performance cognitive et énergétique, conçu pour aider chacun à atteindre une concentration optimale, l’équilibre émotionnel et la clarté mentale. Grâce à une analyse en temps réel et des conseils personnalisés, AuraX permet de maîtriser son état intérieur et d’exceller chaque jour.',
        product3_btn: 'Découvrir Quantum',
        roadmap_title: 'Feuille de route stratégique',
        roadmap_desc: 'Notre parcours vers le leadership technologique',
        roadmap_q1: 'Lancement d’Harmonia (bêta gratuite)',
        roadmap_q1_desc: 'La première version publique d’Harmonia sera entièrement gratuite pendant une période limitée. L’objectif est d’offrir un soutien émotionnel accessible à tous, tout en recueillant des retours utilisateurs.',
        roadmap_q2: 'Intégration des fonctionnalités Premium sur Harmonia',
        roadmap_q2_desc: 'Des fonctionnalités avancées seront ajoutées, telles que la possibilité d’appeler Annina via l’IA vocale, et de recevoir des messages audio personnalisés.',
        roadmap_q3: 'Lancement officiel de Saint & Co.',
        roadmap_q3_desc: 'Saint & Co. sera une plateforme professionnelle pour les freelances, entrepreneurs et petites entreprises. Le lancement se fera directement avec des fonctionnalités premium.',
        roadmap_q4: 'Annonces autour d’AuraX',
        roadmap_q4_desc: 'AuraX, notre coach IA pour la performance cognitive et énergétique, fera l’objet de grandes annonces.',
        team_title: 'Leadership visionnaire',
        team_desc: 'Les esprits qui façonnent notre avenir technologique',
        team1_name: 'Claudio Montoya',
        team1_pos: 'Fondateur & CEO',
        team1_desc: 'Dirige également l’innovation produit & ingénierie.',
        team2_name: 'N/D',
        team2_pos: 'CTO',
        team2_desc: 'N/D',
        team3_name: 'N/D',
        team3_pos: 'CIO',
        team3_desc: 'N/D',
        team4_name: 'N/D',
        team4_pos: 'Responsable Quantum Research',
        team4_desc: 'N/D',
        footer_company: 'J.M Enterprises',
        footer_desc: 'Pionniers du futur grâce à des technologies révolutionnaires qui transforment les industries et valorisent le potentiel humain.',
        footer_portfolio: 'Notre portfolio',
        footer_about: 'À propos',
        footer_leadership: 'Leadership', // This was already removed in a previous step, but keeping it here for consistency with the original file's structure.
        footer_contact: 'Contact',
        copyright: '&copy; 2025 J.M Enterprises Holdings. Tous droits réservés. | Avec amour pour Annina & Mère.',
        // Forum translations
        nav_forum: 'Forum',
        forum_main_title: 'Rejoignez notre communauté',
        forum_main_desc: 'Restez informé, partagez votre intérêt ou contactez-nous.',
        label_forum_name: 'Nom',
        forum_name_ph: 'Votre nom',
        label_forum_email: 'Email',
        forum_email_ph: 'Votre email',
        label_forum_phone: 'Téléphone (Optionnel)',
        forum_phone_ph: 'Votre numéro de téléphone',
        label_forum_interest: 'Je suis intéressé(e) par',
        forum_select_option: 'Sélectionner...',
        forum_interest_newsletter: 'Newsletter',
        forum_interest_wishlist: "Liste d'attente Produits",
        forum_interest_contact: 'Contact général',
        forum_interest_all: 'Tout ce qui précède',
        label_forum_consent_text: "Je confirme vouloir m'inscrire à la newsletter et à la liste d'attente.",
        forum_submit_btn: 'Envoyer',
        forum_thank_you_title: 'Demande envoyée !',
        forum_thank_you_message: "Merci {name} ! Votre demande a été envoyée avec succès.",
        error_consent_required: "Vous devez accepter pour vous inscrire à la newsletter et à la liste d'attente.",
        sending: 'Envoi en cours...'
    },
    es: {
        nav_about: 'Sobre nosotros',
        nav_products: 'Productos',
        nav_roadmap: 'Hoja de ruta',
        nav_team: 'Equipo',
        hero_title: 'Donde la innovación se encuentra con la excelencia',
        hero_desc: 'J.M Enterprises lidera tecnologías de nueva generación que redefinen la salud mental humana.',
        hero_btn1: 'Explora Harmonia',
        hero_btn2: 'Beta Annina',
        about_title: 'Nuestra visión',
        about_desc: 'Pioneros de la próxima generación de tecnologías transformadoras',
        about_h3: 'Redefiniendo posibilidades',
        about_p1: 'Fundada por <strong>Claudio Montoya en 2025</strong>, J.M Enterprises nació de una misión simple pero poderosa:',
        about_p2: 'Construir productos accesibles, inteligentes y humanos que mejoren vidas -> en todas partes.',
        about_p3: 'Nuestro objetivo es democratizar la innovación, ofreciendo soluciones que combinan el poder de <strong>la IA y la tecnología moderna con simplicidad y empatía</strong>.',
        about_p4: 'Creemos que la innovación no debe ser un lujo, sino un derecho para todos, independientemente de los ingresos, el idioma o el origen.',
        about_btn: 'Conoce a los visionarios',
        products_title: 'Nuestras innovaciones',
        products_desc: 'Tecnologías revolucionarias para transformar industrias',
        product1_title: 'Harmonia',
        product1_desc: 'Una app inteligente para el bienestar mental y emocional. Gracias a la IA, Harmonia escucha, aprende y crece contigo ayudando a monitorizar el estado de ánimo, reflexionar y sentirse comprendido cuando más importa.',
        product1_btn: 'Descubre Harmonia',
        product1_tagline: 'Construyendo la salud del mañana',
        product2_title: 'Saint & Co.',
        product2_desc: 'App de análisis empresarial para profesionales modernos: desde restaurantes y hoteles hasta freelancers y tiendas online. Paneles interactivos y personalizables para monitorizar facturas, tráfico, inventario, gastos, clientes y más. Con IA, Saint anticipa tendencias, detecta ineficiencias y ofrece insights para optimizar y reducir desperdicios.',
        product2_btn: 'Explora Saint & Co.',
        product3_title: 'AuraX',
        product3_desc: 'AuraX es el primer coach del mundo impulsado por IA para el rendimiento cognitivo y energético, diseñado para ayudar a las personas a alcanzar su máxima concentración, equilibrio emocional y claridad mental. Con análisis en tiempo real y orientación personalizada, AuraX permite dominar el estado interior y rendir al máximo cada día.',
        product3_btn: 'Descubre Quantum',
        roadmap_title: 'Hoja de ruta estratégica',
        roadmap_desc: 'Nuestro camino hacia el liderazgo tecnológico',
        roadmap_q1: 'Lanzamiento de Harmonia (beta gratuita)',
        roadmap_q1_desc: 'La primera versión pública de Harmonia será totalmente gratuita por un período limitado. El objetivo es ofrecer apoyo emocional accesible y recoger feedback para futuras mejoras.',
        roadmap_q2: 'Integración de funciones Premium en Harmonia',
        roadmap_q2_desc: 'Se lanzarán funciones avanzadas, como llamadas de voz con Annina (IA) y la recepción de mensajes de audio personalizados.',
        roadmap_q3: 'Lanzamiento oficial de Saint & Co.',
        roadmap_q3_desc: 'Saint & Co. será una plataforma profesional para freelancers, emprendedores y pequeños negocios. Se lanzará con funciones premium activas desde el inicio.',
        roadmap_q4: 'Novedades sobre AuraX',
        roadmap_q4_desc: 'AuraX, nuestro coach de IA para el rendimiento cognitivo y energético, será protagonista de anuncios clave y actualizaciones importantes.',
        team_title: 'Liderazgo visionario',
        team_desc: 'Las mentes que dan forma a nuestro futuro tecnológico',
        team1_name: 'Claudio Montoya',
        team1_pos: 'Fundador & CEO',
        team1_desc: 'También lidera innovación de producto e ingeniería.',
        team2_name: 'N/D',
        team2_pos: 'CTO',
        team2_desc: 'N/D',
        team3_name: 'N/D',
        team3_pos: 'CIO',
        team3_desc: 'N/D',
        team4_name: 'N/D',
        team4_pos: 'Responsable Quantum Research',
        team4_desc: 'N/D',
        footer_company: 'J.M Enterprises',
        footer_desc: 'Pioneros del futuro con tecnologías revolucionarias que transforman industrias y potencian el talento humano.',
        footer_portfolio: 'Nuestro portfolio',
        footer_about: 'Sobre nosotros',
        footer_leadership: 'Liderazgo', // This was already removed in a previous step, but keeping it here for consistency with the original file's structure.
        footer_contact: 'Contacto',
        copyright: '&copy; 2025 J.M Enterprises Holdings. Todos los derechos reservados. | Con amor para Annina & Mamà.',
        // Forum translations
        nav_forum: 'Foro',
        forum_main_title: 'Únete a nuestra comunidad',
        forum_main_desc: 'Mantente actualizado, comparte tu interés o ponte en contacto con nosotros.',
        label_forum_name: 'Nombre',
        forum_name_ph: 'Tu nombre',
        label_forum_email: 'Email',
        forum_email_ph: 'Tu email',
        label_forum_phone: 'Teléfono (Opcional)',
        forum_phone_ph: 'Tu número de teléfono',
        label_forum_interest: 'Estoy interesado/a en',
        forum_select_option: 'Seleccionar...',
        forum_interest_newsletter: 'Boletín informativo',
        forum_interest_wishlist: 'Lista de espera de Productos',
        forum_interest_contact: 'Contacto general',
        forum_interest_all: 'Todo lo anterior',
        label_forum_consent_text: 'Confirmo que quiero suscribirme al boletín y a la lista de espera.',
        forum_submit_btn: 'Enviar',
        forum_thank_you_title: '¡Solicitud Enviada!',
        forum_thank_you_message: "¡Gracias {name}! Tu solicitud ha sido enviada con éxito.",
        error_consent_required: 'Debes aceptar para suscribirte al boletín y a la lista de espera.',
        sending: 'Enviando...'
    }
};
// --- HERO TITLE TYPING ANIMATION ---
let heroTypingTimeout = null;
let heroTypingErasingTimeout = null;
let heroTypingIsAnimating = false;
let heroTypingCurrentText = '';

function animateHeroTitle(text) {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;
    // Stop any previous animation
    if (heroTypingTimeout) clearTimeout(heroTypingTimeout);
    if (heroTypingErasingTimeout) clearTimeout(heroTypingErasingTimeout);
    heroTypingIsAnimating = false;
    heroTitle.classList.remove('typing');
    heroTitle.textContent = '';
    heroTypingCurrentText = text;
    // Only animate on desktop
    if (window.innerWidth <= 768) {
        heroTitle.textContent = text;
        return;
    }
    let i = 0;
    heroTitle.classList.add('typing');
    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            heroTypingTimeout = setTimeout(type, 100);
        } else {
            heroTypingTimeout = setTimeout(erase, 2000);
        }
    }
    function erase() {
        if (heroTitle.textContent.length > 0) {
            heroTitle.textContent = heroTitle.textContent.slice(0, -1);
            heroTypingErasingTimeout = setTimeout(erase, 50);
        } else {
            heroTypingTimeout = setTimeout(() => animateHeroTitle(text), 500);
        }
    }
    type();
}
window.addEventListener('resize', () => {
    // Re-animate on resize for desktop/mobile switch
    const lang = localStorage.getItem('siteLang') || 'en';
    animateHeroTitle(translations[lang].hero_title);
});
// --- END HERO TITLE TYPING ANIMATION ---

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    document.getElementById('current-lang-flag').src = langFlags[lang];
    // Navbar
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks[0].textContent = translations[lang].nav_about;
    navLinks[1].textContent = translations[lang].nav_products;
    navLinks[2].textContent = translations[lang].nav_roadmap;
    navLinks[3].textContent = translations[lang].nav_team;
    if (navLinks[4]) navLinks[4].textContent = translations[lang].nav_forum;
    // Hero
    animateHeroTitle(translations[lang].hero_title);
    document.getElementById('hero-desc').textContent = translations[lang].hero_desc;
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    heroBtns[0].textContent = translations[lang].hero_btn1;
    heroBtns[1].textContent = translations[lang].hero_btn2;
    // About
    document.querySelector('#about .section-header h2').textContent = translations[lang].about_title;
    document.querySelector('#about .section-header p').textContent = translations[lang].about_desc;
    const aboutText = document.querySelector('.about-text');
    aboutText.querySelector('h3').textContent = translations[lang].about_h3;
    const aboutPs = aboutText.querySelectorAll('p');
    aboutPs[0].innerHTML = translations[lang].about_p1;
    aboutPs[1].textContent = translations[lang].about_p2;
    aboutPs[2].innerHTML = translations[lang].about_p3;
    aboutPs[3].textContent = translations[lang].about_p4;
    aboutText.querySelector('a').textContent = translations[lang].about_btn;
    // Products
    document.querySelector('#products .section-header h2').textContent = translations[lang].products_title;
    document.querySelector('#products .section-header p').textContent = translations[lang].products_desc;
    const productCards = document.querySelectorAll('.product-card');
    // Aggiorna solo i testi dentro .product-content, non toccare immagini
    if (productCards[0]) {
        const pc = productCards[0].querySelector('.product-content');
        if (pc) {
            const h3 = pc.querySelector('h3');
            const p = pc.querySelector('p');
            const a = pc.querySelector('a');
            if (h3) h3.textContent = translations[lang].product1_title;
            if (p) p.textContent = translations[lang].product1_desc;
            if (a) a.textContent = translations[lang].product1_btn;
        }
    }
    if (productCards[1]) {
        const pc = productCards[1].querySelector('.product-content');
        if (pc) {
            const h3 = pc.querySelector('h3');
            const p = pc.querySelector('p');
            const a = pc.querySelector('a');
            if (h3) h3.textContent = translations[lang].product2_title;
            if (p) p.textContent = translations[lang].product2_desc;
            if (a) a.textContent = translations[lang].product2_btn;
        }
    }
    if (productCards[2]) {
        const pc = productCards[2].querySelector('.product-content');
        if (pc) {
            const h3 = pc.querySelector('h3');
            const p = pc.querySelector('p');
            const a = pc.querySelector('a');
            if (h3) h3.textContent = translations[lang].product3_title;
            if (p) p.textContent = translations[lang].product3_desc;
            if (a) a.textContent = translations[lang].product3_btn;
        }
    }
    // Roadmap
    document.querySelector('#roadmap .section-header h2').textContent = translations[lang].roadmap_title;
    document.querySelector('#roadmap .section-header p').textContent = translations[lang].roadmap_desc;
    const timeline = document.querySelectorAll('.timeline-container');
    timeline[0].querySelector('h3').textContent = translations[lang].roadmap_q1;
    timeline[0].querySelector('p').textContent = translations[lang].roadmap_q1_desc;
    timeline[1].querySelector('h3').textContent = translations[lang].roadmap_q2;
    timeline[1].querySelector('p').textContent = translations[lang].roadmap_q2_desc;
    timeline[2].querySelector('h3').textContent = translations[lang].roadmap_q3;
    timeline[2].querySelector('p').textContent = translations[lang].roadmap_q3_desc;
    timeline[3].querySelector('h3').textContent = translations[lang].roadmap_q4;
    timeline[3].querySelector('p').textContent = translations[lang].roadmap_q4_desc;
    // Team
    document.querySelector('#team .section-header h2').textContent = translations[lang].team_title;
    document.querySelector('#team .section-header p').textContent = translations[lang].team_desc;
    const teamCards = document.querySelectorAll('.team-card');
    teamCards[0].querySelector('h3').textContent = translations[lang].team1_name;
    teamCards[0].querySelector('.position').textContent = translations[lang].team1_pos;
    teamCards[0].querySelector('p').textContent = translations[lang].team1_desc;
    teamCards[1].querySelector('h3').textContent = translations[lang].team2_name;
    teamCards[1].querySelector('.position').textContent = translations[lang].team2_pos;
    teamCards[1].querySelector('p').textContent = translations[lang].team2_desc;
    teamCards[2].querySelector('h3').textContent = translations[lang].team3_name;
    teamCards[2].querySelector('.position').textContent = translations[lang].team3_pos;
    teamCards[2].querySelector('p').textContent = translations[lang].team3_desc;
    teamCards[3].querySelector('h3').textContent = translations[lang].team4_name;
    teamCards[3].querySelector('.position').textContent = translations[lang].team4_pos;
    teamCards[3].querySelector('p').textContent = translations[lang].team4_desc;
    // Footer (aggiorna solo i testi, non le icone social o i contatti)
    const footerColumns = document.querySelectorAll('.footer-column');
    // Colonna 1: solo titolo e descrizione
    footerColumns[0].querySelector('h3').textContent = translations[lang].footer_company;
    const footerDesc = footerColumns[0].querySelector('p');
    if (footerDesc) footerDesc.textContent = translations[lang].footer_desc;
    // Colonna 2: Portfolio
    footerColumns[1].querySelector('h3').textContent = translations[lang].footer_portfolio;
    const portfolioLinks = footerColumns[1].querySelectorAll('a');
    if (portfolioLinks[0]) portfolioLinks[0].textContent = translations[lang].product1_title + ' | ' + translations[lang].product1_tagline;
    if (portfolioLinks[1]) portfolioLinks[1].textContent = translations[lang].product2_title;
    if (portfolioLinks[2]) portfolioLinks[2].textContent = translations[lang].product3_title;
    // Colonna 3: Company
    footerColumns[2].querySelector('h3').textContent = translations[lang].footer_company;
    const companyLinks = footerColumns[2].querySelectorAll('a');
    if (companyLinks[0]) companyLinks[0].textContent = translations[lang].footer_about;
    // Colonna 4: solo titolo (contatti lasciati invariati)
    footerColumns[3].querySelector('h3').textContent = translations[lang].footer_contact;
    // Copyright
    document.querySelector('.copyright p').innerHTML = translations[lang].copyright;
    // Forum Section
    const forumMainTitle = document.getElementById('forum-main-title');
    if (forumMainTitle) forumMainTitle.textContent = translations[lang].forum_main_title;
    const forumMainDesc = document.getElementById('forum-main-desc');
    if (forumMainDesc) forumMainDesc.textContent = translations[lang].forum_main_desc;
    
    document.getElementById('label-forum-name').textContent = translations[lang].label_forum_name;
    document.getElementById('forum-name').placeholder = translations[lang].forum_name_ph;
    document.getElementById('label-forum-email').textContent = translations[lang].label_forum_email;
    document.getElementById('forum-email').placeholder = translations[lang].forum_email_ph;
    document.getElementById('label-forum-phone').textContent = translations[lang].label_forum_phone;
    document.getElementById('forum-phone').placeholder = translations[lang].forum_phone_ph;
    document.getElementById('label-forum-interest').textContent = translations[lang].label_forum_interest;
    document.getElementById('forum-select-option').textContent = translations[lang].forum_select_option;
    document.getElementById('forum-interest-newsletter').textContent = translations[lang].forum_interest_newsletter;
    document.getElementById('forum-interest-wishlist').textContent = translations[lang].forum_interest_wishlist;
    document.getElementById('forum-interest-contact').textContent = translations[lang].forum_interest_contact;
    document.getElementById('forum-interest-all').textContent = translations[lang].forum_interest_all;
    document.getElementById('label-forum-consent-text').textContent = translations[lang].label_forum_consent_text;
    document.getElementById('forum-submit-btn').textContent = translations[lang].forum_submit_btn;
}
// Dropdown logic
const langSwitcher = document.querySelector('.lang-switcher');
const langDropdown = langSwitcher.querySelector('.lang-dropdown');
const currentFlag = document.getElementById('current-lang-flag');
currentFlag.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
});

langDropdown.querySelectorAll('.lang-flag-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const lang = item.getAttribute('data-lang');
        setLanguage(lang);
        langDropdown.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (langDropdown.classList.contains('active') && !langSwitcher.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});
// On load, set language
let userLang = localStorage.getItem('siteLang') || (navigator.language || navigator.userLanguage).slice(0,2);
if(!['en','it','fr','es'].includes(userLang)) userLang = 'en';
setLanguage(userLang);

// Theme switch functionality
themeSwitchBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('light-mode', !darkMode);
    themeSwitchBtn.innerHTML = darkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Mobile menu open/close
mobileMenu.addEventListener('click', (e) => {
    navLinks.classList.toggle('active');
    mobileMenu.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    if(navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});
// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    });
});
// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if(navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-image, .product-card, .timeline-container, .team-card');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if(elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
});

// Hover effect for cards
const cards = document.querySelectorAll('.product-card, .timeline-content, .team-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = card.classList.contains('product-card') ? 
            'translateY(-15px)' : 
            card.classList.contains('timeline-content') ? 
            'translateY(-10px)' : 
            'translateY(-15px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Aura toggle functionality
const auraToggleBtn = document.getElementById('aura-toggle');
const bodyElement = document.body;

function setAuraState(disabled) {
    bodyElement.classList.toggle('aura-disabled', disabled);
    localStorage.setItem('auraDisabled', disabled ? 'true' : 'false');
    if (disabled) {
        auraToggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
        auraToggleBtn.title = 'Enable Aura Animation';
    } else {
        auraToggleBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i>';
        auraToggleBtn.title = 'Disable Aura Animation';
    }
}

if (auraToggleBtn) {
    auraToggleBtn.addEventListener('click', () => {
        setAuraState(!bodyElement.classList.contains('aura-disabled'));
    });

    // On load, set aura state from localStorage
    const savedAuraState = localStorage.getItem('auraDisabled');
    if (savedAuraState === 'true') {
        setAuraState(true);
    } else {
        setAuraState(false); // Default to enabled
    }
} else {
    // console.warn('Aura toggle button not found.');
}

// EmailJS Init (User ID from feedback.html)
emailjs.init('LNSdjwcw1c8GB1a8c');

const contactForum = document.getElementById('contact-forum');
if (contactForum) {
    contactForum.addEventListener('submit', function(e) {
        e.preventDefault();
        const consentCheckbox = document.getElementById('forum-consent');
        const currentLang = localStorage.getItem('siteLang') || 'en'; // Get current language for alerts

        if (!consentCheckbox.checked) {
            alert(translations[currentLang].error_consent_required || 'You must agree to subscribe to the newsletter and waitlist.');
            return;
        }

        const forumNameInput = document.getElementById('forum-name');
        const forumName = forumNameInput.value;
        
        const params = {
            name: forumName, // Simile a feedback.html
            email: document.getElementById('forum-email').value, // Simile a feedback.html
            phone: document.getElementById('forum-phone').value || 'N/A', // Parametro specifico per questo forum
            interest_type: document.getElementById('forum-interest').value, // Rinomina per chiarezza, simile a 'type' in feedback
            consent_given: consentCheckbox.checked, // Rinomina per chiarezza
        };

        const submitButton = document.getElementById('forum-submit-btn');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = translations[currentLang].sending || 'Sending...';

        // !!! SOSTITUISCI 'YOUR_ACTUAL_NEW_FORUM_TEMPLATE_ID' CON L'ID DEL TUO NUOVO TEMPLATE SPECIFICO PER QUESTO FORUM !!!
        emailjs.send('service_va7c6jv', 'template_fj0csco', params)
            .then(function(response) {
                contactForum.style.display = 'none';
                const successDiv = document.getElementById('forum-success-message');
                const thankYouTitle = document.getElementById('forum-thankyou-title-text');
                const thankYouMessage = document.getElementById('forum-thankyou-msg-text');
                const thankYouMsg = (translations[currentLang].forum_thank_you_message || "Thank you {name}! Your request has been successfully submitted.").replace('{name}', forumName);
                thankYouTitle.textContent = translations[currentLang].forum_thank_you_title || "Request Sent!";
                thankYouMessage.textContent = thankYouMsg;
                successDiv.style.display = 'block';
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, function(error) {
                alert((translations[currentLang].forum_error_send || 'Error sending: ') + JSON.stringify(error));
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });
}
// Carousel Arrow Controls
function setupCarouselControls(gridSelector, prevBtnSelector, nextBtnSelector) {
    const grid = document.querySelector(gridSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    if (!grid || !prevBtn || !nextBtn) {
        // console.warn('Carousel elements not found for:', gridSelector);
        return;
    }

    function updateCarouselState() {
        const isMobileLayout = getComputedStyle(grid).display === 'flex';

        if (!isMobileLayout) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        prevBtn.style.display = 'block'; // Ensure buttons are visible if in flex layout
        nextBtn.style.display = 'block';

        const scrollLeft = grid.scrollLeft;
        const scrollWidth = grid.scrollWidth;
        const clientWidth = grid.clientWidth;
        
        prevBtn.disabled = scrollLeft <= 1; // Use a small threshold for start
        nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 1; // Use a small threshold for end
    }

    prevBtn.addEventListener('click', () => {
        const card = grid.querySelector(':scope > div'); // Get a card element
        if (!card) return;
        const scrollAmount = card.offsetWidth + parseFloat(getComputedStyle(grid).gap);
        grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        const card = grid.querySelector(':scope > div');
        if (!card) return;
        const scrollAmount = card.offsetWidth + parseFloat(getComputedStyle(grid).gap);
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    grid.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', updateCarouselState);
    updateCarouselState(); // Initial check
}

document.addEventListener('DOMContentLoaded', () => {
    setupCarouselControls('#products .products-grid', '.product-prev-arrow', '.product-next-arrow');
    setupCarouselControls('#team .team-grid', '.team-prev-arrow', '.team-next-arrow');
});
// Back to Top Button functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.getElementById('backToTop');
  function toggleBackToTop() {
    if (window.scrollY > 300) { // Mostra il pulsante un po' più in basso
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
    }
  }
  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTop.addEventListener('click', () => {
    backToTop.classList.add('clicked');
    setTimeout(() => backToTop.classList.remove('clicked'), 700); // Animazione del pulsante

    // Scroll verso l'alto più veloce
    const initialScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (initialScroll > 0) {
      const scrollStep = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          // Aumenta la velocità di scroll:
          // Math.max(valore_minimo_pixel_per_frame, currentScroll / fattore_di_velocità)
          // Un fattore_di_velocità più piccolo rende lo scroll più rapido.
          // Un valore_minimo_pixel_per_frame più alto assicura una velocità minima.
          window.scrollBy(0, -Math.max(40, Math.floor(currentScroll / 5)));
          requestAnimationFrame(scrollStep);
        }
      }
      scrollStep();
    }
  });
});

// Navbar trasparente quando scrolli verso il basso
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;
function updateNavbarTransparency() {
    if (window.scrollY > 10) {
        nav.classList.add('navbar-transparent');
        nav.classList.remove('navbar-solid');
    } else {
        nav.classList.remove('navbar-transparent');
        nav.classList.add('navbar-solid');
    }
}
window.addEventListener('scroll', updateNavbarTransparency);
// Imposta stato iniziale
updateNavbarTransparency();
// Aggiorna navbar anche su cambio tema
const themeSwitch = document.querySelector('.theme-switch');
if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        setTimeout(updateNavbarTransparency, 10);
    });
}
// Hero animated background (particles)
const canvas = document.querySelector('.hero-bg-anim');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = document.querySelector('.hero').offsetHeight;
  canvas.width = w; canvas.height = h;
  let particles = [];
  const colors = ['#ffd700', '#ffb300', '#fff', '#a1a1aa'];
  function resizeCanvas() {
    w = window.innerWidth;
    h = document.querySelector('.hero').offsetHeight;
    canvas.width = w; canvas.height = h;
  }
  window.addEventListener('resize', resizeCanvas);

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random() * 2.2 + 1.2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.5 + 0.3;
    this.dx = (Math.random() - 0.5) * 0.7;
    this.dy = (Math.random() - 0.5) * 0.7;
  }
  Particle.prototype.draw = function() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.restore();
  }
  Particle.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    if(this.x < 0 || this.x > w) this.dx *= -1;
    if(this.y < 0 || this.y > h) this.dy *= -1;
  }
  function initParticles() {
    particles = [];
    let count = Math.floor(w / 14);
    for(let i=0; i<count; i++) particles.push(new Particle());
  }
  function animate() {
    ctx.clearRect(0,0,w,h);
    for(let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  initParticles();
  animate();
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}