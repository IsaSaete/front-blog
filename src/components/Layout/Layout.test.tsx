import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";
import Layout from "./Layout";
import PostsContextProvider from "../../post/context/PostsContextProvider";
import PostsPage from "../../post/pages/PostsPage/PostsPage";

describe("Given the Layout component", () => {
  describe("When it renders in page 1", () => {
    test("Then it should show 'Aliset comiendo por el mundo' inside a level 1 heading", () => {});
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    const appTitle = screen.getByRole("heading", {
      name: /aliset comiendo por el mundo/i,
      level: 1,
    });

    expect(appTitle).toBeVisible();
  });

  describe("And the user clicks on the link '>' / 'Página siguiente'", () => {
    test("Then it should show a 2 as the current page", async () => {
      render(
        <PostsContextProvider>
          <MemoryRouter initialEntries={["/posts/1"]}>
            <Layout />
            <Routes>
              <Route path="/posts/:page" element={<PostsPage />} />
            </Routes>
          </MemoryRouter>
        </PostsContextProvider>,
      );

      const nextPage = screen.getByLabelText(/página siguiente/i);

      await userEvent.click(nextPage);

      const currentPage = screen.getByText("2");

      expect(currentPage).toBeVisible();
    });
  });

  describe("When it renders in page 2", () => {
    describe("And the user clicks on the link '>' / 'Página anterior'", () => {
      test("Then it should show a 1 as the current page", async () => {
        render(
          <PostsContextProvider>
            <MemoryRouter initialEntries={["/posts/2"]}>
              <Layout />
              <Routes>
                <Route path="/posts/:page" element={<PostsPage />} />
              </Routes>
            </MemoryRouter>
          </PostsContextProvider>,
        );

        const nextPage = screen.getByLabelText(/página anterior/i);

        await userEvent.click(nextPage);

        const currentPage = screen.getByText("1");

        expect(currentPage).toBeVisible();
      });
    });
  });
});
