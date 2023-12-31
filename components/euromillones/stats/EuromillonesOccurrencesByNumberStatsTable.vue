<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="occurrencesByNumberStats.data"
      :options.sync="options"
      :server-items-length="occurrencesByNumberStats.total"
      :loading="loading"
      class="elevation-1"
    >
      <template #progress>
        <v-progress-linear
          indeterminate
          absolute
          color="purple darken-2"
        />
      </template>
      <template
        #[`item.number`]="{ item }"
      >
        <v-chip
          color="primary"
        >
          {{ getFormattedNumber(item.numero) }}
        </v-chip>
      </template>
      <template
        #[`item.occurrences`]="{ item }"
      >
        {{ item.apariciones }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import getFormattedNumber from '@/mixins/getFormattedNumber';

export default {
  name: 'EuromillonesOccurrencesByNumberStatsTable',
  mixins: [
    getFormattedNumber,
  ],
  data() {
    return {
      options: {
        mustSort: true,
        sortBy: ['occurrences'],
        sortDesc: [true],
        itemsPerPage: this.$store.state.euromillones.statsPagination.per_page,
      },
      headers: [
        {
          text: this.$t('VIEWS.EUROMILLONES.STATS.OCCURRENCES_BY_NUMBER.TABLE.NUMBER.LABEL'),
          align: 'center',
          sortable: true,
          value: 'number',
        },
        {
          text: this.$t('VIEWS.EUROMILLONES.STATS.OCCURRENCES_BY_NUMBER.TABLE.OCCURRENCES.LABEL'),
          align: 'center',
          sortable: true,
          value: 'occurrences',
        },
      ],
    };
  },
  computed: {
    ...mapState('euromillones', {
      loading: 'loading',
      pagination: 'statsPagination',
      occurrencesByNumberStats: (state) => state.stats.occurrencesByNumber,
    }),
  },
  watch: {
    options: {
      handler() {
        this.getOccurrencesByNumberStats();
      },
      deep: true,
    },
  },
  destroyed() {
    this.$store.dispatch('euromillones/destroyStats');
  },
  methods: {
    getOccurrencesByNumberStats() {
      const {
        sortBy, sortDesc, page, itemsPerPage,
      } = this.options;

      this.$store.commit('euromillones/setStatsPagination', {
        page,
        per_page: itemsPerPage,
        sort_type: sortDesc[0] ? 'desc' : 'asc',
        sort_property: sortBy[0],
      });

      this.$store.dispatch('euromillones/getOccurrencesByNumberStats');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
