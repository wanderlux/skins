import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
/**
 * `champ-id`
 * champ badge
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ChampId extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        iron-image {
          border-radius: 100px;
        }
      </style>

      <a href="#[[champ.id]]">
      <iron-image
      placeholder="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.pngaa" src="http://ddragon.leagueoflegends.com/cdn/8.21.1/img/champion/[[champ.id]].png"></iron-image>
      <div>[[champ.name]]</div>
      <!--iron-image src="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png" /-->
      </a>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'champ-id',
      },
      champ: {
        type: Object
      },
      key: {
        type: String
      }
    };
  }
}

window.customElements.define('champ-id', ChampId);
