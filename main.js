document.addEventListener('DOMContentLoaded', () => {

    // ------------------ THEME TOGGLE LOGIC ------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ------------------ MOBILE BURGER MENU ------------------
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__nav');
    const headerWrapper = document.querySelector('.header');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        headerWrapper.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    nav.querySelectorAll('.header__nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('no-scroll')) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                headerWrapper.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });

    // ------------------ FIXED HEADER ON SCROLL ------------------
    const header = document.querySelector('.header');
    const handleHeaderScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // ------------------ HERO SECTION IMAGE SLIDESHOW ------------------
    const heroImages = document.querySelectorAll('.hero__bg-img');
    let currentImageIndex = 0;

    function showNextImage() {
        if (heroImages.length < 2) return;
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }

    if (window.innerWidth > 768) {
        setInterval(showNextImage, 5000);
    }

    // ------------------ PROJECTS SLIDER (SWIPER) ------------------
    new Swiper('.projects-slider', {
        loop: true,
        spaceBetween: 20,
        speed: 1000,
        autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 15 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 }
        }
    });

    // ------------------ ABOUT SECTION POPUP ------------------
    const gridImages = document.querySelectorAll('.about__grid-image');
    const popup = document.querySelector('.popup');
    const popupImg = document.querySelector('.popup__img');

    if (popup && popupImg) {
        const popupClose = document.querySelector('.popup__close');
        const openPopup = (e) => {
            popup.classList.add('active');
            popupImg.src = e.target.src;
            body.classList.add('no-scroll');
        }
        const closePopup = () => {
            popup.classList.remove('active');
            body.classList.remove('no-scroll');
        }
        gridImages.forEach(image => image.addEventListener('click', openPopup));
        popupClose.addEventListener('click', closePopup);
        popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && popup.classList.contains('active')) closePopup(); });
    }

    // ------------------ FAQ SECTION ACCORDION ------------------
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ------------------ REVIEWS SLIDER (SWIPER) ------------------
    new Swiper('.reviews-slider', {
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        speed: 1000,
        autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, centeredSlides: false },
            1200: { slidesPerView: 3, centeredSlides: true }
        }
    });

    // ------------------ ALIGN ABOUT SECTION HEIGHTS ------------------
    const alignAboutSectionHeights = () => {
        const textWrapper = document.querySelector('.about__text-wrapper');
        const imageGrid = document.querySelector('.about__image-grid');
        if (!textWrapper || !imageGrid) return;
        if (window.innerWidth > 992) {
            imageGrid.style.height = 'auto';
            requestAnimationFrame(() => {
                imageGrid.style.height = `${textWrapper.offsetHeight}px`;
            });
        } else {
            imageGrid.style.height = 'auto';
        }
    }
    window.addEventListener('load', alignAboutSectionHeights);
    window.addEventListener('resize', alignAboutSectionHeights);

    // ------------------ SCROLL REVEAL ANIMATION ------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});