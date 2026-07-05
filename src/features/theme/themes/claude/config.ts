import type { ThemeConfig } from "@/features/theme/contract/config";

export const config: ThemeConfig = {
  home: { recentPostsLimit: 5, popularPostsLimit: 5 },
  posts: { postsPerPage: 12 },
  post: { relatedPostsLimit: 4 },
};
