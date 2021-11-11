import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {

    async create (data) {
      await this.$http.post('pessoa', data)
    },

    async update (edit) {
      await this.$http.put('pessoa/'`${edit.id}`, {corFavoritaId: edit.corFavoritaId})
    }
  },
  modules: {
  }
})
