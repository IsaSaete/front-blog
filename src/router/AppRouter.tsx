import React from "react";
import { Navigate, Route, Routes } from "react-router";
import App from "../components/App/App";
import PostsPage from "../post/pages/PostsPage/PostsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AddPostPage from "../post/pages/AddPostPage/AddPostPage";
import PostDetailPage from "../post/pages/PostDetailPage/PostDetailPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/posts" />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="posts?page=value" element={<PostsPage />} />
        <Route path="add-post" element={<AddPostPage />} />
        <Route path="post/:id" element={<PostDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
