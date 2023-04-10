import { createRouter, createWebHistory } from "vue-router";
import { useUsers } from "../../entities/user";
import { EditPost, NewPost, PostView, ShowPost } from "../../pages";

export const routes = [
  {
    path: "/",
    component: PostView,
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
