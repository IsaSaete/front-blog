import { MemoryRouter, Route, Routes } from "react-router";
import { render, screen } from "@testing-library/react";
import Layout from "../../../components/Layout/Layout";
import PostsContextProvider from "../../context/PostsContextProvider";
import PostDetailPage from "./PostDetailPage";
import { huevosRotosBruc159PostDto } from "../../dto/fixturesDto";

describe("Given the PostDetailPage component", () => {
  describe("When it receives 159678901234567890123456 id", () => {
    test("Then it should show 'Huevos Rotos de Bruc, 159' inside a heading", async () => {
      render(
        <PostsContextProvider>
          <MemoryRouter initialEntries={["/post/159678901234567890123456"]}>
            <Layout />
            <Routes>
              <Route path="post/:id" element={<PostDetailPage />} />
            </Routes>
          </MemoryRouter>
        </PostsContextProvider>,
      );

      const postTitle = await screen.findByRole("heading", {
        name: new RegExp(huevosRotosBruc159PostDto.title, "i"),
      });

      expect(postTitle).toBeVisible();
    });

    test("Then it should show an image of 'Huevos rotos servidos en un plato rústico en Bruc 159'", async () => {
      render(
        <PostsContextProvider>
          <MemoryRouter initialEntries={["/post/159678901234567890123456"]}>
            <Layout />
            <Routes>
              <Route path="post/:id" element={<PostDetailPage />} />
            </Routes>
          </MemoryRouter>
        </PostsContextProvider>,
      );

      const postDetailImage = await screen.findByAltText(
        new RegExp(huevosRotosBruc159PostDto.imageAlt, "i"),
      );

      expect(postDetailImage).toBeVisible();
    });
  });
});
