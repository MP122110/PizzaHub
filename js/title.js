document.addEventListener("DOMContentLoaded", () => {
    const paginaNaam = window.location.pathname.split("/").pop().replace(".html", "");

    const titels = {
        "index": "Home",
        "populairste": "Populairste Pizza's",
        "geschiedenis": "Geschiedenis",
        "wereldwijd": "Pizza Wereldwijd",
        "calculator": "Pizza Calculator",
        "funfacts": "Funfacts",
        "overons": "Over ons"
    };

    const paginaTitel = titels[paginaNaam] || "PizzaHub";

    // Dynamische <title>
    document.title = `PizzaHub | ${paginaTitel}`;

    // Dynamische <h1>
    const h1 = document.getElementById("page-title");
    if (h1) {
        h1.textContent = paginaTitel;
    }
});
