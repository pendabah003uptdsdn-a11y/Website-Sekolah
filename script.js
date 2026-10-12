
/* =====================================================
   UPTD SDN PENDABAH 3 KAMAL
   SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================================
       1. MENU NAVIGASI AKTIF
    ================================================ */

    const navLinks = document.querySelectorAll(".nav-menu a");

    const sections = document.querySelectorAll(
        "#beranda, #profil, #guru, #kurikulum, " +
        "#ekstrakurikuler, #galeri, #spmb, #kontak"
    );

    function setActiveMenu() {
        let currentSection = "";

        const scrollPosition = window.scrollY + 180;

        sections.forEach(function (section) {
            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {
            const target = link.getAttribute("href");

            if (target === "#" + currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveMenu, {
        passive: true
    });

    setActiveMenu();


    /* ================================================
       2. ANIMASI SAAT SECTION MASUK KE LAYAR
    ================================================ */

    const animatedElements = document.querySelectorAll(
        ".profile-text, " +
        ".info-card, " +
        ".visi, " +
        ".guru-photo, " +
        ".guru-info, " +
        ".daftar-guru-image, " +
        ".kurikulum-card, " +
        ".ekstra-card, " +
        ".gallery-item, " +
        ".spmb-requirements, " +
        ".spmb-contact, " +
        ".contact-grid > div"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        animatedElements.forEach(function (element) {
            element.classList.add("scroll-animation");
        });

        const animationObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        animatedElements.forEach(function (element) {
            animationObserver.observe(element);
        });

    }


    /* ================================================
       3. TOMBOL KEMBALI KE ATAS
    ================================================ */

    const backToTop = document.createElement("button");

    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.setAttribute(
        "aria-label",
        "Kembali ke bagian atas halaman"
    );
    backToTop.setAttribute("title", "Kembali ke atas");
    backToTop.textContent = "↑";

    document.body.appendChild(backToTop);


    function toggleBackToTop() {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", toggleBackToTop, {
        passive: true
    });

    toggleBackToTop();


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });

    });


    /* ================================================
       4. NAVIGASI KE BAGIAN HALAMAN
    ================================================ */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

            /*
             * Memperbarui alamat hash agar tautan bagian
             * halaman tetap bisa dibagikan.
             */

            if (window.location.hash !== targetId) {
                history.pushState(null, "", targetId);
            }

        });

    });


    /* ================================================
       5. TOMBOL MENGENAL SEKOLAH
    ================================================ */

    const welcomeButton = document.querySelector(
        ".welcome-content .btn"
    );

    if (welcomeButton) {

        welcomeButton.addEventListener("click", function (event) {

            const target = document.querySelector("#profil");

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

            if (window.location.hash !== "#profil") {
                history.pushState(null, "", "#profil");
            }

        });

    }


    /* ================================================
       6. TAHUN FOOTER OTOMATIS
    ================================================ */

    const copyright = document.querySelector("footer .copyright");

    if (copyright) {

        const currentYear = new Date().getFullYear();

        copyright.textContent =
            "© " + currentYear +
            " UPTD SDN Pendabah 3 Kamal";

    }


    /* ================================================
       7. PEMERIKSAAN GAMBAR
    ================================================ */

    const images = document.querySelectorAll("img");

    images.forEach(function (img) {

        img.addEventListener("error", function () {

            console.warn(
                "Gambar tidak dapat dimuat:",
                img.getAttribute("src")
            );

        });

    });


    /* ================================================
       8. LOG STATUS WEBSITE
    ================================================ */

    console.log(
        "Website UPTD SDN Pendabah 3 Kamal berhasil dimuat."
    );

});
