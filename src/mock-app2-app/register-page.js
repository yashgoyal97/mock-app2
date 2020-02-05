import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */
class RegisterPage extends PolymerElement {
    static get template() {
        return html`
        <style>
            #userType{
                display:flex;
                flex-direction:row;
            }
            #registrationContainer{
                padding:20px;
                border:2px solid;
                border-radius:5px;
                width:700px;
            }
            paper-input{
                margin:5px 0px 5px 0px;
            }
            paper-button{
                margin:5px 0px 5px 0px;
            }
            #password{
                display:none;
            }
        </style>
        <div id="registrationContainer">
            <iron-form id="registrationForm">
                <form>
                    <h2>User Registration</h2>
                    <hr>
                    <paper-input name="name" id="name" label="Enter Name" required allowed-pattern="[a-zA-Z]" error-message="This field is required"></paper-input>
                    <paper-input name="phone" id="phone" label="Enter Phone Number" required allowed-pattern="[0-9]" maxlength="10" minlength="10" error-message="This field is required"></paper-input>
                    <paper-input name="email" id="email" label="Enter Email Id" required type="email" error-message="This field is required"></paper-input>
                    <paper-input name="password" id="password" label="Enter Password" type="password" error-message="This field is required"></paper-input>
                    <div id="userType">
                    <paper-toggle-button id="customer" name="customer" on-change="_handleCustomerToggle">Customer</paper-toggle-button>
                    <paper-toggle-button id="vendor" name="vendor" on-change="_handleVendorToggle">Vendor</paper-toggle-button>
                    </div>
                    <paper-button raised on-click="_handleRegister">REGISTER</paper-button>
                    <hr>
                    <h4>EXISTING USER: Click <a href="#" on-click="_handleGoToLogin">here</a> to login</h4>
                </form>
            </iron-form>
        </div>
        <iron-ajax id="ajax" handle-as="json" content-type="application/json" on-response="_handleResponse"></iron-ajax>
    `;
    }

    _handleCustomerToggle() {
        let isCustomer = this.$.customer;
        let isVendor = this.$.vendor;
        if (isCustomer.checked) {
            isVendor.disabled = true;
            this.$.password.style.display = 'block';
            this.$.password.required = true;
        }
        else {
            isVendor.disabled = false;
            this.$.password.style.display = 'none';
        }
    }

    _handleVendorToggle() {
        let isCustomer = this.$.customer;
        let isVendor = this.$.vendor;
        if (isVendor.checked) {
            isCustomer.disabled = true;
            this.$.password.style.display = 'none';
            this.$.password.required = false;
        }
        else {
            isCustomer.disabled = false;
        }
    }


    _handleRegister() {
        if (this.$.registrationForm.validate()) {
            console.log("CHECK");
            let registerObj;
            let isCustomer = this.$.customer;
            let isVendor = this.$.vendor;
            if (isVendor.checked) {
                registerObj = { vendorName: this.$.name.value, email: this.$.email.value, phoneNumber: this.$.phone.value };
                this.action = 'vendorList';
                // this._makeAjax('', 'post', registerObj);
            }
            else if (isCustomer.checked) {
                registerObj = { customerName: this.$.name.value, email: this.$.email.value, phoneNumber: this.$.phone.value, password: this.$.password.value }
                this.action = 'customerList';
                // this._makeAjax('', post, registerObj);
            }
            console.log(registerObj)
            isVendor.checked=false;
            isCustomer.checked=false;
            this.$.registrationForm.reset();
        }
    }

    static get properties() {
        return {
            action: {
                type: String,
                value: 'List'
            },
            registrationResponse: {
                type: Array,
                value: []
            }
        };
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'vendorList':
                this.registrationResponse = event.detail.response;
                this.set('route.path', '/login')
                break;

            case 'customerList':
                this.registrationResponse = event.detail.response;
                this.set('route.path', '/login')
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

window.customElements.define('register-page', RegisterPage);
