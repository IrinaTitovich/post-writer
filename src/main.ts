import { createApp } from "vue";
import { createPinia } from "pinia";
import { App, router } from "./app/";
import { useUsers } from "./entities/user";
import { usePosts } from "./entities/post";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(VueQueryPlugin);

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
