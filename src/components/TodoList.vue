<template>
  <v-card class="mx-auto " max-width="600" >
    <v-toolbar flat color="blue-grey" dark>
      <v-toolbar-title>Todo List</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-text-field
        variant="filled"
        label="Title"
        v-model="title"
        @keydown.enter="addTodo"
      ></v-text-field>
      <button @click="submitTasks">
        Submit
      </button>
   <!--TABLE-->
  <v-table
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th class="text-left">
          Task
        </th>
        <th class="text-left">
          Status
        </th>
        <th class="text-left">
          Delete
        </th>
        <th class="text-left">
          Edit
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td>
          <span :class="{ 'line-through': task.status === 'finished' }"></span>
{{ task.name }}
</td>
        <td>
          <span
          class="pointer select"
          @click="changeStatus(index)"
          :class="{
  'text-warning': task.status === 'to-do',
  'text-success': task.status === 'in-progress',
  'text-danger': task.status === 'finished',
      }">
          {{ capitalizeFirstChar(task.status)  }}
          </span>
         
        </td>
        <td>
          <div @click="deleteTask(index)">
            <v-icon
      size="large"
      color="red-darken-2"
      icon="mdi-delete"
      ></v-icon>
          </div>
        </td>

        <td>
          <div @click="editTask(index)">
            <v-icon
      size="large"
      color="green-darken-2"
      icon="mdi-pencil"
      ></v-icon>
          </div>
        </td>
      
      </tr>
    </tbody>
  </v-table>



      <v-divider class="my-2"></v-divider>

      <v-item-group multiple selected-class="bg-purple">
        <div class="text-caption mb-2">Tags</div>
        <v-item v-for="n in 8" :key="n" v-slot="{ selectedClass, toggle }">
          <v-chip :class="selectedClass" @click="toggle">
            Tag {{ n }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-card-text>

    <v-divider></v-divider>

    
  </v-card>
</template>

<script setup>
import {  ref } from "vue";
// import { capitalizeFirstChart, changeStatus } from "./components/TodoList.vue";


const title = ref("");
//  const activeChecbox= ref(false);
 const task = ref(" ");
 const editedTask= ref(null);
 const statuses = ["to-do", "in-progress", "finished"];
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
      );

  const addTodo = () => {
  tasks.value.push({name: title.value, status:"to-do"});
  title.value= "";
  changeStatus(tasks.value.length - 1, tasks.value, statuses);
   };
  
  const capitalizeFirstChar = (str) => {
      return str.charAt(0).toUpperCase()+str.slice(1);
  };
  const changeStatus = (index) => {
  if (tasks.value && tasks.value.length > 0 && index >= 0 && index < tasks.value.length) {
    let newIndex = statuses.indexOf(tasks.value[index].status);
    if (++newIndex > 2) newIndex = 0;
    tasks.value[index].status = statuses[newIndex];
  }
};


console.log(tasks.value);

  
// export {capitalizeFirstChart, changeStatus};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};


const editTask = (index) => {
  if (tasks.value[index]) {
    title.value = tasks.value[index].name;
    editedTask.value = index;
  }
};

const submitTasks = () => {
  if (task.value.length === 0) return;
  if (editedTask.value !== null) {
    tasks.value[editedTask.value].name = task.value; // title'ı güncelle
    tasks.value[editedTask.value].status = "to-do"; // status'u güncelle
    editedTask.value = null;
  } else {
    tasks.value.push({
      name: task.value,
      status: "to-do",
    });
  }
  task.value = "";
};
</script>

<style scoped>
/* Bu alanda sadece bu bileşenin stilini tanımlayabilirsiniz */
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

/* Özel stil sınıfı ile v-list-item'e belirgin arka plan rengi ve kenarlık ekleniyor */
.custom-list-item {
  background-color: #e0f7fa; /* Belirli bir arka plan rengi */
  border: 1px solid #00bcd4; /* Belirli bir kenarlık rengi */
  border-radius: 4px;
  margin-bottom: 4px; /* İsteğe bağlı: Her öğe arasına biraz boşluk eklemek için */
}
.line-through {
    text-decoration: line-through;
  }
  .text-danger{
    color: rgb(224, 56, 56);
  }
  .text-success{
    color: green;
  }
  .text-warning{
    color: rgb(217, 217, 38);
  }
  
</style>
