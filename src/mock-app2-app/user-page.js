import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js';


/**
 * @customElement
 * @polymer
 */
class UserPage extends PolymerElement {
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
        <div class="cards">
        <template is="dom-repeat" items={{vendorData}}>
            <paper-card image="./../../images/vendor.jfif">
                <div class="card-content">
                 <h3>{{item.vendorName}}</h3>
                </div>
                <div class="card-action">
                    <paper-button on-click="_handleGetRecipe" raised>View Recipes</paper-button>
                </div>
            </paper-card>
        </template>
        </div>
        <iron-ajax id="ajax" handle-as="json" content-type="application/json" on-response="_handleResponse"></iron-ajax>
    `;
    }

    

    static get properties() {
        return {
            action: {
                type: String,
                value: 'List'
            },
            customerData:{
                type:Array,
                value:this.customerData
            },
            vendorData:{
                type:Array,
                value:[]
            },
            recipes:{
                type:Array,
                value:[]
            }
        };
    }

    _handleGetRecipe(event){
        this.action="recipe";
        this._makeAjax(`http://10.117.189.177:8088/foodzone/vendors/${event.model.item.vendorId}/recipes`,'get',null)
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'List':
                this.vendorData=event.detail.response;
                console.log(this.vendorData);
                break;
            case 'recipe':
                this.recipes=event.detail.response;
                console.log(this.recipes);
                this.dispatchEvent(new CustomEvent('send-recipes',{detail:{item:this.recipes},bubbles:true,composed:true}));
                this.set('route.path','/recipe');
                break;
            default:break;
        }
    }

    connectedCallback(){
        super.connectedCallback();
        this.action='List'
        this._makeAjax('http://10.117.189.177:8088/foodzone/vendors','get',null)
    }

    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
}

window.customElements.define('user-page', UserPage);
