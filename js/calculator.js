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

    const maxWaarde = 999;

    // Basiswaarden
    const aantalPizza = parseFloat(document.getElementById("aantal").value);
    const vorm = document.getElementById("vorm").value;

    if (!aantalPizza) {
        toonFoutmelding("Vul het aantal pizza's in.");
        return;
    }
    if (aantalPizza > maxWaarde) {
        toonFoutmelding("Aantal pizza's mag maximaal 999 zijn.");
        return;
    }

    if (!vorm) {
        toonFoutmelding("Kies een vorm.");
        return;
    }

    // Controleer alleen relevante velden per vorm
    let relevanteVelden = [];

    if (vorm === "rond") {
        relevanteVelden.push({id: "diameter", naam: "Diameter"});
    } else if (vorm === "rechthoek") {
        relevanteVelden.push({id: "lengte", naam: "Lengte"});
        relevanteVelden.push({id: "breedte", naam: "Breedte"});
    } else if (vorm === "driehoek") {
        relevanteVelden.push({id: "basis", naam: "Basis"});
        relevanteVelden.push({id: "hoogte", naam: "Hoogte"});
    }

    // Check limieten
    for (let veld of relevanteVelden) {
        const elem = document.getElementById(veld.id);
        const waarde = parseFloat(elem.value);
        if (!waarde) {
            toonFoutmelding(`Vul ${veld.naam} in.`);
            return;
        }
        if (waarde < 1) {
            toonFoutmelding(`${veld.naam} moet minimaal 1 zijn.`);
            return;
        }
        if (waarde > maxWaarde) {
            toonFoutmelding(`${veld.naam} mag maximaal ${maxWaarde} zijn.`);
            return;
        }
    }

    // Bereken oppervlakte
    let oppervlakte = 0;
    if (vorm === "rond") {
        const straal = parseFloat(document.getElementById("diameter").value) / 2;
        oppervlakte = Math.PI * straal * straal;
    } else if (vorm === "rechthoek") {
        const lengte = parseFloat(document.getElementById("lengte").value);
        const breedte = parseFloat(document.getElementById("breedte").value);
        oppervlakte = lengte * breedte;
    } else if (vorm === "driehoek") {
        const basis = parseFloat(document.getElementById("basis").value);
        const hoogte = parseFloat(document.getElementById("hoogte").value);
        oppervlakte = (basis * hoogte) / 2;
    }

    // Ingrediëntenfactor
    const factor = oppervlakte / 1017.88;

    let bloem = factor * 313 * aantalPizza;
    let gist = factor * 16 * aantalPizza;
    let water = factor * 172.15 * aantalPizza;
    let zout = factor * 8 * aantalPizza;
    let suiker = factor * 8 * aantalPizza;
    let vetstof = factor * 31 * aantalPizza;
    let saus = factor * 250 * aantalPizza;
    let mozzarella = factor * 200 * aantalPizza;
    let parmezaan = factor * 50 * aantalPizza;

    // Automatisch omrekenen naar kg/l als > 1000
    function formatKgMl(waarde) {
        if (waarde >= 1000) {
            return (waarde / 1000).toFixed(2) + (["Water", "Saus"].includes(this) ? " l" : " kg");
        } else {
            return Math.ceil(waarde) + (["Water", "Saus"].includes(this) ? " ml" : " g");
        }
    }

    // Ingrediënten tonen
    document.querySelector("#ingredienten ul").innerHTML = `
        <li>🌾 Bloem: ${bloem >= 1000 ? (bloem/1000).toFixed(2)+" kg" : Math.ceil(bloem)+" g"}</li>
        <li>🍞 Gist: ${Math.ceil(gist)} g</li>
        <li>💧 Water: ${water >= 1000 ? (water/1000).toFixed(2)+" l" : Math.ceil(water)+" ml"}</li>
        <li>🧂 Zout: ${Math.ceil(zout)} g</li>
        <li>🍬 Suiker: ${Math.ceil(suiker)} g</li>
        <li>🧈 Vetstof: ${Math.ceil(vetstof)} g</li>
        <li>🍅 Saus: ${saus >= 1000 ? (saus/1000).toFixed(2)+" l" : Math.ceil(saus)+" ml"}</li>
        <li>🧀 Mozzarella: ${Math.ceil(mozzarella)} g</li>
        <li>🧀 Parmezaan: ${Math.ceil(parmezaan)} g</li>
    `;

    document.getElementById("ingredienten").style.display = "block";
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

            input.select();  
            
            return true;
        }
        return false;
    }

        input.addEventListener("focus", function () {
        zetPlaceholderEersteKeer();
    });

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