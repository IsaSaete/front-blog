import { useParams } from "react-router";
import { useEffect, useState } from "react";
import usePostsContext from "../../context/hooks/usePostsContext";
import { Post } from "../../types";
import "./PostDetailPage.css";

const PostDetailPage: React.FC = () => {
  const { loadPostById } = usePostsContext();
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPost = async () => {
      const post = await loadPostById(id!);
      setPost(post);
    };

    getPost();
  }, [loadPostById, id]);

  if (!post) {
    return <h2 className="loading">Loading...</h2>;
  }

  const imageUrl = post.detailImageUrl ? post.detailImageUrl : post.imageUrl;

  return (
    <>
      <header className="page-header">
        <h2 className="page-header__title">{post.title}</h2>
        <span className="page-header__date">
          {post.publishDate.toLocaleDateString("es-ES")}
        </span>
      </header>
      <div className="post-detail">
        <div className="post-detail__wrapper">
          <img
            className="post-detail__image"
            src={imageUrl}
            alt={post.imageAlt}
            width={100}
            height={100}
          />
          <div className="post-detail__info">
            <p className="post-detail__content">{post.content}</p>
            <span className="post-detail__author">{post.author}</span>
            <ul className="post-detail__tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <span className="post-detail__tag">#{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
