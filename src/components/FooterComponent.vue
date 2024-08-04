

<template>
    <div>
        <h2>
            {{ footerMessage }}
        </h2>
    </div>
</template>


<script setup lang="ts">

import {ref} from 'vue'
const footerMessage = ref("Footer is here")

</script>