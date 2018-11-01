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
          <paper-icon-button icon="favorite"></paper-icon-button>
          <paper-icon-button icon="book"></paper-icon-button>
        </div>
        <!--iron-image
          placeholder="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png" src="[[url]][[champ]]_[[skin.num]].jpg"></iron-image--->

      </paper-card>
    `;
  }
  static get properties() {
    return {
      url: {
        type: String,
        value: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/',
      },
      skin: {
        type: Object
      },
      champ: {
        type: String
      }
    };
  }
}

window.customElements.define('skin-id', SkinId);
