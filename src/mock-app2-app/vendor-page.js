import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';


/**
 * @customElement
 * @polymer
 */
class VendorPage extends PolymerElement {
    static get template() {
        return html`
        <div class="container">
            <div class="cards">
                <template is="dom-repeat" items={{pendingOrderList}}>
                    <paper-card>
                        <div class="card-content">
                        <h3>Order Id:{{item.orderId}}</h3>
                        <hr>
                        <h4>Customer Name:{{item.customer.customerName}}</h4><br>
                        <h3>Items Orderes:</h3><br>
                        <template is="dom-repeat" items={{item.recipes}}>
                        <h4>Name:{{item.recipeName}}</h4><br>
                        <h4>Price:{{item.unitPrice}}</h4>
                        </template>
                        </div>
                        <div class="card-action">
                            <paper-button>DELIVERED</paper-button>
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
            vendorData: {
                type: Array,
                // value: this.vendorData,
                observer: "_vendorDataChanged"
            },
            vendorInfo:Array,
            pendingOrderList:Array
        };
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'List':
                this.pendingOrderList=event.detail.response;
                break;

            default: break;
        }
    }

    _vendorDataChanged(newVal){
        this.vendorInfo=newVal;
        let status="pending";
        let postObj={status:status,vendorId:this.vendorInfo.id};
        this.action='List';
        this._makeAjax('http://10.117.189.177:8088/foodzone/orders/get','post',postObj);
    }

    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
}

window.customElements.define('vendor-page', VendorPage);
