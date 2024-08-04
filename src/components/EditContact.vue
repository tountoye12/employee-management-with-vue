<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold"> Edit Contact</p>
          <p class="fst-italic">
            Edit and Save contact
          </p>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="updateSubmit">
            <div class="md-2">
              <input type="text" class="form-control" placeholder="name" v-model="contact.name">
            </div>
            <div class="md-2">
              <input type="text" class="form-control" placeholder="Photo URL" v-model="contact.photo">
            </div>

            <div class="md-2">
              <input type="email" class="form-control" placeholder="Email" v-model="contact.email">
            </div>

            <div class="md-2">
              <input type="number" class="form-control" placeholder="Mobile" v-model="contact.mobile">
            </div>

            <div class="md-2">
              <input type="text" class="form-control" placeholder="Compagny" v-model="contact.compagny">
            </div>
            <div class="md-2">
              <input type="text" class="form-control" placeholder="Title" v-model="contact.title">
            </div>
            <div class="md-2">
              <select class="form-control" v-if="groups.length > 0">
                <option value="">Seclect Group</option>
                <option :value="group" v-for="group of groups"> {{ group.name }}</option>
              </select>
            </div>

            <div class="md-2">
              <input type="submit" class="btn btn-success" value="Update">
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <img :src="contact.photo" alt="" class="contact-img">
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ContactService } from '../services/ContactService';
import {useRouter} from "vue-router";


import {defineComponent, onMounted, reactive, ref} from "vue";

import Contact from "../types/contact.js";
const  router = useRouter()
const contactId = ref<string | string []>(" ");
const groups = ref<any>([])
//const errorMessage = ref<string | null>(null);
const loading = ref<boolean>(false);
let contact = reactive<Contact>({
  id: '',
  name: '',
  photo: '',
  email: '',
  mobile: '',
  compagny: '',
  title: '',
  groupId: ''
});

defineComponent({
  name: "EditContact"
})


onMounted( async () => {
  contactId.value = router.currentRoute.value.params.contactId.toString()
  if(contactId.value){
    try {
      loading.value = true
      let response = await ContactService.getContact(contactId.value)
      let responseGroup = await ContactService.getAllGroups()
      contact = response.data

      console.log("Contact===>"+  contact)

      groups.value = responseGroup.data
      loading.value = false
    }
    catch (error) {

      //errorMessage.value = error
      loading.value = false

    }
  }
});


const  updateSubmit = async () => {

  if(contactId.value !== null) {

    try {
      let response = await ContactService.updateContact(contact, contact.id)

      if(response)
      {
        return router.push('/')
      }
      else{
        return router.push(`/contacts/edit/${contactId.value}`)
      }

    } catch (error) {
      console.log(error)

    }
  }
}


</script>

