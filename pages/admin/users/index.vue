<template>
  <v-row justify="start" align="center">
    <v-col cols="12" sm="12">
      <div class="text-h3 pb-4">
        {{ titleText }}
      </div>
      <UsersFiltersForm />
      <v-data-table
        :headers="headers"
        :items="users"
        :options.sync="options"
        :server-items-length="total"
        :loading="loading"
        class="elevation-1"
      >
        <template #progress>
          <v-progress-linear
            indeterminate
            absolute
            color="black"
          />
        </template>
        <template
          #[`item.role`]="{ item }"
        >
          {{ getRole(item.role) }}
        </template>
        <template
          #[`item.date`]="{ item }"
        >
          {{ getFormattedDate(item.date) }}
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn
            dark
            fab
            x-small
            color="warning"
            :to="localePath({
              name: 'admin-user',
              params: {
                id: item.id,
              }
            })"
            nuxt
          >
            <v-icon
              small
              :title="editUserTooltip"
            >
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

import utils from '@/utils';
import getFormattedDate from '@/mixins/getFormattedDate';

import UsersFiltersForm from '@/components/admin/users/UsersFiltersForm.vue';

export default {
  components: {
    UsersFiltersForm,
  },
  mixins: [getFormattedDate],
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      titleText: this.$t('DASHBOARD.VIEWS.USERS.TITLE'),
      options: {
        mustSort: true,
        sortBy: ['user'],
        sortDesc: [true],
      },
      headers: [
        {
          text: this.$t('DASHBOARD.VIEWS.USERS.TABLE.USER.LABEL'),
          align: 'center',
          sortable: true,
          value: 'user',
        }, {
          text: this.$t('DASHBOARD.VIEWS.USERS.TABLE.ROLE.LABEL'),
          align: 'center',
          sortable: true,
          value: 'role',
        }, {
          text: this.$t('DASHBOARD.VIEWS.USERS.TABLE.PASSWORD.LABEL'),
          align: 'center',
          sortable: false,
          value: 'password',
        }, {
          text: this.$t('DASHBOARD.VIEWS.USERS.TABLE.REGISTER_DATE.LABEL'),
          align: 'center',
          sortable: true,
          value: 'date',
        }, {
          text: this.$t('DASHBOARD.VIEWS.USERS.TABLE.ACTIONS.LABEL'),
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
      editUserTooltip: this.$t('DASHBOARD.VIEWS.USERS.TABLE.ACTIONS.EDIT.TOOLTIP'),
      adminText: this.$t('ROLES.ADMIN.TEXT'),
      privilegedText: this.$t('ROLES.PRIVILEGED.TEXT'),
    };
  },
  async fetch() {
    this.$store.commit('users/setUserPagination', {
      sort_property: this.options.sortBy[0],
      sort_type: this.options.sortDesc[0] ? 'desc' : 'asc',
    });

    return this.$store.dispatch('users/getUsers');
  },
  head() {
    return {
      title: this.$t('DASHBOARD.VIEWS.USERS.TITLE'),
    };
  },
  computed: {
    ...mapState('users', {
      loading: 'loading',
      users: (state) => state.users.data,
      total: (state) => state.users.total,
    }),
  },
  watch: {
    options: {
      handler() {
        this.getUsers();
      },
      deep: true,
    },
  },
  methods: {
    getUsers() {
      const {
        sortBy, sortDesc, page, itemsPerPage,
      } = this.options;

      this.$store.commit('users/setUserPagination', {
        page,
        per_page: itemsPerPage,
        sort_type: sortDesc[0] ? 'desc' : 'asc',
        sort_property: sortBy[0],
      });

      this.$store.dispatch('users/getUsers');
    },
    getRole(role) {
      if (role === utils.ROLES.ADMIN.VALUE) return this.adminText;
      if (role === utils.ROLES.PRIVILEGED.VALUE) return this.privilegedText;
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>