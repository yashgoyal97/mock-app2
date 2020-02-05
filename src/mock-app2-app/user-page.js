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
        <app-location route={{route}}></app-location>
        <div class="cards">
        <template is="dom-repeat" items={{vendrData}}>
            <paper-card image="http://placehold.it/350x150/FFC107/000000" alt="Emmental">
                <div class="card-content">
                 <h3>{{item.vendorName}}</h3>
                </div>
                <div class="card-action">
                    <paper-button on-click="_handleGetRecipe">ORDER</paper-button>
                </div>
            </paper-card>
        </template>
        </div>
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
        this._makeAjax('','get',null)
    }

    _handleResponse(event) {
        switch (this.action) {
            case 'List':
                this.vendorData=event.detail.response;
                break;
            case 'recipe':
                this.recipes=event.detail.response;
                this.dispatchEvent('send-recipes',{detail:{item:this.recipes},bubbles:true,composed:true});
                this.set('route.path','/recipe');
                break;
            default:break;
        }
    }

    connectedCallback(){
        super.connectedCallback();
        this._makeAjax('','get',null)
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
