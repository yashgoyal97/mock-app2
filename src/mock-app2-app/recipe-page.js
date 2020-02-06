import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';

/**
 * @customElement
 * @polymer
 */
class RecipePage extends PolymerElement {
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
        .itemValues{
            color:green;
        }
        #recipeAction{
            display:flex;
            flex-direction:row;
        }
        .actionButton{
            margin:10px 100px 0px 50px;
        }
        </style>
        <app-location route={{route}}></app-location>
        <div class="container">
            <div class="cards">
                <template is="dom-repeat" items={{recipes}}>
                    <paper-card image="./../../images/recipe.jfif">
                        <div class="card-content">
                        <h3>Recipe: <span class="itemValues">{{item.recipeName}}</span></h3>
                        <h4>Price: <span class="itemValues">{{item.unitPrice}}</span></h4>
                        </div>
                        <div class="card-action">
                            <paper-button on-click="_handleAddRecipe">ADD</paper-button>
                        </div>
                    </paper-card>
                </template>
            </div>
            <div id="recipeAction">
            <paper-button on-click="_handleConfirmOrder" class="actionButton">Confirm Order</paper-button>
            <paper-button class="actionButton" on-click="_handleReturnToVendors">Back</paper-btton>
            </div>
        </div>
        <paper-toast id="toastA" text="Item Added"></paper-toast>
        
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

    _handleReturnToVendors(){
        this.set('route.path','/user');
    }

    _handleAddRecipe(event){
        let recipeId = event.model.item.recipeId;
        this.$.toastA.open();
        this.push('orderList',recipeId);
    }

    _handleConfirmOrder(){
        let orderObj={customerId:this.customerData.id,recipes:this.orderList};
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
