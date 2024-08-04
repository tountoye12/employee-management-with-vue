
<template>
  <div>
    <button @click="increment"> Increment </button>
    <p>{{count}}</p>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'

const count = ref(0)

onMounted( () => {
  alert("Mounted");
})

const increment = () => {
  count.value++;
}

</script>
