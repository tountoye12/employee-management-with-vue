<template>

  <div>
   <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold"> View Contact</p>
          <p class="fst-italic">
              Contact Details 
            </p>
        </div>
      </div>
    </div>

<!--    &lt;!&ndash; Sipinner &ndash;&gt;-->
<!-- <div v-if="loading">-->
<!--  <div class="container">-->
<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <Spinner/>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!-- </div>-->

 <!-- Error Message -->
 <div v-if="!loading && errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h4 text-danger fw-bold"> {{ errorMessage  }}</p>
        </div>
      </div>
    </div>
 </div>


    <div class="container" v-if="!loading && isDone() && contact && group">
        <div class="row align-items-center">
            <div class="col-md-4">
               <img :src="contact.photo" alt="" class="contact-img-big"> 
            </div>
            <div class="col-md-6">
                <ul class="list-group">
                <li class="list-group-item">Name: <span class="fw-bold"> {{contact.name}} </span></li>
                <li class="list-group-item">Email: <span class="fw-bold"> {{contact.email}} </span></li>
                <li class="list-group-item">Mobile: <span class="fw-bold"> {{contact.mobile}} </span></li>
                <li class="list-group-item">company: <span class="fw-bold"> {{contact.compagny}} </span></li>
                <li class="list-group-item">Title: <span class="fw-bold">{{contact.title}} </span></li>
                <li class="list-group-item">Group: <span class="fw-bold"> {{group.name}} </span></li>
              </ul>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <router-link to="/" class="btn btn-success">
                <i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
            </div>
        </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">

import { ContactService } from '../services/ContactService'

import Contact from "../types/contact.ts";


import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
const  route = useRouter()
const  contactId = ref<string| string []>("");
const loading = ref<boolean>(false);
const  contact = ref<Contact>({
  id: '',
  name: '',
  photo: '',
  email: '',
  mobile: '',
  compagny: '',
  title: '',
  groupId: ''
});
const  group = ref<any>(null);
const  errorMessage = ref<string | null>(null);

onMounted(async () => {

  contactId.value = route.currentRoute.value.params.contactId.toString()
  console.log('Route Params:', route);
  console.log(contactId);
  if (contactId.value) {
    try {
      loading.value = true;
      const response = await ContactService.getContact(contactId.value);
      contact.value = response.data;
      console.log("Contact ====>" + contact.value)
      const groupResponse = await ContactService.getGroup(contact.value.groupId);

      group.value = groupResponse.data;
    } catch (error) {
      errorMessage.value = (error as Error).message;
    } finally {
      loading.value = false;
    }
  } else {
    errorMessage.value = 'Contact ID is missing';
  }
});

const isDone = () => {
  return contact.value !== null && group.value !== null;
};

</script>
  
