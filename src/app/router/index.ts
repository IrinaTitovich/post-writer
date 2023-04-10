import { createRouter, createWebHistory } from "vue-router";
import { useUsers } from "../../stores/userStore";
import Home from "../../views/home.vue";
import NewPost from "../../views/new-post.vue";
import ShowPost from "../../views/show-post.vue";
import EditPost from "../../views/edit-post.vue";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/posts/new",
    component: NewPost,
    beforeEnter: () => {
      const usersStore = useUsers();

      if (!usersStore.currentUserId) {
        return {
          path: "/",
        };
      }
    },
  },
  {
    path: "/posts/:id",
    component: ShowPost,
    beforeEnter: () => {
      const usersStore = useUsers();

      if (!usersStore.currentUserId) {
        return {
          path: "/",
        };
      }
    },
  },
  {
    path: "/posts/:id/edit",
    component: EditPost,
    beforeEnter: () => {
      const usersStore = useUsers();

      if (!usersStore.currentUserId) {
        return {
          path: "/",
        };
      }
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
