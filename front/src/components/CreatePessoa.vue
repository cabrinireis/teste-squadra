<template>
  <div class="formCreate">
    <form @submit.prevent="savePerson" method="post">
      <fieldset>
        <label for="name">Name:</label>
        <input
          required
          type="text"
          id="name"
          name="name"
          v-model="Person.nome"
        />
      </fieldset>
      <fieldset>
        <label for="color">Selecione a Cor:</label>
        <select required name="color" v-model="Person.corFavoritaId">
          <option :value="opts.id" v-for="opts in options" :key="opts.id">
            {{ opts.descricao }}
          </option>
        </select>
      </fieldset>
      <fieldset class="buttons">
        <router-link to="/">
          <button @click="cancel" class="cancel">Cancelar</button>
        </router-link>

        <button v-if="!info" class="save" type="submit">Salvar</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    info: false,
    view: {
      type: Object,
      default: () => ({ id: 0 }),
    },
    edit: {
      type: Object,
      default: () => ({ id: 0 }),
    },
  },
  data() {
    return {
      options: null,
      Person: {
        nome: "",
        corFavoritaId: 0,
      },
    };
  },
  methods: {
    cancel() {
      this.Person = {};
      this.view = {};
      this.$emit("close");
    },
    async getColor() {
      await this.$http
        .get("cor")
        .then(res => {
          this.options = res.data.body;
        })
        .catch(err => {
          console.log(err);
        });
    },
    savePerson() {
      this.$emit("save", this.Person);
    },
    insertView() {
      if (Object.keys(this.edit).length !== 0) {
        this.Person.nome = this.edit.nome;
        this.Person.corFavoritaId = this.edit.corFavoritaId;
      } else {
        this.Person.nome = this.view.nome;
        this.Person.corFavoritaId = this.view.corFavoritaId;
      }
    },
  },

  computed: {
    viewset() {
      return this.insertView();
    },
  },
  mounted() {
    this.getColor();
    this.insertView();
  },
};
</script>

<style lang="scss">
.formCreate {
  width: 100%;
  margin: auto;
  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  form {
    max-width: 400px;
    margin: 10px auto;
    padding: 10px 20px;
    background: #f4f7f8;
    border-radius: 8px;
    fieldset {
      border: none;
      label {
        display: block;
        margin-bottom: 8px;
        text-align: left;
      }

      label.light {
        font-weight: 300;
        display: inline;
      }
    }
    input[type="text"],
    select {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      font-size: 16px;
      height: auto;
      margin: 0;
      outline: 0;
      padding: 15px;
      width: 100%;
      background-color: #e8eeef;
      color: #8a97a0;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
      margin-bottom: 30px;
    }
    select {
      padding: 6px;
      height: 48px;
      border-radius: 5px;
      :focus {
        width: auto;
      }
    }
    .buttons {
      display: flex;
      justify-content: center;
      gap: 3rem;
      .cancel {
        background-color: #94a8b3;
        border: 1px solid #94a8b3;
      }
    }
    button {
      padding: 19px 39px 18px 39px;
      color: #fff;
      background-color: #92c9e6;
      font-size: 18px;
      text-align: center;
      font-style: normal;
      border-radius: 5px;
      width: 100%;
      border: 1px solid #9dcbe4;
      border-width: 1px 1px 3px;
      box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
}

@media screen and (min-width: 480px) {
  form {
    max-width: 480px;
  }
}
</style>
