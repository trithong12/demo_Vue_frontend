import Vue from 'vue';
import Vuex from 'vuex';

import Organization from './modules/Organization/index';
import Exhibition from './modules/Exhibition/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    organization: Organization,
    exhibition: Exhibition,
  },
  strict: process.env.NODE_ENV !== 'production',
});
