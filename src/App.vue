<template>
<!--  <HeaderNavBar />-->
<!--  <h1> Hello From App component  </h1>-->
<!--  <IncrementComponent />-->
<!--  <FooterComponent />-->
    <NavBar/>
    <router-view/>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import HeaderNavBar from './components/HeaderNavBar.vue'
import FooterComponent from './components/FooterComponent.vue'
import IncrementComponent from "./components/IncrementComponent.vue";
</script>



