import { createRouter, createWebHistory } from "vue-router";
import login from "./modules/login";

export const router = createRouter({
  history: createWebHistory(),
  routes: [...login],
});
