<template>
  <v-app>
    <!-- <v-app>
      <MyHeader/>
    </v-app> -->
    <v-main>
      <!-- <TodoList/> -->
      <DeneE :title="title"/>
    </v-main>
  </v-app>
</template>




<script setup>
// import MyHeader from './components/MyHeader.vue';
// import TodoList from './components/TodoList.vue';
import DeneE from './components/DeneE.vue';
import { ref } from 'vue';

const title = ref('Kocamanbir başlık');
</script>

<script>
// You can still have a separate script section for other options or methods if needed
export default {
  name: 'App',

  components: {
    // MyHeader,
    // TodoList,
    DeneE,
  },
};
</script>
