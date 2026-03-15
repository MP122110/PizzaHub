// Toon juiste velden op basis van vorm
document.getElementById("vorm").addEventListener("change", function () {
    const vorm = this.value;

    // Alle vormvelden verbergen
    document.querySelectorAll(".vorm-veld").forEach(v => v.style.display = "none");

    if (vorm === "rond") {
        document.getElementById("veld-rond").style.display = "block";
    }
    if (vorm === "rechthoek") {
        document.getElementById("veld-rechthoek").style.display = "block";
    }
    if (vorm === "driehoek") {
        document.getElementById("veld-driehoek").style.display = "block";
    }
});

function fout(tekst) {
    const foutvak = document.getElementById("foutmelding");
    foutvak.innerText = tekst;
    foutvak.style.display = "block";

    // Shake opnieuw starten
    foutvak.classList.remove("shake");
    void foutvak.offsetWidth; // force reflow
    foutvak.classList.add("shake");
}

function verbergFout() {
    document.getElementById("foutmelding").style.display = "none";
}

function berekenPizza() {

    verbergFout();

    const aantal = parseFloat(document.getElementById("aantal").value);
    const vorm = document.getElementById("vorm").value;

    if (!aantal) {
        fout("Vul het aantal pizza's in.");
        return;
    }

    if (!vorm) {
        fout("Kies een vorm.");
        return;
    }

    let opp = 0;

    // ROND
    if (vorm === "rond") {
        const diameter = parseFloat(document.getElementById("diameter").value);
        if (!diameter) {
            fout("Vul de diameter in.");
            return;
        }
        const straal = diameter / 2;
        opp = Math.PI * (straal * straal);
    }

    // RECHTHOEK
    if (vorm === "rechthoek") {
        const lengte = parseFloat(document.getElementById("lengte").value);
        const breedte = parseFloat(document.getElementById("breedte").value);
        if (!lengte || !breedte) {
            fout("Vul lengte en breedte in.");
            return;
        }
        opp = lengte * breedte;
    }

    // DRIEHOEK
    if (vorm === "driehoek") {
        const basis = parseFloat(document.getElementById("basis").value);
        const hoogte = parseFloat(document.getElementById("hoogte").value);
        if (!basis || !hoogte) {
            fout("Vul basis en hoogte in.");
            return;
        }
        opp = (basis * hoogte) / 2;
    }

    // --- INGREDIËNTEN (C# formules 1-op-1) ---
    const factor = opp / 1017.88;

    const bloem = Math.ceil(factor * 313 * aantal);
    const gist = Math.ceil(factor * 16 * aantal);
    const water = Math.floor(factor * 172.15 * aantal);
    const zout = Math.ceil(factor * 8 * aantal);
    const suiker = Math.ceil(factor * 8 * aantal);
    const vetstof = Math.ceil(factor * 31 * aantal);
    const saus = Math.ceil(factor * 250 * aantal);
    const mozzarella = Math.ceil(factor * 200 * aantal);
    const parmezaan = Math.ceil(factor * 50 * aantal);

    // --- INGREDIËNTEN TONEN ---
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

    // wis knop zichtbaar maken
    document.querySelector(".btn-wis").style.display = "inline-block";
}

document.getElementById("clearBtn").addEventListener("click", function () {

    // Algemene velden leegmaken
    document.getElementById("aantal").value = "";
    document.getElementById("vorm").value = "";

    // Vorm-specifieke velden leegmaken
    document.getElementById("diameter").value = "";
    document.getElementById("lengte").value = "";
    document.getElementById("breedte").value = "";
    document.getElementById("basis").value = "";
    document.getElementById("hoogte").value = "";

    // Vormvelden verbergen
    document.querySelectorAll(".vorm-veld").forEach(v => v.style.display = "none");

    // Foutmelding verbergen
    document.getElementById("foutmelding").style.display = "none";

    // Ingrediënten verbergen
    document.getElementById("ingredienten").style.display = "none";

    // Ingrediëntenlijst leegmaken
    document.querySelector("#ingredienten ul").innerHTML = "";

    // WIS KNOP OPNIEUW VERBERGEN
    document.getElementById("clearBtn").style.display = "none";

});
// Selecteer alle nummer-velden
document.querySelectorAll('input[type="number"]').forEach(input => {

    const id = input.id;

    // Keydown event voor alles
    input.addEventListener('keydown', function(e) {

        // Blokkeer ongewenste tekens: '-' en 'e'
        if (e.key === '-' || e.key === 'e') {
            e.preventDefault();
            return;
        }
    });
});