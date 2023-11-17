class RestoCard extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback() {
        this.id = this.getAttribute('id');
        this.innerHTML = `
		<div class="resto-card">
        <div class="resto-logo"><img src="${this.getAttribute("logo")}"></div>
        <div class="resto-name-rate">
            <h3>${this.getAttribute('name')}</h3>
            <div class="resto-rate">
                <i class="fa fa-star"></i>
                <h3>${this.getAttribute('rate')}</h3>
            </div>
        </div>
        <div class="resto-speciality-details">
            <h3>${this.getAttribute('speciality')}</h3>
            <button>Details</button>
        </div>
    </div>
        `
    }
}

customElements.define('resto-card', RestoCard);