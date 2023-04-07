import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { useUsers } from "./stores/userStore";
import { usePosts } from "./stores/postsStore";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const usersStore = useUsers();
const postsStore = usePosts();

Promise.all([usersStore.checkAutentification(), postsStore.fetchPosts()]).then(
  () => {
    app.use(router);
    app.mount("#app");
  }
);
