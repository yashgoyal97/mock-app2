import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';


/**
 * @customElement
 * @polymer
 */
class PaymentPage extends PolymerElement {
    static get template() {
        return html`
        
    `;
    }

    

    static get properties() {
        return {
            action: {
                type: String,
                value: 'List'
            },
            confirmedOrder:{
                type:Object,
                value:this.confirmedOrder
            }
        };
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'List':
                
                break;

            default:break;
        }
    }

    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
}

window.customElements.define('payment-page', PaymentPage);
