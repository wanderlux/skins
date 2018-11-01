import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "./skin-id.js";
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

      <iron-ajax
        auto
        url="[[url]][[id]].json"
        handle-as="json"
        on-response="_handleResponse"
        last-response="{{data}}"
        >
      </iron-ajax>

      <iron-list
        selection-enabled
        items="[[skins]]" as="item">
        <template>
          <div>

<!--          id: {{item.id}}
          name: {{item.name}}
          num: {{item.num}}
          chromas: {{item.chromas}} -->
          <skin-id champ="[[id]]" skin="{{item}}"><skin-id>

          </div>
        </template>
      </iron-list>

    `;
  }
  static get properties() {
    return {
      id: {
        type: String
      },
      url: {
        type: String,
        value: 'http://ddragon.leagueoflegends.com/cdn/8.21.1/data/en_US/champion/'
      },
      skins: {
        type: Object
      }
    };
  }/*
  _getSkins(data) {
    console.log(data);

  }*/
  _handleResponse(response){
    this.set('skins', response.detail.__data.response.data[this.get('id')].skins);
    //return response.detail.__data.response.data[this.get('id')].skins;
  }
}

window.customElements.define('skin-list', SkinList);
