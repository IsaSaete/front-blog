import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import PostsPage from "./PostsPage";
import PostsContextProvider from "../../context/PostsContextProvider";
import { choutaKaladinPost } from "../../fixtures";

describe("Given the PostsPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Posts' inside a heading", async () => {
      render(
        <PostsContextProvider>
          <PostsPage />
        </PostsContextProvider>,
        { wrapper: MemoryRouter },
      );

      const pageTitle = await screen.findByRole("heading", { name: /posts/i });

      expect(pageTitle).toBeVisible();
    });
  });

  test("Then it should show Chouta callejero de Alethkar' inside a heading", async () => {
    render(
      <PostsContextProvider>
        <PostsPage />
      </PostsContextProvider>,
      { wrapper: MemoryRouter },
    );

    const postTitle = await screen.findByRole("heading", {
      name: new RegExp(choutaKaladinPost.title, "i"),
    });

    expect(postTitle).toBeVisible();
  });

  describe("And the user clicks on the button with label 'Eliminar post' from Chouta callejero de Alethkar 🌯⚔️ post", () => {
    test("Then it shouldn't show Chouta callejero de Alethkar 🌯⚔️ post'", async () => {
      render(
        <PostsContextProvider>
          <PostsPage />
        </PostsContextProvider>,
        { wrapper: MemoryRouter },
      );

      const postTitle = await screen.findByRole("heading", {
        name: new RegExp(choutaKaladinPost.title, "i"),
      });

      expect(postTitle).toBeVisible();
      const deleteButtons = await screen.findAllByLabelText(/eliminar post/i);

      await userEvent.click(deleteButtons[0]);

      const deletePostTitle = await screen.queryByRole("heading", {
        name: new RegExp(choutaKaladinPost.title, "i"),
      });

      expect(deletePostTitle).toBeNull();
    });
  });
});
