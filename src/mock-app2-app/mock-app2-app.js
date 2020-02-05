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
      background-color: rgba(0,0,0,0.2);
      padding:10px;
      border-radius:5px;
    }
    .nav{
      grid-area:n;
      display:flex;
      flex-direction:row;
      background-color: rgba(0,0,0,0.2);
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
      left:1000px;
      height:40px;
      top:10px;
    }
    </style>
    <div class="container">
      <div class="header">
      <h2>FOOD-ZONE</h2>
      <paper-button raised id="logout" on-click="_handleLogout">LOGOUT</paper-button>
      </div>
      <div class="nav">
      <iron-selector selected=[[page]] attr-for-selected="name" role="navigation">
        <a name="login" href="[[rootPath]]login">
          <div>
            <paper-button raised>LOGIN</paper-button>
          </div>
        </a>
        <a name="user" href="[[rootPath]]user">
          <div>
            <paper-button raised>USER HOME</paper-button>
          </div>
        </a>
        <a name="recipe" href="[[rootPath]]recipe">
          <div>
            <paper-button raised>ITEMS</paper-button>
          </div>
        </a>
        <a name="order" href="[[rootPath]]order">
          <div>
            <paper-button raised>ORDER HISTORY</paper-button>
          </div>
        </a>
        <a name="vendor" href="[[rootPath]]vendor">
          <div>
            <paper-button raised>VENDOR</paper-button>
          </div>
        </a>
        <a name="pending" href="[[rootPath]]pending">
          <div>
            <paper-button raised>PENDING ORDER</paper-button>
          </div>
        </a>
        <a name="history" href="[[rootPath]]history">
          <div>
            <paper-button raised>HISTORY</paper-button>
          </div>
        </a>
      </iron-selector>
      </div>
      <div class="main">
      <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
        <login-page name="login" id="login"></login-page>
        <register-page name="register" id="register"></register-page>
        <user-page name="user" id="user" customer-data={{customerData}}></user-page>
        <recipe-page name="recipe" id="recipe" selected-recipes={{selectedRecipes}} customer-data={{customerData}}></recipe-page>
        <payment-page name="payment" id="payment"></payment-page>
        <order-page name="order" id="order"></order-page>
        <vendor-page name="vendor" id="vendor" vendor-data={{vendorData}}></vendor-page>
        <pending-page name="pending" id="pending" confirmed-order={{confirmedOrder}}></pending-page>
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
      confirmedOrder:Object
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
    });
    this.addEventListener('get-customer',function(event){
      this.customerData=event.detail.item;
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
    } else if (['login', 'register', 'user', 'vendor', 'order', 'pending', 'history', 'recipe'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
  }

  _handleLogout(){
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
