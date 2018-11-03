/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-localstorage/iron-localstorage.js';
//import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(SkinsAppGlobals.rootPath);

class SkinsApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <iron-localstorage
        name="wishlist"
        value={{wish}}
        on-iron-localstorage-load-empty="initDebugWish">
      </iron-localstorage>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="champlist" href="[[rootPath]]champlist">Champ List</a>
            <a name="skinlist" href="[[rootPath]]skinlist">Skin List</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Skins App</div>
            </app-toolbar>
          </app-header>

          <iron-pages id="pages" selected="[[page]]" attr-for-selected="name" role="main">
            <champ-list name="champlist"></champ-list>
            <skin-list name="skinlist" id={{id}}></skin-list>

          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  ready() {
    super.ready();
    this.addEventListener('champ-selected', this.onChampSelection);
    this.addEventListener('skin-favorited', this.onSkinFavorited);
    this.addEventListener('skin-collected', this.onSkinCollected);
   }

   onSkinFavorited(e) {
     //this.get('wish').push(e.detail);
     let wl = this.get('wish');
     if( wl.contains(e.detail) ) {
       let index = wl.indexOf(e.detail);
       wl.splice(index, 1);
     } else {
       wl.push(e.detail);
       this.set('wish', wl);
     }
   }

   onChampSelection(e){
     this.set('id', e.detail);
     this.$.pages.selectNext();
   }

   initDebugWish() {
     console.log("initializing localstorage :: wish");
     this.wish = [
       {
         "champ" : "Nidalee",
         "skin": {
           "id": "76009",
           "num": 9,
           "name": "Super Galaxy Nidalee",
           "chromas": false
         }
       },{
         "id": "22008",
         "champ": "Ashe"
       }
     ]
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
      id: String,
      wish: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'champlist';
    } else if (['champlist','skinlist'].indexOf(page) !== -1) {
      this.page = page;
    }
    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'champlist':
        import('./champ-list.js');
        break;
      case 'skinlist':
        import('./skin-list.js');
        break;
    }
  }
}

window.customElements.define('skins-app', SkinsApp);
