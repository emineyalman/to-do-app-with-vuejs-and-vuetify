<template>
  <v-card class="mx-auto" max-width="600">
    <v-toolbar flat color="blue-grey" dark>
      <v-toolbar-title>Todo List</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <div class="input-container">
        <v-text-field
          variant="filled"
          label="Add New Todo"
          v-model="title"
          @keydown.enter="addTodo"
        ></v-text-field>

        <button @click="submitTasks" class="submit-button">Submit</button>
      </div>


      <!-- Uyarı kutucuğu için animasyonlar -->
      <transition name="fade">
        <v-alert
          v-show="showEmptyTitleAlert"
          type="error"
          outlined
          @click="closeAlert"
        >
          Please enter a todo before submitting.
        </v-alert>
      </transition>

      <!--TABLE-->
      <v-table fixed-header height="300px">
        <thead>
          <tr>
            <th class="text-left">Task</th>
            <th class="text-left">Status</th>
            <th class="text-left">Delete</th>
            <th class="text-left">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="task.id" :class="getTaskClass(task.status)">
            <td >
              <span
                :class="{ 'line-through': task.status === 'finished' }"
              ></span>
              {{ capitalizeFirstChar(task.name) }}
            </td>
            <td >
              <span
                class="pointer select"
                @click="changeStatus(index)"
                :class="{
                  'text-warning': task.status === 'to-do',
                  'text-success': task.status === 'in-progress',
                  'text-danger': task.status === 'finished',
                }"
              >
              {{ capitalizeFirstChar(task.status) }}
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

    </v-card-text>

  </v-card>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";

const title = ref("");
// const task = ref(" ");
const editedTaskIndex = ref(null);
const statuses = ["to-do", "in-progress", "finished"];
const tasks = ref([]);
const showEmptyTitleAlert = ref(false); // Added to control the visibility of the alert

const capitalizeFirstChar = (str) => {
  return str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

// Load tasks from local storage on component mount
onMounted(() => {
  const storedTasks = localStorage.getItem("tasks");
  tasks.value = storedTasks ? JSON.parse(storedTasks) : [];
});

const addTodo = () => {
  if (title.value.trim() === "") {
    showEmptyTitleAlert.value = true; // Show the alert
    return;
  }

  // If title is not empty, proceed to add the todo
  tasks.value.push({ name: title.value, status: "to-do" });
  title.value = "";
  changeStatus(tasks.value.length - 1);
  updateLocalStorage();
  showEmptyTitleAlert.value = false; // Hide the alert after adding todo
};

const changeStatus = (index) => {
  if (
    tasks.value &&
    tasks.value.length > 0 &&
    index >= 0 &&
    index < tasks.value.length
  ) {
    let newIndex = statuses.indexOf(tasks.value[index].status);
    if (++newIndex > 2) newIndex = 0;
    tasks.value[index].status = statuses[newIndex];
    updateLocalStorage();
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  updateLocalStorage();
};

const editTask = (index) => {
  title.value = tasks.value[index].name;
  editedTaskIndex.value = index;
};

const submitTasks = () => {
  if (title.value.length === 0) return;

  if (editedTaskIndex.value !== null) {
    // Update the existing task
    tasks.value[editedTaskIndex.value].name = title.value;
    tasks.value[editedTaskIndex.value].status = "to-do";
    editedTaskIndex.value = null;
  } else {
    // Add a new task
    tasks.value.push({
      name: title.value,
      status: "to-do",
    });
  }
  title.value = "";
  updateLocalStorage();
};

// Function to update tasks in local storage
const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const closeAlert = () => {
  showEmptyTitleAlert.value = false;
};

const getTaskClass = (status) => {
  switch (status) {
    case 'in-progress':
      return 'custom-list-item'; // Yeşil
    case 'to-do':
      return 'custom-list-item-warning'; // Sarı
    case 'finished':
      return 'custom-list-item-danger'; // Kırmızı
    default:
      return '';
  }
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
.text-danger {
  color: rgb(224, 56, 56);
}
.text-success {
  color: green;
}
.text-warning {
  color: rgb(217, 217, 38);
}

/* Animasyonları tanımla */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s, transform 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px); /* Yatayda kayma miktarını ayarlayabilirsiniz */
}
.custom-list-item {
  background-color: #adeeb0; /* Yeşil */
}

.custom-list-item-warning {
  background-color: #f3edb0; /* Sarı */
}

.custom-list-item-danger {
  background-color: #d2827d; /* Kırmızı */
}
.input-container {
  display: flex;
  gap: 10px; /* İki eleman arasındaki boşluğu ayarlayabilirsiniz */
  align-items: center;
}

.submit-button {
  background-color: rgb(16, 98, 192); /* Mavi tonu - Değiştirebilirsiniz */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #1a78cf; /* Hover rengi - Değiştirebilirsiniz */
}
</style>
  

