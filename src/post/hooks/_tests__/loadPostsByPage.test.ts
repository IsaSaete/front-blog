import { act, renderHook } from "@testing-library/react";
import usePosts from "../usePosts";

describe("Given the loadPostsByPage function", () => {
  describe("Given it's called with page number 2", () => {
    test("Then it should set the 'Peras al vino tinto', 'Menestra a la riojana' y 'Pimientos del piquillo rellenos' as postData", async () => {
      const { result } = renderHook(() => usePosts());

      await act(async () => {
        result.current.loadPostsByPage(2);
      });

      const posts = result.current.posts;

      expect(posts).toContainEqual(
        expect.objectContaining({
          title: "Pimientos del piquillo rellenos: sabor y ternura 🌶️🫓",
        }),
      );
      expect(posts).toContainEqual(
        expect.objectContaining({
          title: "Menestra a la riojana: primavera en el plato 🥦🥕",
        }),
      );
      expect(posts).toContainEqual(
        expect.objectContaining({
          title: "Peras al vino tinto: dulzura con cuerpo 🍐🍷",
        }),
      );
    });
  });
});
