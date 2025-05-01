import { act, renderHook } from "@testing-library/react";
import usePosts from "../usePosts";
import { huevosRotosBruc159PostDto } from "../../dto/fixturesDto";
import { mapPostDtoToPost } from "../../dto/mappers";

describe("Given the deletePost function", () => {
  describe("When it's called with 159678901234567890123456 id post", () => {
    test("Then it should show the rest of the posts without the post with id", async () => {
      const { result } = renderHook(() => usePosts());

      const deletePost = mapPostDtoToPost(huevosRotosBruc159PostDto);

      await act(async () => {
        await result.current.loadPostsByPage(2);
        await result.current.deletePost(deletePost.id);
      });

      const posts = result.current.posts;

      expect(posts).not.toContainEqual(
        expect.objectContaining({ title: "Huevos Rotos de Bruc, 159" }),
      );
    });
  });
});
