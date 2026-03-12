function berekenPizza(){

    let aantal = document.getElementById("aantal").value;
    let diameter = document.getElementById("diameter").value;

    if(aantal === "" || diameter === ""){
        document.getElementById("resultaten").innerHTML = "⚠️ Vul alle velden in.";
        return;
    }

    // ingrediënten berekenen
    let saus = aantal * 50;
    let kaas = aantal * 100;
    let oregano = aantal * 1;
    let olie = aantal * 5;
    let deeg = aantal * 1;

    document.getElementById("resultaten").innerHTML = `
        <p><strong>Aantal pizza's:</strong> ${aantal}</p>
        <p><strong>Diameter:</strong> ${diameter} cm</p>
    `;

    document.getElementById("ingredienten").innerHTML = `
        <h3>Ingrediënten nodig</h3>
        <ul>
            <li>🍅 Tomatensaus: ${saus} ml</li>
            <li>🧀 Mozzarella: ${kaas} g</li>
            <li>🌿 Oregano: ${oregano} g</li>
            <li>🫒 Olijfolie: ${olie} ml</li>
            <li>🍕 Pizzadeeg: ${deeg} bollen</li>
        </ul>
    `;

    document.getElementById("ingredienten").style.display = "block";
}