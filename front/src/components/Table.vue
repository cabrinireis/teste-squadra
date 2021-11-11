<template>
  <div class="hello">
    <div>
      <div class="table-content">
        <div class="tableButton">
          <router-link to="/create">
            <button class="button">Adicionar</button>
          </router-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Cor Favorita</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in displayedPosts" :key="i">
              <td>{{ p.id }}</td>
              <td>{{ p.nome }}</td>
              <td> {{ p.corFavorita.descricao }} </td>
              <td class="tdButons">
                <button @click="edit(p)" class="button">
                  <i class="gg-pen"></i
                ></button>
                <button @click="view(p)" class="button">
                  <i class="gg-eye"></i
                ></button>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item">
              <button
                type="button"
                class="page-link"
                v-if="page != 1"
                @click="page--"
              >
                Previous
              </button>
            </li>
            <li class="page-item">
              <button
                type="button"
                class="page-link"
                v-for="(pageNumber, i) in pages.slice(page - 1, page + 5)"
                :key="i"
                @click="page = pageNumber"
              >
                {{ pageNumber }}
              </button>
            </li>
            <li class="page-item">
              <button
                type="button"
                @click="page++"
                v-if="page < pages.length"
                class="page-link"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config";
export default {
  data() {
    return {
      posts: null,
      page: 1,
      perPage: 2,
      pages: [],
      param: {
        sortField: "id",
        sortOrder: 1,
        limit: 6,
        page: 1,
      },
    };
  },
  methods: {
    getItems() {
      axios
        .get("pessoa", { params: this.param })
        .then(res => {
          this.posts = res.data.body.rows;
        })
        .catch(error => {
          console.log(error);
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      if (posts) {
        let page = this.page;
        let perPage = this.perPage;
        let from = page * perPage - perPage;
        let to = page * perPage;
        return posts.slice(from, to);
      }
    },
    view(data) {
      this.$emit("view", data);
    },
    edit(data) {
      this.$emit("edit", data);
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    },
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  created() {
    this.getItems();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../src/assets/icons.scss";

.table-content {
  max-width: 80%;
  margin: auto;
  .tableButton {
    width: 100%;
    display: flex;
    justify-content: end;
    padding: 1rem 0;

    .button {
      margin: 0 !important;
      margin-right: 1rem !important;
      width: 100px !important;
    }
  }
  .table {
    width: 100%;
    border-collapse: collapse;

    tbody tr:nth-child(even) {
      background-color: #d1e8f5;
    }

    td,
    th {
      padding: 12px 15px;
      border: 1px solid #ddd;
      text-align: center;
      font-size: 16px;
    }
  }

  .table th {
    background-color: #92c9e6;
    color: #ffffff;
  }

  .tdButons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    .button {
      margin: 0 !important;
    }
  }

  .button {
    width: 74px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #50cb8d;
    border: none;
    border-radius: 5px;
    color: #fff;
    margin: auto;
    cursor: pointer;
    :hover {
      color: #1c6946;
    }
  }

  button.page-link {
    display: inline-block;
  }
  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
    border: none;
  }
  .offset {
    width: 500px !important;
    margin: 20px auto;
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
