// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MyHeader from "@/components/MyHeader";
import DeneE from '@/components/DeneE.vue';
import BaskaBu from '@/components/BaskaBu.vue';

const routes = [
    {
      path: '/',
      name: 'MyHeader',
      component: MyHeader,
    },
    {
      path: '/DeneE',
      name: 'DeneE',
      component: DeneE
    },
    {
      path: '/BaskaBu',
      name: 'BaskaBu',
      component: BaskaBu,
    },
  ];
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  export default router;