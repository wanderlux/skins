import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `champ-list`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ChampList extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'champ-list',
      },
    };
  }
}

window.customElements.define('champ-list', ChampList);
