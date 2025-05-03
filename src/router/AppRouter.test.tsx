import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import PostsContextProvider from "../post/context/PostsContextProvider";
import AppRouter from "./AppRouter";

describe("Given the App component", () => {
  describe("When it renders in path / and the user clicks on the button 'Crear Post'", () => {
    test("Then it should show Crear nuevo post inside a heading", async () => {
      render(
        <PostsContextProvider>
          <MemoryRouter initialEntries={["/"]}>
            <AppRouter />
          </MemoryRouter>
        </PostsContextProvider>,
      );

      const pageTitle = await screen.findByRole("heading", { name: /posts/i });

      expect(pageTitle).toBeInTheDocument();

      const createPostLink = await screen.findByRole("link", {
        name: /crear post/i,
      });

      await userEvent.click(createPostLink);

      const pageFormTitle = await screen.findByRole("heading", {
        name: /crear nuevo post/i,
      });

      expect(pageFormTitle).toBeInTheDocument();
    });
  });
});
