import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

/**
 * `skin-id`
 * one skin instance
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SkinId extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        --paper-card {
          max-width: 90%;
        }
        --paper-card-content {
          float: left;
          background-color: red;
        }
        --paper-card-background-color{
          background-color: blue;
        }

      </style>

      <paper-card
        placeholderImage="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png"
        image="[[url]][[champ]]_[[skin.num]].jpg"
        alt="[[champ]]">
        <div class="card-content">
          [[skin.name]]
        </div>
        <div class="card-actions">
          <paper-icon-button id="favorite" icon="favorite" on-click="handleSkin"></paper-icon-button>
          <paper-icon-button id="book" name="book" icon="book" on-click="handleSkin"></paper-icon-button>
        </div>
        <!--iron-image
          placeholder="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png" src="[[url]][[champ]]_[[skin.num]].jpg"></iron-image--->

      </paper-card>
    `;
  }
  handleSkin(e){
    let action = e.currentTarget.id;
    let properties = {
      bubbles: true,
      composed: true,
      detail: {
        champ: this.get('champ'),
        skin: this.get('skin')
      }
    }

    switch(action) {
      case 'favorite':
        this.dispatchEvent(new CustomEvent('skin-favorited', properties));
        break;
      case 'book':
        this.dispatchEvent(new CustomEvent('skin-collected', properties));
        break;
    }
  }

  static get properties() {
    return {
      url: {
        type: String,
        readOnly: true,
        value: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/',
      },
      skin: Object,
      champ: String,
      faved: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      collected: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      }
    };
  }

  ready() {
    //this.dispatchEvent(new CustomEvent('fav-added', { composed: true}));
    this.addEventListener('fav-added', this._setFaved(true));
    this.addEventListener('fav-removed', this._setFaved(false));
   }

}

window.customElements.define('skin-id', SkinId);
