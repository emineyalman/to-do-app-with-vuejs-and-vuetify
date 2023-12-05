<template>
    <div>
        <h1>Okey</h1>
        <h1>{{ bu }}</h1>
        <button @click="Ekle">Ekle</button>
    </div>
</template>

<script setup>
import {  defineProps, defineEmits } from 'vue';

const  bu  = defineProps(['bu']);
const emits = defineEmits(['addTodo']);

const Ekle = () => {
  // Burada Ekle olayını emit ederek parent componentteki addEl fonksiyonunu çağırıyoruz
  emits('addTodo');
};

</script>