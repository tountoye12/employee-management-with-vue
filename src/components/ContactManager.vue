
<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">Employes Management
            <router-link :to="{name: 'AddContact'}" class="btn btn-success btn=sm">
              <i class=" fa fa-plus-circle"></i>
              New
            </router-link>
          </p>
          <p class="fst-italic"> Search by name</p>

          <form>
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Search Name" v-model="searchName">
                  </div>
                  <div class="col">
                    <input type="submit" class="btn btn-outline-dark">
                  </div>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>

    <!--    &lt;!&ndash; Sipinner &ndash;&gt;-->
    <!--    <div v-if="loading">-->
    <!--      <div class="container">-->
    <!--        <div class="row">-->
    <!--          <div class="col">-->
    <!--            <Spinner/>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!-- Error Message -->
    <div v-if="!loading && errorMessage">
      <div class="container mt-3">
        <div class="row">
          <div class="col">
            <p class="h4 text-danger fw-bold"> {{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3" v-if="filteredContacts.length > 0">
      <div class="row">
        <div class="col-md-6" v-for="contact of filteredContacts" :key="contact.id">
          <div class="card my-2 list-group-item-success">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-sm-4">
                  <img :src="contact.photo" alt="" class="contact-img">
                </div>
                <div class="col-sm-7">

                  <ul class="list-group">
                    <li class="list-group-item">Name: <span class="fw-bold"> {{ contact.name }} </span></li>
                    <li class="list-group-item">Email: <span class="fw-bold"> {{ contact.email }} </span></li>
                    <li class="list-group-item">Mobile: <span class="fw-bold"> {{ contact.mobile }} </span></li>
                  </ul>

                </div>
                <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                  <router-link :to="`/contacts/view/${contact.id}`" class="btn btn-warning my-1">
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link :to="`/contacts/edit/${contact.id}`" class="btn btn-primary my-1">
                    <i class="fa fa-pen"></i>
                  </router-link>
                  <button class="btn btn-danger my-1" data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          @click="setIdToDelete(contact.id)"><i
                      class="fa fa-trash"></i></button>
                </div>


                <!--  Popup For delete   -->
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"> Confirm Delete</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        Do really want to delete
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" @click="clickDeleteContact(idTodelete)"
                                data-bs-dismiss="modal">Confirm</button>

                      </div>
                    </div>
                  </div>
                </div>
                <!--  End Popup For delete   -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-3" v-if="filteredContacts.length === 0">
      <p>
        No contact found
      </p>
    </div>

  </div>
</template>

<!--Compostion Api-->
<script setup lang="ts">

import {ContactService} from '../services/ContactService'
import Contact from '../types/contact';

import {defineComponent, onMounted, ref, computed} from 'vue';

defineComponent({
  name: "ContactManager"
})


const contacts = ref<Contact[]>([]);
const loading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);
const searchName = ref<string>("");

const idTodelete = ref("");

const setIdToDelete = (id:string) => idTodelete.value = id;

const filteredContacts = computed(() => {
  if (!searchName.value) {
    return contacts.value;
  }
  return contacts.value.filter(contact =>
      contact.name.toLowerCase().includes(searchName.value.toLowerCase())
  );

});


// Used compositon rather than Options
onMounted(async () => {
  try {
    loading.value = true;
    const response = await getAllContactsData();
    contacts.value = response.data;
  } catch (error) {
    errorMessage.value = (error as Error).message;
  } finally {
    loading.value = false;
  }
});


const getAllContactsData = async () => {
  return await ContactService.getAllContacts()
}
const clickDeleteContact = async (contactId: string) => {

  console.log(contactId)
  try {
    loading.value = true
    let response = await ContactService.deleteContact(contactId)
    if (response) {
      //location.reload()
      let response = await ContactService.getAllContacts() //getting fresh data
      contacts.value = response.data
      loading.value = false
      //console.log(contactId)
    }
  } catch (error) {
    //errorMessage.value = error
    loading.value = false
  }
}

</script>

<style>

</style>
