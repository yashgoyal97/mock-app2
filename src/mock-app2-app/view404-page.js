import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class viewPage extends PolymerElement {
    static get template() {
        return html`
        <h1>404:Error</h1>
        <h2>Page does not exist</h2>
    `;
    }

}

window.customElements.define('view404-page', viewPage);
