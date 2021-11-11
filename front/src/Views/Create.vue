<template>
<div>
  <create-pessoa v-on:save="savePerson" />
</div>
</template>
<script>
import CreatePessoa from "../components/CreatePessoa.vue";
import { mapActions } from 'vuex'
export default {
  components: {
    CreatePessoa,
  },
  data() {
    return {
      color: null,
    };
  },
  methods: {
    ...mapActions(['create']),
    async savePerson(data) {

      try{
        await this.create(data)
        this.$router.push("/");
      }catch (err) {
        console.log(err.response.data.message)
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
