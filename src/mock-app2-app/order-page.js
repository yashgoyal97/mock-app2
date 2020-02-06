import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js'


/**
 * @customElement
 * @polymer
 */
class OrderPage extends PolymerElement {
    static get template() {
        return html`
        <div class="container">
            <div class="cards">
                <template is="dom-repeat" items={{orderHistoryList}}>
                    <paper-card>
                        <div class="card-content">
                        <h2>Delivered</h2>
                        <h3>Order Id:{{item.orderId}}</h3>
                        <hr>
                        <h4>Customer Name:{{item.customer.customerName}}</h4><br>
                        <h3>Items Orderes:</h3><br>
                        <template is="dom-repeat" items={{item.recipes}}>
                        <h4>Name:{{item.recipeName}}</h4><br>
                        <h4>Price:{{item.unitPrice}}</h4>
                        </template>
                        </div>
                    </paper-card>
                </template>
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
            customerData: {
                type: Array,
                observer: "_customerDataChanged"
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
                console.log("history",this.orderHistoryList);
                break;

            default: break;
        }
    }

    _customerDataChanged(newVal) {
        this.customerInfo = newVal;
        let postObj = { customerId: this.customerInfo.id };
        console.log(postObj)
        this.action = 'List';
        console.log("sparsh")
        this._makeAjax('http://10.117.189.177:8088/foodzone/orders/get', 'post', postObj);
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'List':

                break;

            default: break;
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

window.customElements.define('order-page', OrderPage);
