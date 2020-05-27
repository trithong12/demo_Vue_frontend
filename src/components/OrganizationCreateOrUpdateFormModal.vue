<template>
  <div>
    <b-modal id="modal" ref="modal" :title="action + '單位'" @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="orgNameState"
            label="單位名稱"
            label-for="org-name-input"
            invalid-feedback="單位名稱為必填！"
          >
            <b-form-input
              id="org-name-input"
              v-model="data.orgName"
              :state="orgNameState"
              required></b-form-input>
          </b-form-group>
          <b-form-group
            :state="orgAddrState"
            label="單位地址"
            label-for="org-addr-input"
            invalid-feedback="單位名稱為必填！"
          >
            <b-form-input
              id="org-addr-input"
              v-model="data.orgAddr"
              :state="orgAddrState"
              required></b-form-input>
          </b-form-group>
        </form>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'OrganizationCreateOrUpdateFormModal',
  props: {
    refreshOrganizationList: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      action: '新增',
      data: {
        orgId: '',
        orgName: '',
        orgAddr: '',
      },
    };
  },
  computed: {
    orgNameState() {
      return this.data.orgName.length >= 1;
    },
    orgAddrState() {
      return this.data.orgAddr.length >= 1;
    },
  },
  methods: {
    checkFormValidity() {
      return this.$refs.form.checkValidity();
    },
    resetModal() {
      this.data = {
        orgId: '',
        orgName: '',
        orgAddr: '',
      };
    },
    handleOk(bvModalEvt) {
      // prevent modal from closing
      bvModalEvt.preventDefault();
      // trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      // select corresponding api for action
      let targetFunction = '';
      if (this.action === '新增') {
        targetFunction = 'organization/createOrganization';
      } else if (this.action === '修改') {
        targetFunction = 'organization/updateOrganization';
      }
      this.$store
        .dispatch(targetFunction, {
          data: {
            org_id: this.data.orgId,
            org_name: this.data.orgName,
            org_addr: this.data.orgAddr,
          },
        })
        .then(() => {
          this.$bvModal.hide('modal');
          this.refreshOrganizationList();
        })
        .catch((error) => {
          console.log('error:', error);
        });
    },
    showModal(payload) {
      // Assign action and data based on payload
      if (!payload.item) {
        this.action = '新增';
        this.resetModal();
      } else {
        this.action = '修改';
        this.data = {
          orgId: payload.item.org_id,
          orgName: payload.item.org_name,
          orgAddr: payload.item.org_addr,
        };
      }
      this.$bvModal.show('modal');
    },
  },
};
</script>
