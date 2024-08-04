

<template>
    <div>
        <h1> {{ headerMessage }} </h1>
    </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'
const headerMessage = ref("Header nav bar here")


</script>
