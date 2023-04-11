import { useQuery } from "@tanstack/vue-query";
import { usePosts } from "../store/postsStore";

export const POSTS_QUERY = ["posts"];

export function usePostsQuery() {
  return useQuery(POSTS_QUERY, () => {
    const postsStore = usePosts();

    // TODO use cash but not the store
    postsStore.fetchPosts();
  });
}
