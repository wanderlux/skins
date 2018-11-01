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
        <!--a href="#[[champ.id]]"-->
        <iron-image
      placeholder="http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png" src="[[url]][[champ.id]].png"></iron-image>
      <div>[[champ.name]]</div>
    `;
  }
  static get properties() {
    return {
      champ: {
        type: Object,
        notify: true
      },
      url: {
        type: String,
        readOnly: true,
        value: 'http://ddragon.leagueoflegends.com/cdn/8.21.1/img/champion/'
      }
    };
  }

}

window.customElements.define('champ-id', ChampId);
