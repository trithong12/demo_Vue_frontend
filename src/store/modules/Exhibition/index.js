import axios from 'axios';
import moment from 'moment';
import { exhibitionApi } from '../../../api';

const data = {
  wait: false, // to perform overlay while running api call promise
  exhibitionList: [],
};

const getters = {

};

const mutations = {
  setWait(state, payload) {
    state.wait = payload.flag;
  },
  setExhibitionList(state, payload) {
    /** Sorted by start_datetime with descending order */
    state.exhibitionList = payload.data.sort((a, b) => {
      const startDateTime1 = moment(a.start_datetime);
      const startDateTime2 = moment(b.start_datetime);
      return startDateTime2 - startDateTime1;
    });
  },
};

const actions = {
  /** For each api call, set wait to true to activate overlay,
   * set it back to false in success case
   */

  fetchExhibitionList({ commit }) {
    commit('setWait', { flag: true });
    axios.get(`${exhibitionApi}/`)
      .then((response) => {
        commit('setExhibitionList', { data: response.data });
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
