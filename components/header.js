const header = document.createElement("template");
header.innerHTML = `
    <div class="h1Img">
        <img src="icons/logo_dark.svg" alt="sid city book club logo" class="headerLogo"/>
        <h1>SidCity Book Club</h1>
    </div>
    
    <nav>
        <ul>
            <li class="navButton"><a href="index.html" >Home</a></li>
            <li class="navButton"><a href="about.html">About</a></li>
            <li class="navButton"><a href="stats.html">Stats</a></li>
        </ul>
    </nav>
`;

class CustomHeader extends HTMLElement {
    constructor(){
        super();

        const clone = header.content.cloneNode(true);
        this.appendChild(clone);
    }
}

window.customElements.define("custom-header", CustomHeader);