import { createRouter, createWebHistory } from "vue-router";
import navigation from "./navigations";
import { isAuthenticated } from "../utils/auth.utils";

const routes = [...navigation];
// eslint-disable-next-line func-names
export default function (ctx) {
  console.log("ctx", ctx);
  ctx.Router.registerRoutes([]);
}

const initializeRouter = () => {
  // eslint-disable-next-line new-cap
  const router = new createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  });
  router.beforeEach(async (to, from, next) => {
    // Handle 404 routes
    if (!to.matched.length) {
      next({
        name: "NotFound",
        params: { type: "page-not-found" },
      });
      return;
    }

    // Check if route requires authentication
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isAuth = isAuthenticated();

    // If route requires auth but user is not authenticated, redirect to login
    if (requiresAuth && !isAuth) {
      next({ name: "Login" });
      return;
    }

    // If user is authenticated and trying to access auth pages, redirect to home
    const authPages = ["Login", "Signup"];
    if (isAuth && authPages.includes(to.name)) {
      next({ name: "Home" });
      return;
    }

    // Set page title
    const nearestWithTitle = to.matched
      .slice()
      .reverse()
      .find((r) => r.meta && r.meta.title);
    if (nearestWithTitle) {
      document.title = `Expense Tracker - ${nearestWithTitle.meta?.title}`;
    }

    next();
  });
  return router;
};

export { initializeRouter };
