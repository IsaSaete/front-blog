import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PostCard from "./PostCard";
import { choutaKaladinPost } from "../../fixtures";
import PostsContextProvider from "../../context/PostsContextProvider";

describe("Given the PostCard component", () => {
  describe("When it receives 'Chouta callejero de Alethkar 🌯⚔️' post", () => {
    test("Then it should show 'Chouta callejero de Alethkar 🌯⚔️' inside a heading", () => {
      const expectedTitle = /Chouta callejero de Alethkar 🌯⚔️/i;
      render(
        <PostsContextProvider>
          <PostCard post={choutaKaladinPost} index={1} />
        </PostsContextProvider>,
        { wrapper: MemoryRouter },
      );

      const postTitle = screen.getByRole("heading", { name: expectedTitle });

      expect(postTitle).toBeVisible();
    });

    test("Then it should show an image of shining bread with salt crystals and golden crust", () => {
      render(
        <PostsContextProvider>
          <PostCard post={choutaKaladinPost} index={1} />
        </PostsContextProvider>,
        { wrapper: MemoryRouter },
      );

      const postImage = screen.getByAltText(choutaKaladinPost.imageAlt);

      expect(postImage).toBeVisible();
    });

    test("Then it should show only the first 100 words of the content", () => {
      const expectedWordTotal = 100;
      render(
        <PostsContextProvider>
          <PostCard post={choutaKaladinPost} index={1} />
        </PostsContextProvider>,
        { wrapper: MemoryRouter },
      );

      const postContent = screen.getByRole("paragraph");
      const actualWordTotal = postContent.textContent?.split(" ").length;

      expect(actualWordTotal).toBe(expectedWordTotal);
    });

    test("Then it should show a 'X' inside a button", () => {
      render(
        <PostsContextProvider>
          <PostCard post={choutaKaladinPost} index={1} />
        </PostsContextProvider>,
        { wrapper: MemoryRouter },
      );

      const deleteButton = screen.getByLabelText(/eliminar/i);

      expect(deleteButton).toBeVisible();
    });

    test("Then it should show a 'INFO' link", () => {
      render(
        <PostsContextProvider>
          <PostCard post={choutaKaladinPost} index={1} />
        </PostsContextProvider>,
        { wrapper: MemoryRouter },
      );

      const infoLink = screen.getByRole("link", { name: /info/i });

      expect(infoLink).toBeInTheDocument();
    });
  });
});
