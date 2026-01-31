document.addEventListener("DOMContentLoaded", () => {
    const jaar = new Date().getFullYear();

    const footer = `
        <footer>
            <p>© ${jaar} PizzaHub</p>
        </footer>
    `;

    document.getElementById("footer").innerHTML = footer;
});
