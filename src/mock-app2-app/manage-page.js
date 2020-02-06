import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';


/**
 * @customElement
 * @polymer
 */
class ManagePage extends PolymerElement {
    static get template() {
        return html`
        <style>
        paper-button{
            width:300px;
            background-color:black;
            color:white;
        }
        paper-card{
            padding:10px;
            margin:15px;
            background-color: rgba(255,255,255,0.8);
        }
        </style>
        <app-location route={{route}}></app-location>
        <div class="container">
            <div class="addNewRecipe">
                <paper-button on-click="_handleAddNewRecipe">Add new recipe</paper-button>
            </div>
            <div class="recipeContainer">
                <paper-dialog id="addNewRecipeDialog" modal>
                <div>
                <div id='newItem'>
                    <iron-form>
                        <form>
                            <paper-input name="recipeName" id="recipeName" label="Recipe Name"></paper-input>
                            <paper-input name="unitPrice" id="unitPrice" label="Unit Price"></paper-input>
                        </form>
                    </iron-form>
                </div>
                <paper-button on-click="_handleAddRecipe">Add Recipe</paper-button>
                </div>
                </paper-dialog>
                <div class="cards">
                    <template is="dom-repeat" items={{}}>
                        <paper-card>
                            <div class="card-content"></div>
                            <div class="cardAction"></div>
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
            vendorInfo: Array,
            vendorRecipeList: Array
        };
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'List':
                this.vendorRecipeList = event.detail.response;
                break;
            case 'addNew':
                break;

            default: break;
        }
    }

    _vendorDataChanged(newVal) {
        this.vendorInfo = newVal;
        this.action = 'List';
        this._makeAjax(`http://10.117.189.177:8088/foodzone/vendors/${this.vendorInfo.id}/recipes`, 'get', null);
    }

    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }

    _handleAddNewRecipe() {
        this.$.addNewRecipeDialog.open()
    }

    _handleAddRecipe(){
        let addRecipeObj={name:this.$.recipeName, unitPrice:this.$.unitPrice, vendorId:this.vendorInfo.id}
        this.action='addNew'
        
    }
}

window.customElements.define('manage-page', ManagePage);
