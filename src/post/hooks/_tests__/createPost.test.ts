import { act, renderHook } from "@testing-library/react";
import usePosts from "../usePosts";
import { huevosRotosBruc159PostData } from "../../fixtures";

describe("Given the createPost function", () => {
  describe("When it's called with Huevos Rotos de Bruc, 159 data", () => {
    test("Then it should show Huevos Rotos de Bruc, 159 added in postsData", async () => {
      const { result } = renderHook(() => usePosts());

      await act(async () => {
        await result.current.loadPostsByPage(2);
        await result.current.createPost(huevosRotosBruc159PostData);
      });

      const posts = result.current.posts;

      expect(posts).toContainEqual(
        expect.objectContaining({
          title: "Huevos Rotos de Bruc, 159",
        }),
      );
    });
  });
});
