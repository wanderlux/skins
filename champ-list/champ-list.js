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
        url="../Aatrox.json"
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
        items="{{_toArray(data.data)}}" as="item">
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

    };
  }

/* "id":"Aatrox",
   "key":"266",
   "name":"Aatrox",
   "title":"the Darkin Blade",
*/

  _toArray(obj) {
        return Object.keys(obj).map(function(key) {
          console.log(key);
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
