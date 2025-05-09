import { Post, PostData } from "../types";

interface PostsContextStructure {
  posts: Post[];
  postsTotal: number;
  loadPostsByPage: (pageNumber?: number) => Promise<void>;
  createPost: (postData: PostData) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  loadPostById: (postId: string) => Promise<Post>;
}

export default PostsContextStructure;
