import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

/**
 * @customElement
 * @polymer
 */
class PaymentPage extends PolymerElement {
    static get template() {
        return html`
        <style>
            .paymentModes{
            width:500px;
            margin-bottom:20px;
            background-color: rgba(255,255,255,0.8);
        </style>
        <div>
        <h2 on-click="_handleExpandPayment">Select Payment Mode <iron-icon icon="expand-more"></iron-icon></h2>
        <iron-collapse class="collapseContent">
        <div id="paymentModes">
        <template is="dom-repeat" items={{paymentDetails}}>
            <paper-button raised class="paymentModes" on-click="_handlePayment"><h3>{{item.paymentMode}}</h3></paper-button><br>
        </template>
        </div>
        <iron-collapse>
        </div>
        <iron-ajax id="ajax" on-response="_handleResponse" content-type="application/json" handle-as="json" on-error="_handleError"></iron-ajax>
    }
    `;
    }

    _handleExpandPayment() {
        let collapseContent = this.shadowRoot.querySelector('.collapseContent');
        if (collapseContent.opened) {
            collapseContent.opened = false;
        }
        else {
            collapseContent.opened = true;
        }
    }


    static get properties() {
        return {
            action: {
                type: String,
                value: 'List'
            },
            confirmedOrder: {
                type: Object,
                value: this.confirmedOrder
            },
            paymentDetails:{
                type:Array,
                value:[]
            }
        };
    }

    _handlePayment(event){
        console.log(this.confirmedOrder);
        console.log(event.model.item)
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'List':
                this.paymentDetails=event.detail.response;
                break;

            default: break;
        }
    }

    connectedCallback(){
        super.connectedCallback()
        this.action='List';
        this._makeAjax('','get',null);
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
