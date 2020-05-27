<template>
  <b-container fluid>
    <b-overlay :show="wait" rounded="sm">
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="排序"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
                <template v-slot:first>
                  <option value>-- none --</option>
                </template>
              </b-form-select>
              <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                <option :value="false">遞增</option>
                <option :value="true">遞減</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1" />
        <div class="w-100"></div>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="搜尋"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="輸入關鍵字進行搜尋"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">清空</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="欲搜尋的欄位"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            description="若不打勾，將會搜尋全部欄位"
            class="mb-0"
          >
            <b-form-checkbox-group v-model="filterOn" class="mt-1">
              <b-form-checkbox value="org_name">單位名稱</b-form-checkbox>
              <b-form-checkbox value="org_addr">單位地址</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="end">
          <b-col xl="2" lg="2" md="3" sm="6">
              <b-button block variant="danger" @click="showCreateModal">新增</b-button>
          </b-col>
      </b-row>
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="每頁筆數"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions">
            </b-form-select>
          </b-form-group>
        </b-col>


        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
            aria-controls="myTable"
          ></b-pagination>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        id="myTable"
        show-empty
        small
        stacked="md"
        :items="organizationList"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:cell(actions)="record">
          <b-button
            size="sm"
            variant="success"
            style="margin: 0.1rem 0.1rem;"
            @click="showUpdateModal(record)"
          >修改</b-button>
          <b-button
            size="sm"
            variant="secondary"
            style="margin: 0.1rem 0.1rem;"
            @click="deleteRecord(record.item.org_id)"
          >刪除</b-button>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
      </b-modal>

      <OrganizationCreateOrUpdateFormModal
      v-show="toShowCreateModal"
      :refreshOrganizationList="refreshOrganizationList"
      ref="organizationCreateOrUpdateFormModal" />
    </b-overlay>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import datetimeFormatter from '../utils/datetimeFormatter';
import OrganizationCreateOrUpdateFormModal from '../components/OrganizationCreateOrUpdateFormModal.vue';

export default {
  name: 'Organization',
  components: {
    OrganizationCreateOrUpdateFormModal,
  },
  data() {
    return {
      fields: [
        {
          key: 'org_id',
          label: '識別碼',
          sortable: true,
          sortDirection: 'asc',
        },
        {
          key: 'org_name',
          label: '單位名稱',
          sortable: true,
          sortDirection: 'asc',
        },
        {
          key: 'org_addr',
          label: '單位地址',
          sortable: true,
          sortDirection: 'asc',
        },
        {
          key: 'created_at',
          label: '資料創立時間',
          sortable: true,
          sortDirection: 'asc',
          formatter: (value) => datetimeFormatter(value),
        },
        {
          key: 'updated_at',
          label: '最近修改時間',
          sortable: true,
          sortDirection: 'asc',
          formatter: (value) => datetimeFormatter(value),
        },
        {
          key: 'actions',
          label: '操作',
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [10, 15, 20, 25, 30],
      sortBy: 'created_at',
      sortDesc: true,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      toShowCreateModal: false,
    };
  },
  mounted() {
    this.$store.dispatch('organization/fetchOrganizationList');

    // Set the initial number of items
    this.totalRows = this.organizationList.length;
  },
  computed: {
    ...mapState({
      wait: (state) => state.organization.wait,
      organizationList: (state) => state.organization.organizationList,
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  methods: {
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showCreateModal() {
      this.toShowCreateModal = true;
      this.$refs.organizationCreateOrUpdateFormModal.showModal({ item: null });
    },
    showUpdateModal(record) {
      this.toShowCreateModal = true;
      this.$refs.organizationCreateOrUpdateFormModal.showModal({ item: record.item });
    },
    deleteRecord(orgId) {
      this.boxTwo = '';
      this.$bvModal.msgBoxConfirm(`您確定要刪除 {識別碼：${orgId}} 此筆資料？`, {
        title: '確認刪除',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
        .then((confirmYes) => {
          if (confirmYes) {
            this.$store.dispatch('organization/deleteOrganization', { org_id: orgId })
              .then(() => {
                this.refreshOrganizationList();
              })
              .catch((error) => {
                console.log('error:', error);
              });
          }
        })
        .catch((error) => {
          console.log('error:', error);
        });
    },
    refreshOrganizationList() {
      this.$store.dispatch('organization/fetchOrganizationList');
    },
  },
};
</script>
