import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
/**
 * @customElement
 * @polymer
 */
class LoginPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        #login{
            padding:20px;
            border: 2px solid;
            border-radius:5px;
            width:700px;
        }
      </style>
        <app-location route={{route}}></app-location>
        <div id="login">
        <paper-tabs selected={{selected}}>
            <paper-tab>Customer</paper-tab>
            <paper-tab>Vendor</paper-tab>
        </paper-tabs>
        <iron-pages selected={{selected}}>
                <div>
                    <iron-form id="customerForm">
                    <form>
                        <paper-input required error-message="This field is required" id="custUsername" label="Customer Username"></paper-input>
                        <paper-input required error-message="This field is required" id="custPassword" label="Password" type="password"></paper-input>
                        <paper-button label="Login" raised on-click="_handleCustomerLogin">Login</paper-button>
                        <sub> New User? <a href="#" on-click="_handleGoToRegister">SignUp</a></sub>
                        </form>
                        </iron-form>
                </div>
                <div>
                    <iron-form id="vendorForm">
                    <form>
                        <paper-input required error-message="This field is required" id="vendorUsername" label="Vendor Username"></paper-input>
                        <paper-input required error-message="This field is required" id="vendorPassword" label="Password" type="password"></paper-input>
                        <paper-button label="Login" raised on-click="_handleVendorLogin">Login</paper-button>
                        <sub>New User?:<a href="#" on-click="_handleGoToRegister">SignUp</a></sub>
                        </form>
                        </iron-form>
                </div>
        </iron-pages>
        </div>
        <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type="application/json" ></iron-ajax>
        `;
    }

    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'login-page'
            },
            selected: {
                type: Number,
                value: 0
            },
            action: {
                type: String,
                value: 'List'
            },
            customerData: {
                type: Array,
                value: []
            },
            vendorData: {
                type: Array,
                value: []
            }
        };
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'vendor':
                this.vendorData = event.detail.response;
                this.dispatchEvent(new CustomEvent('get-vendor',{detail:{item:this.vendorData},bubbles:true,composed:true}))
                this.set('route.path','/vendor');
                break;
            case 'customer':
                this.customerData = event.detail.response;
                console.log(this.customerData);
                this.dispatchEvent(new CustomEvent('get-customer',{detail:{item:this.customerData},bubbles:true,composed:true}))
                this.set('route.path','/user');
                break;
            default: break;
        }

    }

    _handleGoToRegister() {
        this.set('route.path', '/register')
    }

    _handleCustomerLogin() {
        if (this.$.customerForm.validate()) {
            let customerObj = { email: this.$.custUsername.value, password: this.$.custPassword.value}
            this.$.customerForm.reset();
            this.action = 'customer';
            this._makeAjaxCall('http://10.117.189.177:8088/foodzone/customers/login', 'post', customerObj);
        }
    }
    _handleVendorLogin() {
        if (this.$.vendorForm.validate()) {
            let email = this.$.vendorUsername.value;
            let password = this.$.vendorPassword.value;
            let vendorObj = { email, password }
            this.$.customerForm.reset();
            this.action = 'vendor';
            this._makeAjaxCall('http://10.117.189.177:8088/foodzone/vendors/login', 'post', vendorObj);
        }
    }

    _makeAjaxCall(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
}

window.customElements.define('login-page', LoginPage);