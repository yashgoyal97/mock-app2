import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-button/paper-button.js';


/**
 * @customElement
 * @polymer
 */
class ManagePage extends PolymerElement {
    static get template() {
        return html`
        <app-location route={{route}}></app-location>
        <div class="container">
        <div class="addNewRecipe">
        <paper-button>Add new recipe</paper-button>
        </div>
        <div class="recipeContainer">
            <div class="cards">
                <template is="dom-repeat" items={{}}>
                    <paper-card>
                        <div class="card-content">
                        </div>
                        <div class="cardAction">
                        </div>
                    </paper-card>
                </template>
            </div>
        </div>
        </div>
        <iron-ajax id="ajax" on-response="_handleResponse" content-type="application/json" handle-as="json" on-error="_handleError"></iron-ajax>
    `;
    }
    static get properties() {
        return {
            action: {
                type: String,
                value: 'List'
            },
            vendorData: {
                type: Array,
                observer: "_vendorDataChanged"
            },
            customerInfo: Array,
            orderHistoryList: Array
        };
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'List':
                this.orderHistoryList = event.detail.response;
                console.log("inside")
                console.log("history", this.orderHistoryList);
                break;

            default: break;
        }
    }

    _vendorDataChanged(newVal) {
        this.customerInfo = newVal;
        let postObj = { customerId: this.customerInfo.id };
        this.action = 'List';
        this._makeAjax('http://10.117.189.177:8088/foodzone/vendors/8/recipes', 'get', null);
    }

    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
}

window.customElements.define('manage-page', ManagePage);
