document.addEventListener("DOMContentLoaded", () => {
    const huidigePagina = window.location.pathname.split("/").pop();

    // menu
    const menu = `
        <nav>
            <ul>
                <li><a href="index.html" data-page="index.html">Home</a></li>
                <li><a href="populairste.html" data-page="populairste.html">Populairste Pizza's</a></li>
                <li><a href="geschiedenis.html" data-page="geschiedenis.html">Geschiedenis</a></li>
                <li><a href="wereldwijd.html" data-page="wereldwijd.html">Pizza Wereldwijd</a></li>
                <li><a href="calculator.html" data-page="calculator.html">Pizza Calculator</a></li>
                <li><a href="funfacts.html" data-page="funfacts.html">Funfacts</a></li>
                <li><a href="overons.html" data-page="overons.html">Over ons</a></li>
            </ul>
        </nav>
    `;

    document.getElementById("menu").innerHTML = menu;

    // Active link highlight
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        if (link.getAttribute("data-page") === huidigePagina) {
            link.classList.add("active");
        }
    });

    // Hamburger toggle
    const hamburger = document.getElementById("hamburger");
    const navList = document.querySelector("nav ul");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navList.classList.toggle("show");
        });
    }
});
