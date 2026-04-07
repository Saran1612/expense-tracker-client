import Home from "../views/Home.vue";
import Login from "../views/auth-screens/login.vue";
import Register from "../views/auth-screens/register.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "Login" },
    meta: { requiresAuth: false, title: "Login", layout: "auth" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false, title: "Login", layout: "auth" },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false, title: "Register", layout: "auth" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: false, title: "Home", layout: "workspace" },
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: () => import("../views/expense/expense.vue"),
    meta: { requiresAuth: false, title: "Expenses", layout: "workspace" },
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../views/category/category.vue"),
    meta: { requiresAuth: false, title: "Category", layout: "workspace" },
  },
  {
    path: "/budget",
    name: "Budget",
    component: () => import("../views/budget/budget.vue"),
    meta: { requiresAuth: false, title: "Budget", layout: "workspace" },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("../views/Analytics.vue"),
    meta: { requiresAuth: false, title: "Analytics", layout: "workspace" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: false, title: "Profile", layout: "workspace" },
  },
  {
    path: "/ask-ai",
    name: "AskAI",
    component: () => import("../views/ask-ai/chat.vue"),
    meta: { requiresAuth: true, title: "AskAI", layout: "workspace" },
  },
  //   {
  //     path: '/:pathMatch(.*)*',
  //     name: 'NotFound',
  //     component: () => import('../views/NotFound.vue'),
  //     meta: { requiresAuth: false, title: 'NotFound' , layout: 'auth'}
  //   }
];

export default routes;
