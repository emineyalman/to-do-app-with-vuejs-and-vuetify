<template>
  <div class="cont">
    <v-container>
      <h3 style="color: #333; font-family: 'Arial', sans-serif;">TO-DO APP</h3>
     <!-- <h1>{{ title }}</h1> -->
    <input @keydown.enter.prevent="Submit" placeholder="Add New Todo" type="text" v-model="inpName" class="bu">
    <button  @click="addEl" style="background: #4caf50; color: white; padding: 10px; border: none; cursor: pointer;">Add</button>
    
    <transition-group tag="ol" class="fade">
      <li v-for="x in products" :key="x" class="fade-move" style="background: #f0f0f0; padding: 5px; margin: 5px 0; border-radius: 5px;">
        {{ x }}
        <button @click="deleteİn" style="background-color: red; padding: 3px;">Sil</button>
        <button @click="editTodo" style="background-color: green; padding: 3px;">Düzenle</button>
      </li>
      
    </transition-group>
  </v-container>
  </div>
 <BaskaBu :bu="titleother" @addTodo="addEl" :products="products">Burada mısın</BaskaBu>
</template>

<script setup>
import {ref }from 'vue'
import BaskaBu from './BaskaBu.vue';

const titleother = ref('Başlık Bu')

 const products= ref([
 { id: 1, name: "Ürün 1" },
  { id: 2, name: "Ürün 2" },
 ]);
 const inpName = ref( " ");
 const editedTodo = ref(null);
   
 const addEl = () => {
      const index = inpName.value;
      products.value.push(index);
      inpName.value = '';
    };
const deleteİn = (index) =>{
 products.value.splice(index,1)
}

  const Submit = () => {
    addEl();
  }

  const editTodo = (index) =>{
    if(products.value[index]){
      editedTodo.value=index;
    }
  }
</script>

<script>

export default {
  // props:["title"],
  components:BaskaBu,

}
</script>


<style>
.cont{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 30%;
}
.bu {
  width: 300px;
  height: 40px;
  background: rgb(206, 193, 193);
  color: white;
  margin-bottom: 10px;
  margin-right: 20px;
}

/* Styles for the TransitionGroup animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s, transform 0.7s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Styles for the list items */
.fade-move {
  transition: transform 0.7s;
}
.v-enter-from {
    opacity: 0;
    rotate: 180deg;
  }
  .v-enter-to {
    opacity: 1;
    rotate: 0deg;
  }
  .v-enter-active {
    transition: all 0.7s;
  }
  li{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
