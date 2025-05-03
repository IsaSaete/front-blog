import { Route, Routes } from "react-router";
import PostsPage from "../post/pages/PostsPage/PostsPage";
import AddPostPage from "../post/pages/AddPostPage/AddPostPage";
import PostDetailPage from "../post/pages/PostDetailPage/PostDetailPage";

const AppTestRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="posts" element={<PostsPage />} />
      <Route path="add-post" element={<AddPostPage />} />
      <Route path="post/:id" element={<PostDetailPage />} />
    </Routes>
  );
};

export default AppTestRouter;
