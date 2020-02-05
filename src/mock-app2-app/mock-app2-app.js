import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';


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
      grid-template-rows:1fr 9fr; 
      grid-template-columns:1fr;
      grid-template-areas:"h" "m";
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
    .main{
      grid-area:m;
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
      <paper-button raised id="logout">LOGOUT</paper-button>
      </div>
      <div class="main">
      <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
        <login-page name="login" id="login"></login-page>
        <register-page name="register" id="register"></register-page>
        <user-page name="user" id="user"></user-page>
        <vendor-page name="vendor" id="vendor"></vendor-page>
        <cart-page name="cart" id="cart"></cart-page>
        <order-page name="order" id="order"></order-page>
        <pending-page name="pending" id="pending"></pending-page>
        <history-page name="history" id="history"></history-page>
        <recipe-page name="recipe" id="recipe"></recipe-page>
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
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
    if (!page) {
      this.page = 'register';
    } else if (['login', 'register', 'user', 'vendor', 'cart', 'order', 'pending', 'history', 'recipe'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
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
