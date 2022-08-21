import Vue from 'vue';

import utils from '@/utils';

export const state = () => ({
  tickets: {
    data: [],
  },
  ticketsFilters: {},
  ticketsPagination: {},
  currentTicket: {
    resultado: {
      bolas: [],
    },
  },
  years: [],
  yearsPagination: {},
  stats: {
    occurrencesByNumber: {},
    occurrencesByResult: {},
    occurrencesByResultWithReimbursement: {},
    occurrencesByReimbursement: {},
    lastDateByNumber: {},
    lastDateByReimbursement: {},
  },
  statsFilters: {},
  statsPagination: {
    page: 1,
    per_page: 15,
  },
  loading: true,
});

export const actions = {
  /**
   * Tickets
   */
  getTickets({ state, commit }) {
    commit('setIsLoading', true);

    const ticketsFilters = { ...state.ticketsFilters };
    if (ticketsFilters.year === 'Histórico') {
      ticketsFilters.year = null;
    }

    return Vue.pronostigolClient.getBonolotoTickets({
      ...ticketsFilters,
      ...state.ticketsPagination,
    })
      .then((tickets) => commit('setTickets', tickets))
      .finally(() => commit('setIsLoading', false));
  },
  getTicket({ commit }, { year, raffle }) {
    commit('setIsLoading', true);

    return Vue.pronostigolClient.getBonolotoTickets({
      year,
      raffle,
    })
      .then((tickets) => commit('setCurrentTicket', tickets.data[0]))
      .finally(() => commit('setIsLoading', false));
  },
  destroyTickets({ commit }) {
    return commit('setTickets', {
      data: [],
      total: 0,
    });
  },
  destroyTicket({ commit }) {
    return commit('setCurrentTicket', {
      resultado: {
        bolas: [],
      },
    });
  },
  /**
   * Years
   */
  getYears({ state, commit }) {
    commit('setIsLoading', true);
    return Vue.pronostigolClient.getBonolotoYears({
      ...state.yearsPagination,
    })
      .then((years) => commit('setYears', years))
      .finally(() => commit('setIsLoading', false));
  },
  /**
   * Stats
   */
  getOccurrencesByNumberStats({ state, commit }) {
    commit('setIsLoading', true);

    const statsFilters = { ...state.statsFilters };

    statsFilters.searchBy = null;

    return Vue.pronostigolClient.getBonolotoOccurrencesByNumberStats({
      ...statsFilters,
      ...state.statsPagination,
    })
      .then((stats) => {
        commit('setOccurrencesByNumberStats', stats);
      })
      .finally(() => commit('setIsLoading', false));
  },
  getOccurrencesByResultStats({ state, commit }) {
    commit('setIsLoading', true);

    const statsFilters = { ...state.statsFilters };

    statsFilters.searchBy = null;

    return Vue.pronostigolClient.getBonolotoOccurrencesByResultStats({
      ...statsFilters,
      ...state.statsPagination,
    })
      .then((stats) => {
        commit('setOccurrencesByResultStats', stats);
      })
      .finally(() => commit('setIsLoading', false));
  },
  getOccurrencesByResultWithReimbursementStats({ state, commit }) {
    commit('setIsLoading', true);

    const statsFilters = { ...state.statsFilters };

    statsFilters.searchBy = null;

    return Vue.pronostigolClient.getBonolotoOccurrencesByResultWithReimbursementStats({
      ...statsFilters,
      ...state.statsPagination,
    })
      .then((stats) => {
        commit('setOccurrencesByResultWithReimbursementStats', stats);
      })
      .finally(() => commit('setIsLoading', false));
  },
  getOccurrencesByReimbursementStats({ state, commit }) {
    commit('setIsLoading', true);

    const statsFilters = { ...state.statsFilters };

    statsFilters.searchBy = null;

    return Vue.pronostigolClient.getBonolotoOccurrencesByReimbursementStats({
      ...statsFilters,
      ...state.statsPagination,
    })
      .then((stats) => {
        commit('setOccurrencesByReimbursementStats', stats);
      })
      .finally(() => commit('setIsLoading', false));
  },
  getLastDateByNumberStats({ state, commit }) {
    commit('setIsLoading', true);

    const statsFilters = { ...state.statsFilters };

    statsFilters.searchBy = null;

    return Vue.pronostigolClient.getBonolotoLastDateByNumberStats({
      ...statsFilters,
      ...state.statsPagination,
    })
      .then((stats) => {
        commit('setLastDateByNumberStats', stats);
      })
      .finally(() => commit('setIsLoading', false));
  },
  getLastDateByReimbursementStats({ state, commit }) {
    commit('setIsLoading', true);

    const statsFilters = { ...state.statsFilters };

    statsFilters.searchBy = null;

    return Vue.pronostigolClient.getBonolotoLastDateByReimbursementStats({
      ...statsFilters,
      ...state.statsPagination,
    })
      .then((stats) => {
        commit('setLastDateByReimbursementStats', stats);
      })
      .finally(() => commit('setIsLoading', false));
  },
  destroyStats({ commit }) {
    return commit('setStats', {
      occurrencesByNumber: {},
      occurrencesByResult: {},
      occurrencesByResultWithReimbursement: {},
      occurrencesByReimbursement: {},
      lastDateByNumber: {},
      lastDateByReimbursement: {},
    });
  },
};

export const mutations = {
  setIsLoading(state, loading) {
    Vue.set(state, 'loading', loading);
  },
  /**
   * Tickets
   */
  setTickets(state, tickets) {
    Vue.set(state, 'tickets', tickets);
  },
  setTicketsFilters(state, filters) {
    Vue.set(state, 'ticketsFilters', filters);
  },
  setTicketsPagination(state, pagination) {
    Vue.set(state, 'ticketsPagination', pagination);
  },
  setTicket(state, ticket) {
    Vue.set(state, 'currentTicket', ticket);
  },
  /**
   * Years
   */
  setYears(state, years) {
    Vue.set(state, 'years', years);
  },
  setYearsPagination(state, pagination) {
    Vue.set(state, 'yearsPagination', pagination);
  },
  /**
   * Stats
   */
  setStatsFilters(state, filters) {
    Vue.set(state, 'statsFilters', filters);
  },
  setStats(state, stats) {
    Vue.set(state, 'stats', stats);
  },
  setOccurrencesByNumberStats(state, stats) {
    Vue.set(state.stats, 'occurrencesByNumber', stats);
  },
  setOccurrencesByResultStats(state, stats) {
    Vue.set(state.stats, 'occurrencesByResult', stats);
  },
  setOccurrencesByResultWithReimbursementStats(state, stats) {
    Vue.set(state.stats, 'occurrencesByResultWithReimbursement', stats);
  },
  setOccurrencesByReimbursementStats(state, stats) {
    Vue.set(state.stats, 'occurrencesByReimbursement', stats);
  },
  setLastDateByNumberStats(state, stats) {
    Vue.set(state.stats, 'lastDateByNumber', stats);
  },
  setLastDateByReimbursementStats(state, stats) {
    Vue.set(state.stats, 'lastDateByReimbursement', stats);
  },
  setStatsPagination(state, pagination) {
    Vue.set(state, 'statsPagination', pagination);
  },
};

export const getters = {
  getLastDateByReimbursementStats: (state) => {
    const lastDateByReimbursement = utils.cloneObject(state.stats.lastDateByReimbursement);

    if (!lastDateByReimbursement.data) {
      return lastDateByReimbursement;
    }

    lastDateByReimbursement.data = lastDateByReimbursement.data
      .filter((item) => item.reintegro !== null);

    lastDateByReimbursement.total = lastDateByReimbursement.data.length;

    return lastDateByReimbursement;
  },
};
