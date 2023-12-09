<template>
  <div>
    <h1>Okey</h1>
    <h1>{{ bu }}</h1>
    <button @click="Ekle">Ekle</button>
    <h1>Deneme</h1>
   
    <transition-group tag="ol" class="fade">
      <li v-for="x in products" :key="x" class="fade-move" style="background: #f0f0f0; padding: 5px; margin: 5px 0; border-radius: 5px;">
        {{ x }}
        <button @click="deleteItem(x)" style="background-color: red; padding: 3px;">Sil</button>
        <button @click="editTodo(x)" style="background-color: green; padding: 3px;">Düzenle</button>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const products  = defineProps([ "products"]);
const emits = defineEmits(["addTodo"]);

const Ekle = () => {
  // Burada Ekle olayını emit ederek parent componentteki addEl fonksiyonunu çağırıyoruz
  emits("addTodo");

  // Eğer burada products listesine bir şeyler eklemek istiyorsanız, bu işlemi yapabilirsiniz.
  // Örneğin:
  // products.push("Yeni Eleman");
};

const deleteItem = (item) => {
  emits("deleteItem", item);
};

const editTodo = (item) => {
  emits("editTodo", item);
};
</script>
