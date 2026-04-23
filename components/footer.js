const footer = document.createElement("template");
footer.innerHTML = `
    <footer>© 2026 Zuzana Osobová </footer>
`;

class CustomFooter extends HTMLElement {
    constructor(){
        super();

        const clone = footer.content.cloneNode(true);
        this.appendChild(clone);
    }
}

window.customElements.define("custom-footer", CustomFooter);