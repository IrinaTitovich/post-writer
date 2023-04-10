import { DateTime } from "luxon";
import { defineStore } from "pinia";
import { Period } from "../constants";
import { Post, TimeLinePost } from "../posts";

interface IPostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore("posts", {
  state: (): IPostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),

  getters: {
    filteredPosts: (state): TimeLinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw Error(`Post with ${id} expected`);
          }

          return {
            ...post,
            created: DateTime.fromISO(post?.created),
          };
        })
        .filter((p) => {
          if (state.selectedPeriod === "Today") {
            return p.created >= DateTime.now().minus({ day: 1 });
          }
          if (state.selectedPeriod === "This week") {
            return p.created >= DateTime.now().minus({ week: 1 });
          }
          if (state.selectedPeriod === "This month") {
            return p.created >= DateTime.now().minus({ month: 1 });
          }
          return false;
        });
    },
  },

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },

    async createPost(newPost: Post) {
      const body = JSON.stringify(newPost);

      await window.fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
    },

    async updatePost(updatedPost: Post) {
      const body = JSON.stringify(updatedPost);

      await window.fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
    },

    async fetchPosts() {
      const response = await window.fetch("/api/posts");
      const data = (await response.json()) as Post[];
      await delay();

      const ids: string[] = [];
      const all = new Map<string, Post>();
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },
  },
});
