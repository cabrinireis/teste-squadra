<template>
  <div>
    <modalView :active="modalActive">
      <formView
        v-on:close="close"
        v-on:save="saveEdit"
        :view="view"
        :edit="edit"
        :info="infoView"
      />
    </modalView>
    <table-pessoas
      v-on:view="viewPerson"
      v-on:edit="editPerson"
    ></table-pessoas>
  </div>
</template>

<script>
import modalView from "../components/modals.vue";
import formView from "../components/CreatePessoa.vue";
import TablePessoas from "../components/Table.vue";
import { mapActions } from "vuex";
export default {
  components: {
    TablePessoas,
    modalView,
    formView,
  },
  data() {
    return {
      modalActive: false,
      view: {},
      edit: {},
      infoView: false,
    };
  },
  methods: {
    ...mapActions(["update"]),
    close() {
      this.modalActive = false;
      this.infoView = false;
      this.view = {};
      this.edit = {};
    },
    async saveEdit() {
      try {
        if (Object.keys(this.edit).length !== 0) {
          await this.update(this.edit);
        }
        this.modalActive = false;
      } catch (err) {
        this.modalActive = false;
      }
    },
    editPerson(data) {
      this.modalActive = true;
      this.edit = data;
    },
    viewPerson(data) {
      this.modalActive = true;
      this.view = data;
      this.infoView = true;
    },
  },
};
</script>

<style></style>
