import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `skin-list`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SkinList extends PolymerElement {
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
        value: 'skin-list',
      },
    };
  }
}

window.customElements.define('skin-list', SkinList);
