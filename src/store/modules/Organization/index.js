import axios from 'axios';
import { organizationApi } from '../../../api';

const data = {
  wait: false, // to perform overlay while running api call promise
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
  /** For each api call, set wait to true to activate overlay,
   * set it back to false in success case
   */

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
  createOrganization({ commit }, payload) {
    commit('setWait', { flag: true });
    return new Promise((resolve, reject) => {
      axios.post(`${organizationApi}/`, payload.data)
        .then(() => {
          commit('setWait', { flag: false });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateOrganization({ commit }, payload) {
    commit('setWait', { flag: true });
    return new Promise((resolve, reject) => {
      axios.put(`${organizationApi}/${payload.data.org_id}`, payload.data)
        .then(() => {
          commit('setWait', { flag: false });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteOrganization({ commit }, payload) {
    commit('setWait', { flag: true });
    return new Promise((resolve, reject) => {
      axios.delete(`${organizationApi}/${payload.org_id}`)
        .then(() => {
          commit('setWait', { flag: false });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
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
