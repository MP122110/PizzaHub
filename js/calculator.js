// Toon juiste velden op basis van gekozen vorm
document.getElementById("vorm").addEventListener("change", function () {
    const gekozenVorm = this.value;

    // Alle vormvelden verbergen
    document.querySelectorAll(".vorm-veld").forEach(v => v.style.display = "none");

    if (gekozenVorm === "rond") {
        document.getElementById("veld-rond").style.display = "block";
    }
    if (gekozenVorm === "rechthoek") {
        document.getElementById("veld-rechthoek").style.display = "block";
    }
    if (gekozenVorm === "driehoek") {
        document.getElementById("veld-driehoek").style.display = "block";
    }
});

// Toon foutmelding
function toonFoutmelding(tekst) {
    const foutvak = document.getElementById("foutmelding");
    foutvak.innerText = tekst;
    foutvak.style.display = "block";

    // Shake-animatie opnieuw starten
    foutvak.classList.remove("shake");
    void foutvak.offsetWidth; 
    foutvak.classList.add("shake");
}

// Verberg foutmelding
function verbergFoutmelding() {
    document.getElementById("foutmelding").style.display = "none";
}

// Bereken ingrediënten op basis van vorm en aantal
function berekenPizza() {

    verbergFoutmelding();

    const aantalPizza = parseFloat(document.getElementById("aantal").value);
    const vorm = document.getElementById("vorm").value;

    if (!aantalPizza) {
        toonFoutmelding("Vul het aantal pizza's in.");
        return;
    }

    if (!vorm) {
        toonFoutmelding("Kies een vorm.");
        return;
    }

    let oppervlakte = 0;

    // Ronde pizza
    if (vorm === "rond") {
        const diameter = parseFloat(document.getElementById("diameter").value);
        if (!diameter) {
            toonFoutmelding("Vul de diameter in.");
            return;
        }
        const straal = diameter / 2;
        oppervlakte = Math.PI * (straal * straal);
    }

    // Rechthoekige pizza
    if (vorm === "rechthoek") {
        const lengte = parseFloat(document.getElementById("lengte").value);
        const breedte = parseFloat(document.getElementById("breedte").value);
        if (!lengte || !breedte) {
            toonFoutmelding("Vul lengte en breedte in.");
            return;
        }
        oppervlakte = lengte * breedte;
    }

    // Driehoekige pizza
    if (vorm === "driehoek") {
        const basis = parseFloat(document.getElementById("basis").value);
        const hoogte = parseFloat(document.getElementById("hoogte").value);
        if (!basis || !hoogte) {
            toonFoutmelding("Vul basis en hoogte in.");
            return;
        }
        oppervlakte = (basis * hoogte) / 2;
    }

    // Ingrediëntenfactor
    const factor = oppervlakte / 1017.88;

    const bloem = Math.ceil(factor * 313 * aantalPizza);
    const gist = Math.ceil(factor * 16 * aantalPizza);
    const water = Math.floor(factor * 172.15 * aantalPizza);
    const zout = Math.ceil(factor * 8 * aantalPizza);
    const suiker = Math.ceil(factor * 8 * aantalPizza);
    const vetstof = Math.ceil(factor * 31 * aantalPizza);
    const saus = Math.ceil(factor * 250 * aantalPizza);
    const mozzarella = Math.ceil(factor * 200 * aantalPizza);
    const parmezaan = Math.ceil(factor * 50 * aantalPizza);

    // Ingrediënten tonen
    document.querySelector("#ingredienten ul").innerHTML = `
        <li>🌾 Bloem: ${bloem} g</li>
        <li>🍞 Gist: ${gist} g</li>
        <li>💧 Water: ${water} ml</li>
        <li>🧂 Zout: ${zout} g</li>
        <li>🍬 Suiker: ${suiker} g</li>
        <li>🧈 Vetstof: ${vetstof} g</li>
        <li>🍅 Saus: ${saus} ml</li>
        <li>🧀 Mozzarella: ${mozzarella} g</li>
        <li>🧀 Parmezaan: ${parmezaan} g</li>
    `;

    document.getElementById("ingredienten").style.display = "block";

    // Wis-knop tonen
    document.querySelector(".btn-wis").style.display = "inline-block";
}

// Velden wissen
document.getElementById("clearBtn").addEventListener("click", function () {

    document.getElementById("aantal").value = "";
    document.getElementById("vorm").value = "";

    document.getElementById("diameter").value = "";
    document.getElementById("lengte").value = "";
    document.getElementById("breedte").value = "";
    document.getElementById("basis").value = "";
    document.getElementById("hoogte").value = "";

    document.querySelectorAll(".vorm-veld").forEach(v => v.style.display = "none");

    document.getElementById("foutmelding").style.display = "none";
    document.getElementById("ingredienten").style.display = "none";
    document.querySelector("#ingredienten ul").innerHTML = "";

    document.getElementById("clearBtn").style.display = "none";
});

// Blokkeer ongewenste tekens in nummer-velden
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.key === '-' || e.key === 'e') {
            e.preventDefault();
        }
    });
});

// Spinner-gedrag: eerste keer exact placeholder-waarde
document.querySelectorAll('input[type="number"]').forEach(input => {

    function numeriekePlaceholder() {
        const ph = input.placeholder || "";
        const match = ph.match(/\d+/);
        return match ? parseInt(match[0], 10) : 1;
    }

    function zetPlaceholderEersteKeer() {
        if (!input.dataset.placeholderGebruikt || input.dataset.placeholderGebruikt === "false") {
            input.value = numeriekePlaceholder();
            input.dataset.placeholderGebruikt = "true";
            return true;
        }
        return false;
    }

    input.addEventListener("keydown", function (e) {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            const eerste = zetPlaceholderEersteKeer();
            if (eerste) e.preventDefault();
        }
    });

    input.addEventListener("mousedown", function () {
        setTimeout(() => zetPlaceholderEersteKeer(), 0);
    });

    input.addEventListener("wheel", function (e) {
        const eerste = zetPlaceholderEersteKeer();
        if (eerste) e.preventDefault();
    });

    input.addEventListener("input", function () {
        if (input.value === "") {
            input.dataset.placeholderGebruikt = "false";
        }
    });
});