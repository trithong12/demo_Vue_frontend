import axios from 'axios';
import { organizationApi } from '../../../api';

const data = {
  wait: false,
  organizationList: [],
};

const getters = {

};

const mutations = {
  setWait(state, payload) {
    state.wait = payload.flag;
  },
  setOrganizationList(state, payload) {
    state.organizationList = payload.data;
  },
};

const actions = {
  fetchOrganizationList({ commit }) {
    commit('setWait', { flag: true });
    axios.get(`${organizationApi}/`)
      .then((response) => {
        commit('setOrganizationList', { data: response.data });
        commit('setWait', { flag: false });
      })
      .catch((error) => {
        console.log('error:', error);
      });
  },
};

export default {
  state: data,
  getters,
  mutations,
  actions,
  namespaced: true,
};
