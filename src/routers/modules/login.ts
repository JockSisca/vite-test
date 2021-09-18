import { RouteRecordRaw } from "vue-router";
const route: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    component: () => import("../../view/login/login.vue"),
    meta: { title: "登录" },
  },
];
export default route;
