import { createApp } from "vue";
import { createPinia } from "pinia";
import { App, router } from "./app/";
import { useUsers } from "./entities/user";
import { usePosts } from "./entities/post";

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
