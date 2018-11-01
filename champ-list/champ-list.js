import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "./champ-id.js";
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

      <iron-ajax
        auto
        url="http://ddragon.leagueoflegends.com/cdn/8.21.1/data/en_US/champion.json"
        handle-as="json"
        last-response="{{data}}">
      </iron-ajax>

      <!--dom-repeat items="{{_toArray(data.data)}}">
        <template>
          <div>
            id: {{item.id}}
            key: {{item.key}}
            name: {{item.name}}
            title: {{item.title}}
            <champ-id key="{{item.id}}">
          </div>
        </template>
      </dom-repeat-->
      <iron-list
        grid
        selection-enabled
        items="{{_toArray(data.data)}}" as="item"
        selection-enabled=true
        on-selected-item-changed="handleChamp">
        <template>
          <div>
    <!--      id: {{item.id}}
          key: {{item.key}}
          name: {{item.name}}
          title: {{item.title}}-->
          <champ-id champ="{{item}}">
          </div>
        </template>
      </iron-list>
    `;
  }
  static get properties() {
    return {
      champ: {
        type: Object,
        notify: true
      }
    };
  }
  handleChamp(e) {
    this.dispatchEvent(new CustomEvent('champ-selected', { bubbles: true, composed: true, detail: e.detail.value.id }));
  }
/* "id":"Aatrox",
   "key":"266",
   "name":"Aatrox",
   "title":"the Darkin Blade",
*/

  _toArray(obj) {
        return Object.keys(obj).map(function(key) {
          //this.set('id', key);
            return {
                id: key,
                key: obj[key].key,
                name: obj[key].name,
                title: obj[key].title
            };
        });
    }
}

window.customElements.define('champ-list', ChampList);
