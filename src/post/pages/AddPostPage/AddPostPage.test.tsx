import { render, screen } from "@testing-library/react";
import AddPostPage from "./AddPostPage";
import PostsContextProvider from "../../context/PostsContextProvider";

describe("Given the AddPostPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Crear nuevo post' inside a heading", () => {
      const expectedTitleRegex = /crear nuevo post/i;
      render(<AddPostPage />, { wrapper: PostsContextProvider });

      const pageTitle = screen.getByRole("heading", {
        name: expectedTitleRegex,
      });

      expect(pageTitle).toBeVisible();
    });
  });
});
