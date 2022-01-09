import Vue from 'vue';

export const state = () => ({
  users: {
    data: [],
  },
  usersFilters: {},
  usersPagination: {},
  currentUser: {},
  loading: true,
});

export const actions = {
  /**
   * Users
   */
  getUsers({ state, commit }) {
    commit('setIsLoading', true);

    const usersFilters = { ...state.usersFilters };

    return Vue.pronostigolClient.getUsers({
      ...usersFilters,
      ...state.usersPagination,
    })
      .then((users) => commit('setUsers', users))
      .finally(() => commit('setIsLoading', false));
  },
  getUser({ commit }, { id }) {
    commit('setIsLoading', true);

    return Vue.pronostigolClient.getUser(id)
      .then((user) => commit('setUser', user))
      .finally(() => commit('setIsLoading', false));
  },
  destroyUsers({ commit }) {
    return commit('setUsers', {
      data: [],
      total: 0,
    });
  },
  destroyUser({ commit }) {
    return commit('setUser', {});
  },
};

export const mutations = {
  setIsLoading(state, loading) {
    Vue.set(state, 'loading', loading);
  },
  /**
   * Users
   */
  setUsers(state, users) {
    Vue.set(state, 'users', users);
  },
  setUsersFilters(state, filters) {
    Vue.set(state, 'usersFilters', filters);
  },
  setUserPagination(state, pagination) {
    Vue.set(state, 'usersPagination', pagination);
  },
  setUser(state, user) {
    Vue.set(state, 'currentUser', user);
  },
};

export const getters = {};