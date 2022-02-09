export default class YssyElement extends HTMLElement {
    constructor() {
        super();
        this.className = "shadowed";
      }
}
window.customElements.define('player-options', YssyElement);