import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { initializeRouter } from "./router";
import { createPinia } from "pinia";
// import vue3GoogleLogin from "vue3-google-login";

const initApp = async () => {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(ElementPlus);
  app.use(pinia);
  const router = initializeRouter();
  app.use(router);
//   app.use(vue3GoogleLogin, {
//     clientId:
//       "1055389579812-7q5esl1f5bodk83kpsbo7rgkun1h6fa2.apps.googleusercontent.com",
//   });
  app.mount("#app");
};

initApp();
