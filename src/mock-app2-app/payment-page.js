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
            margin-bottom:10px;
            background-color: rgba(0,0,0,0.8);
            color:white;
            }
            #paymentPage{
                padding:20px;
                background-color: rgba(255,255,255,0.9);
            }
            .actionButton{
                margin:10px 100px 0px 50px;
                width:300px;
                background-color:black;
                color:white;
            }
        </style>
        <location route={{route}}></location>
        <div id="paymentPage">
        <h2 on-click="_handleExpandPayment">Select Payment Mode <iron-icon icon="expand-more"></iron-icon></h2>
        <iron-collapse class="collapseContent" opened>
        <div id="paymentModes">
        <template is="dom-repeat" items={{paymentDetails}}>
            <paper-button raised class="paymentModes" on-click="_handlePayment"><h3>{{item.paymentName}}</h3></paper-button><br>
        </template>
        </div>
        <iron-collapse>
        </div>
        <div id="recipeAction">
            <paper-button class="actionButton" on-click="_handleReturnToRecipes">Back</paper-btton>
        </div>
        <iron-ajax id="ajax" content-type="application/json" handle-as="json" on-error="_handleError"></iron-ajax>
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
            confirmedOrder: {
                type: Object,
                value: this.confirmedOrder
            },
            paymentDetails:{
                type:Array,
                value:[]
            },
            completedOrder:{
                type:Array,
                value:[]
            },
            paymentCompletedResponse:{
                type:Array,
                value:[]
            }
        };
    }

    _handleReturnToRecipes(){
        this.set('route.path','/recipe');
    }

    _handlePayment(event){
        console.log(this.confirmedOrder);
        console.log(event.model.item.paymentName)
        // let paymentObj={paymentMode:event.model.item}
        let orderPostReq = (this._postAjaxConfig('http://10.117.189.177:8088/foodzone/orders', 'post', this.confirmedOrder)).generateRequest();
        let paymentPostReq = (this._getAjaxConfig(`http://10.117.189.177:8088/foodzone/payments/pay?paymentMode=${event.model.item.paymentName}`, 'get')).generateRequest();
        let thisContext = this;
        Promise.all([ paymentPostReq.completes,orderPostReq.completes]).then(function (requests) {
            thisContext.completedOrder = requests[1].response;
            thisContext.paymentCompletedResponse = requests[0].response;
            console.log(thisContext.completedOrder, thisContext.paymentCompletedResponse);
         });
    }

    _postAjaxConfig(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        return ajax;
    }

    connectedCallback(){
        super.connectedCallback()
        let paymentReq = (this._getAjaxConfig('http://10.117.189.177:8088/foodzone/payments', 'get')).generateRequest();
        let thisContext = this;
        Promise.all([paymentReq.completes]).then(function (requests) {
            thisContext.paymentDetails = requests[0].response;
        });
    }

    _getAjaxConfig(url, method) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        return ajax;
    }
}

window.customElements.define('payment-page', PaymentPage);
