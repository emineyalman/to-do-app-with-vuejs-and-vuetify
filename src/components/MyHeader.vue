<template>
    <v-card
      color="grey-lighten-4"
      flat
      height="100px"
      rounded="0"
    >
      <v-toolbar density="compact">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Todo List </v-toolbar-title>
        <router-link v-if="hasDeneE" to="/DeneE">
      <v-btn>
        Todo List
      </v-btn>
    </router-link>
    <router-link v-if="hasBaskaBu" to="/BaskaBu">
      <v-btn>
       Todo Add
      </v-btn>
    </router-link>

        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </template>


<script setup>
 import DeneE from './DeneE.vue';
import BaskaBu from './BaskaBu.vue';

const hasDeneE = !!DeneE;

const hasBaskaBu = !!BaskaBu;
</script>
