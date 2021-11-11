import Vue from 'vue'
import VueRouter from 'vue-router'

const List = () => import(/* webpackChunkName: "Home" */ "../Views/ListPerson");
const Create = () => import(/* webpackChunkName: "Create" */ "../Views/Create");

Vue.use(VueRouter)

const routes = [
  {
    name: 'List',
    path: "/",
    component: List
  },
  {
    name: "Create",
    path: "/create",
    component: Create
  }

]

const router = new VueRouter({
  routes,
});

export default router;
