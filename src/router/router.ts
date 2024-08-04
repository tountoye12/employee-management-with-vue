import { createRouter, createWebHistory } from "vue-router";

import AddContact from "../components/AddContact.vue";
import ContactManager from '../components/ContactManager.vue';
import EditContact from '../components/EditContact.vue'
import ViewContact from '../components/ViewContact.vue'
const  routes = [
  {
    path: "/",
    name: "home",
    component: ContactManager,
  },
  {
    path: "/contacts",
    name: "ContactManager",
    component: ContactManager,
  },

  {
    path: "/contacts/add",
    name: "AddContact",
    component: AddContact,
  },

  {
    path: "/contacts/edit/:contactId",
    name: "EditContact",
    component: EditContact,
  },

  {
    path: "/contacts/view/:contactId",
    name: "ViewContact",
    component: ViewContact,
  },
];


 export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});


