<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold"> Add Contact</p>
          <p class="fst-italic"> Add Employes Info here</p>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="submitCreate()">
            <div class="md-2">
              <input required type="text" class="form-control" placeholder="Name" v-model="contact.name">
            </div>
<!--            <div class="md-2">-->
<!--              <input required type="text" class="form-control" placeholder="Photo URL" v-model="contact.photo">-->
<!--            </div>-->

            <div class="md-2">
              <input required type="email" class="form-control" placeholder="Email" v-model="contact.email">
            </div>

            <div class="md-2">
              <input required type="text" class="form-control" placeholder="Mobile" v-model="contact.mobile">
            </div>

            <div class="md-2">
              <input required type="text" class="form-control" placeholder="Compagny" v-model="contact.compagny">
            </div>
            <div class="md-2">
              <input required type="text" class="form-control" placeholder="Title" v-model="contact.title">
            </div>
            <div class="md-2">
              <select required class="form-control" v-if="groups.length > 0" v-model="contact.groupId">
                <option value="">Select Group</option>
                <option :value="group.id" v-for="group of groups" :key="group.id">{{ group.name }}</option>
              </select>
            </div>

            <div class="md-2">
              <input type="submit" class="btn btn-success" value="Create">
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

import {useRouter} from 'vue-router';
import {ContactService} from '../services/ContactService'



import {defineComponent, onMounted, reactive, ref} from 'vue';
import Contact from '../types/contact';
// Used composition rather than Options

defineComponent({
  name: "AddContact"
})

const router = useRouter();
const contact = reactive<Contact>({
  id: '',
  name: '',
  photo: '',
  email: '',
  mobile: '',
  compagny: '',
  title: '',
  groupId: ''
});


let  photoId = ref<number>(0)

const groups = ref<any>([]);

onMounted(async () => {
  try {

    let response = await ContactService.getAllGroups()
    groups.value = response.data
    //contact.value = response.data
    //groups.value = contact.value.groupId
  } catch (error) {
    console.log(error)
  }
})

const submitCreate = async () => {
  try {

// Construct the URL
    contact.photo = 'https://i.pravatar.cc/150?img=' + getRandomInt(1, 50);
    let response = await ContactService.createContact(contact)

    if (response) {
      return router.push('/')
    } else {
      //do something here
      return router.push('/contacts/add')
    }
  } catch (error) {
    console.log(error)
  }
}


function getRandomInt(min: number, max: number): number {
  // Ensure min and max are integers and min is less than max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>

<style>

</style>





