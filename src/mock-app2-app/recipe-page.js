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
class RecipePage extends PolymerElement {
    static get template() {
        return html`
        <app-location route={{route}}></app-location>
        <div class="container">
            <div class="cards">
                <template is="dom-repeat" items={{recipes}}>
                    <paper-card>
                        <div class="card-content">
                        <h3>{{item.recipeName}}</h3>
                        <h4>{{item.unitPrice}}</h4>
                        </div>
                        <div class="card-action">
                            <paper-button on-click="_handleAddRecipe">ADD</paper-button>
                        </div>
                    </paper-card>
                </template>
            </div>
            <div id="confirmOrder">
            <paper-button on-click="_handleConfirmOrder">CONFIRM ORDER</paper-button>
            </div>
        </div>
    `;
    }

    

    static get properties() {
        return {
            action: {
                type: String,
                value: 'List'
            },
            selectedRecipes: {
                type: Array,
                observer: '_selectedRecipesChanged'
            },
            recipes:{
                type:Array
            },
            customerData:{
                type:Array,
                value:this.customerData
            },
            orderList:{
                type:Array,
                value:[]
            },
            orderResponse:{
                type:Array
            }
        };
    }

    _handleAddRecipe(event){
        let recipeId = event.model.item.recipeId;
        this.push('orderList',recipeId);
    }

    _handleConfirmOrder(){
        let orderObj={customerId:this.customerData.customerId,recipes:this.orderList};
        this.dispatchEvent(new CustomEvent('confirmed-order',{detail:{item:orderObj},bubbles:true,composed:true}));
        this.set('route.path','/payment');
    }

    _selectedRecipesChanged(newVal, oldVal) {
        this.recipes = newVal;
      }

    _handleResponse(event) {
        switch (this.action) {
            case 'confirm':
                this.orderResponse=event.detail.response;
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

window.customElements.define('recipe-page', RecipePage);
