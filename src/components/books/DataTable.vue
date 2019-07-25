<template>
  <div class="table-responsive text-justify">
    <table v-if="items.length" class="table table-hover">
      <caption>
        Showing
        {{
          meta.from
        }}
        To
        {{
          meta.to
        }}. Total:
        {{
          meta.total
        }}
        <i class="spinner-border spinner-border-sm" :hidden="!working"></i>
      </caption>
      <thead>
        <tr>
          <th v-for="head in heads" :key="head">{{ head }}</th>
          <th v-if="actions">actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="(propvalue, propname) in item" :key="propname">
            {{ propvalue }}
          </td>
          <td v-if="actions">
            <div class="btn-group justify-content-center" role="group">
              <button
                v-for="(action, index) in actions"
                :key="index"
                class="btn btn-sm"
                :class="action.class"
                @click.stop="
                  action
                    .method(item)
                    .then(reloadData)
                    .catch(e => {})
                "
              >
                <i class="fa" :class="'fa-' + action.icon"> </i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="btn-toolbar justify-content-center"
      role="toolbar"
      v-if="items.length && links !== {}"
    >
      <div class="btn-group mr-2" role="group">
        <button
          class="btn btn-dark"
          :disabled="!links.prev"
          @click.stop="loadFirst"
          title="First Page"
        >
          <i class="fa fa-angle-double-left"></i>
        </button>
        <button
          class="btn btn-dark"
          :disabled="!links.prev"
          @click.stop="loadPrev"
          title="Previous Page"
        >
          <i class="fa fa-angle-left"></i>
        </button>
      </div>

      <div class="btn-group" role="group">
        <button
          type="button"
          class="btn btn-secondary"
          v-for="pageNum in meta.last_page"
          :key="pageNum"
          :class="{ active: meta.current_page === pageNum }"
          @click.stop="loadData({ page: pageNum })"
        >
          {{ pageNum }}
        </button>
      </div>
      <div class="btn-group ml-2" role="group">
        <button
          class="btn btn-dark"
          :disabled="!links.next"
          @click.stop="loadNext"
          title="Next Page"
        >
          <i class="fa fa-angle-right"></i>
        </button>
        <button
          class="btn btn-dark"
          :disabled="!links.next"
          @click.stop="loadLast"
          title="Last Page"
        >
          <i class="fa fa-angle-double-right"></i>
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center" v-else>
      <h2 class="text-muted">
        No Data.
      </h2>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";

/**
 * @vue-prop {String} url - url to fetch data from
 * @vue-prop {String} search - the string that will be added to request parameters if set
 * @vue-prop {Array} actions - an array of actions to be added for each item.
 *  each action has 3 properties. "method" , "icon" and "class".
 *  icon is the name of icon the action is going to use (font awesome icon names)
 *  class is the class that will be applied to action button
 *  method is a function which will be called when the action's button is clicked.
 * @vue-prop {Function} dataFilter - a function which will be called with the response data each time
 *  that data is loaded from url. the function should return the new (filtered) data.
 */
export default {
  name: "DataTable",
  props: {
    url: String,
    search: String,
    dataFilter: {
      type: Function,
      required: false
    },
    actions: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      items: [],
      links: {},
      meta: {},
      working: false
    };
  },
  computed: {
    heads() {
      return _.keys(this.items[0]);
    }
  },
  methods: {
    setData(data) {
      if (this.dataFilter) {
        data = this.dataFilter(data);
      }
      this.items = data.data;
      this.links = data.links;
      this.meta = data.meta;
    },
    loadFirst() {
      this.loadData({}, this.links.first);
    },
    loadPrev() {
      this.loadData({}, this.links.prev);
    },
    loadLast() {
      this.loadData({}, this.links.last);
    },
    loadNext() {
      this.loadData({}, this.links.next);
    },
    loadData(params, url) {
      this.working = true;
      if (this.search) {
        if (!params) {
          params = {};
        }
        params.search = this.search;
      }
      return new Promise((resolve, reject) => {
        axios
          .get(url ? url : this.url, params ? { params: params } : {})
          .then(result => {
            this.setData(result.data);
            resolve(result.data);
          })
          .catch(reject)
          .finally(() => {
            this.working = false;
          });
      });
    },
    reloadData() {
      this.loadData({ page: this.meta.current_page })
        .then(result => {
          if (
            !result.data.length &&
            this.links.next === null &&
            this.meta.current_page > 1
          ) {
            this.meta.current_page--;
            this.reloadData();
          }
        })
        .catch(console.log);
    }
  },
  created() {
    this.loadData();
  },
  watch: {
    search() {
      this.loadData();
    }
  }
};
</script>

<style lang="scss" scoped></style>
