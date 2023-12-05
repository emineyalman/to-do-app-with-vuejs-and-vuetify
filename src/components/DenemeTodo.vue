<template>
    <div>
        <h1>Dene Babam Dene</h1>
        <v-container>
            <v-text-field label="Label"
            v-model="title"
            @keydown.enter="addTodo"
            ></v-text-field>
    <v-list lines="two">
  <v-list-item
  v-for="(task, index) in tasks" :key="task.id"
    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
  ></v-list-item>
</v-list>
        </v-container>
    </div>
</template>

<script setup>
import {  ref } from "vue";

const title = ref ("");
//const task = ref ("");
// const status =["to-do", "in-progress", "finished"];

const tasks = ref([
          {
            id:"",
            name: 'Make meal',
            status: "to-do",
          },
          {
            id:"",
            name: 'Wash dishes',
            status: "in-progress",
          },
          {
            id:"",
            name: 'Write code',
            status:"in-progress",
          },
          {
            id:"",
            name: 'Study English',
            status: "finished",
          },
          {
            id:"",
            name: 'Do sport',
            status: "finished",
          },
         
        ],
      )
     const addTodo = () => {
       tasks.value.push({
        name: title.value, status:"to-do"} )
        title.value =";"
      
      }
</script>