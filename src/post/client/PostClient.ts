import { mapPostDtoToPost, mapPostsDtoToPosts } from "../dto/mappers";
import { PostDto } from "../dto/types";
import { Post, PostData } from "../types";
import { PostClientStructure, PostsData, PostsDtoData } from "./types";

class PostClient implements PostClientStructure {
  private apiUrl = import.meta.env.VITE_API_URL;

  public getPosts = async (pageNumber?: number): Promise<PostsData> => {
    const fetchUrl = !pageNumber
      ? `${this.apiUrl}/posts`
      : `${this.apiUrl}/posts?page=${pageNumber}`;

    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error("Error fetching posts");
    }

    const { posts: postsDto, postsTotal } =
      (await response.json()) as PostsDtoData;

    const posts = mapPostsDtoToPosts(postsDto);

    const postsData: PostsData = {
      posts,
      postsTotal,
    };

    return postsData;
  };

  public addPost = async (postData: PostData): Promise<Post> => {
    const response = await fetch(`${this.apiUrl}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Error adding new post");
    }

    const newPostDto = (await response.json()) as { post: PostDto };

    const post = mapPostDtoToPost(newPostDto.post);

    return post;
  };

  public deletePost = async (postId: string): Promise<Post> => {
    const response = await fetch(`${this.apiUrl}/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Error deleting post");
    }

    const deletedPostDto = (await response.json()) as { post: PostDto };

    const deletePost = mapPostDtoToPost(deletedPostDto.post);

    return deletePost;
  };

  public getPostById = async (postId: string): Promise<Post> => {
    const response = await fetch(`${this.apiUrl}/posts/${postId}`);

    if (!response.ok) {
      throw new Error("Error getting post");
    }

    const postDto = (await response.json()) as { post: PostDto };

    const post = mapPostDtoToPost(postDto.post);

    return post;
  };
}

export default PostClient;
