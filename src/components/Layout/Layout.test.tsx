import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import Layout from "./Layout";
import PostsContextProvider from "../../post/context/PostsContextProvider";
import { pimientosPiquilloPostDto } from "../../post/dto/fixturesDto";
import AppTestRouter from "../../router/AppTestRouter";

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Aliset comiendo por el mundo' inside a level 1 heading", () => {
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
  });

  describe("When it renders in path /posts?page=1 and the user clicks on the link '>' / 'Página siguiente'", () => {
    test("Then it should show a 'Pimientos del piquillo rellenos: sabor y ternura 🌶️🫓' inside a heading", async () => {
      render(
        <PostsContextProvider>
          <MemoryRouter initialEntries={["/posts?page="]}>
            <Layout />
            <AppTestRouter />
          </MemoryRouter>
        </PostsContextProvider>,
      );

      const nextPage = screen.getByRole("link", { name: /página siguiente/i });

      await userEvent.click(nextPage);

      const postTitle = await screen.findByRole("heading", {
        name: /pimientos del piquillo rellenos: sabor y ternura 🌶️🫓/i,
      });

      expect(postTitle).toBeVisible();
    });
  });

  describe("When it render in path /posts?page=2 and the user clicks on the link '<' / 'Página anterior'", () => {
    test("Then it should show a 'Chuletillas al sarmiento: esencia de La Rioja 🔥🍖' inside a heading", async () => {
      render(
        <PostsContextProvider>
          <MemoryRouter initialEntries={["/posts?page=2"]}>
            <Layout />
            <AppTestRouter />
          </MemoryRouter>
        </PostsContextProvider>,
      );

      const previousPage = screen.getByRole("link", {
        name: /página anterior/i,
      });

      await userEvent.click(previousPage);

      const postTitle = screen.getByRole("heading", {
        name: /chuletillas al sarmiento: esencia de La Rioja 🔥🍖/i,
      });

      expect(postTitle).toBeVisible();
    });
  });

  describe("When it render in path /posts?page=2 and the user clicks on the'INFO' link in the Pimientos del piquillo rellenos: sabor y ternura 🌶️🫓 post", () => {
    test("Then it should show all the content of Pimientos del piquillo rellenos: sabor y ternura 🌶️🫓 post", async () => {
      render(
        <PostsContextProvider>
          <MemoryRouter initialEntries={["/posts?page=2"]}>
            <Layout />
            <AppTestRouter />
          </MemoryRouter>
        </PostsContextProvider>,
      );

      const postTitle = await screen.findByRole("heading", {
        name: /pimientos del piquillo rellenos: sabor y ternura 🌶️🫓/i,
      });

      expect(postTitle).toBeInTheDocument();

      const infoLink = await screen.findAllByRole("link", { name: /info/i });

      await userEvent.click(infoLink[0]);

      const postContent = await screen.findByText(
        pimientosPiquilloPostDto.content,
      );

      expect(postContent).toBeInTheDocument();
    });
  });
});
