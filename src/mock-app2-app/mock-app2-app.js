import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/iron-icons/iron-icons.js';
import './login-page.js';
import './register-page';
import './user-page.js';
import './recipe-page.js';
import './payment-page.js';
import './order-page.js';
import './vendor-page.js';
import './history-page.js';
import './manage-page.js';



setPassiveTouchGestures(true);
setRootPath(MyAppGlobals.rootPath);
/**
 * @customElement
 * @polymer
 */
class MockApp2App extends PolymerElement {
  static get template() {
    return html`
    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
    <style>
    .container{
      display:grid;
      grid-template-rows:80px 60px auto; 
      grid-template-columns:1fr;
      grid-template-areas:"h" "n" "m";
      grid-gap:5px;
    }
    .header{
      grid-area:h;
      display:flex;
      flex-direction:row;
      background-color: rgba(0,0,0,0.8);
      color: white;
      padding:10px 10px 10px 20px;
      border-radius:5px;
    }
    .nav{
      grid-area:n;
      display:flex;
      flex-direction:row;
      background-color: rgba(0,0,0,0.8);
      color:white;
      padding:10px;
      border-radius:5px;
      justify-content:center;
      align-items:center;
    }
    iron-selector{
      display:flex;
      flex-direction:row;
      justify-content:space-evenly;
      align-items:center;
    }
    .main{
      grid-area:m;
    }
    a{
      text-decoration:none;
      color:black;
    }
    #logout{
      position:relative;
      left:800px;
      height:40px;
      top:10px;
    }
    paper-button{
      background-color:white;
      color:black;
    }
    #customerPortal{
      position:relative;
      left:700px;
    }
    </style>
    <div class="container">
      <div class="header">
        <div id="appLabel">
          <h2>FOOD-ZONE<iron-icon icon="all-out"></iron-icon></h2>
        </div>
        <template is="dom-if" if="{{isVendor}}">
          <div class="portal">
            <h3><iron-icon icon=""></iron-icon>Vendor Portal</h3>
          </div>
        </template>
        <template is="dom-if" if="{{isCustomer}}">
          <div class="portal">
            <h3><iron-icon icon="face"></iron-icon>Customer Portal</h3>
          </div>
        </template>
        <div id="logoutAction">
          <template is="dom-if" if="{{login}}">
            <paper-button raised id="logout" on-click="_handleLogout">LOGOUT</paper-button>
          </template>
        </div>
      </div>
      
      <div class="nav">
      <template is="dom-if" if="{{!login}}">
        <marquee>FOOD ZONE | ORDER QUALITY FOOD | SERVE QUALITY FOOD AS VENDOR | For further details, Contact:9717656464, Email:yg311997@gmail.com </marquee>
      </template>
      <iron-selector selected=[[page]] attr-for-selected="name" role="navigation">
        <template is="dom-if" if="{{isCustomer}}">
          <a name="user" href="[[rootPath]]user">
            <div>
              <paper-button raised>Vendors</paper-button>
            </div>
          </a>
        </template>
        <template is="dom-if" if="{{isCustomer}}">
          <a name="order" href="[[rootPath]]order">
            <div>
              <paper-button raised>ORDER HISTORY</paper-button>
            </div>
          </a>
        </template>
        <template is="dom-if" if="{{isVendor}}">
          <a name="vendor" href="[[rootPath]]vendor">
            <div>
              <paper-button raised>VENDOR</paper-button>
            </div>
          </a>
        </template>
        <template is="dom-if" if="{{isVendor}}">
          <a name="history" href="[[rootPath]]history">
            <div>
              <paper-button raised>HISTORY</paper-button>
            </div>
          </a>
        </template>
        <template is="dom-if" if="{{isVendor}}">
          <a name="manage" href="[[rootPath]]manage">
            <div>
              <paper-button raised>MANAGE RECIPE</paper-button>
            </div>
          </a>
        </template>
      </iron-selector>
      </div>
    
      <div class="main">
      <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
        <login-page name="login" id="login"></login-page>
        <register-page name="register" id="register"></register-page>
        <user-page name="user" id="user" customer-data={{customerData}}></user-page>
        <recipe-page name="recipe" id="recipe" selected-recipes={{selectedRecipes}} customer-data={{customerData}}></recipe-page>
        <payment-page name="payment" id="payment" confirmed-order={{confirmedOrder}}></payment-page>
        <order-page name="order" id="order" customer-data={{customerData}}></order-page>
        <vendor-page name="vendor" id="vendor" vendor-data={{vendorData}}></vendor-page>
        <history-page name="history" id="history" vendor-data={{vendorData}}></history-page>
        <manage-page name="manage" id="manage"></manage-page>
      </iron-pages>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      customerData:Object,
      vendorData:Object,
      selectedRecipes:Array,
      confirmedOrder:Object,
      isVendor:Boolean,
      isCustomer:Boolean,
      login:{
        type:Boolean,
        value:false
      }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  ready(){
    super.ready();
    this.addEventListener('get-vendor',function(event){
      this.vendorData=event.detail.item;
      this.isVendor=event.detail.isVendor;
      this.isCustomer=event.detail.isCustomer;
      this.login=true;
    });
    this.addEventListener('get-customer',function(event){
      this.customerData=event.detail.item;
      this.isVendor=event.detail.isVendor;
      this.isCustomer=event.detail.isCustomer;
      this.login=true;
    });
    this.addEventListener('send-recipes',function(event){
      this.selectedRecipes=event.detail.item;
    });
    this.addEventListener('confirmed-order',function(event){
      this.confirmedOrder=event.detail.item;
    });
  }

  _routePageChanged(page) {
    if (!page) {
      this.page = 'login';
    } else if (['login', 'register', 'user', 'vendor', 'order', 'pending', 'history', 'recipe', 'payment'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
  }

  _handleLogout(){
    this.login=false;
    this.isVendor=false;
    this.isCustomer=false;
    this.set('route.path','/login');
  }

  _pageChanged(page) {
    switch (page) {
      case 'login':
        import('./login-page.js');
        break;
      case 'register':
        import('./register-page.js');
        break;
      case 'user':
        import('./user-page.js');
        break;
      case 'vendor':
        import('./vendor-page.js');
        break;
      case 'cart':
        import('./cart-page.js');
        break;
      case 'order':
        import('./order-page.js');
        break;
      case 'pending':
        import('./pending-page.js');
        break;
      case 'history':
        import('./history-page.js');
        break;
      case 'recipe':
        import('./recipe-page.js');
        break;
      case 'view404':
        import('./view404-page.js');
        break;
    }
  }
}

window.customElements.define('mock-app2-app', MockApp2App);
// /* <template is="dom-if" if="{{!login}}">
//           <a name="login" href="[[rootPath]]login">
//             <div>
//               <paper-button raised>LOGIN</paper-button>
//             </div>
//           </a>
//         </template> */
// /* <template is="dom-if" if="{{isCustomer}}">
//           <a name="recipe" href="[[rootPath]]recipe">
//             <div>
//               <paper-button raised>ITEMS</paper-button>
//             </div>
//           </a>
//         </template> */
