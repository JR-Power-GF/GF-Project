import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/manage",
      name: "manage",
      component: () => import("@/views/Manage/index.vue"),
    },
    {
      path: "/visulation",
      name: "visulation",
      component: () => import("@/views/Visulation/index.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/views/AiChat/index.vue"),
    },
  ],
});

export default router;
