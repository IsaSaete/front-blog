import { renderHook } from "@testing-library/react";
import usePosts from "../usePosts";
import { mapPostDtoToPost } from "../../dto/mappers";
import { chuletillasSarmientoPostDto } from "../../dto/fixturesDto";

describe("Given the loadPostById function", () => {
  describe("When it's called with 19 id post", () => {
    test("Then it should show a post 'Chuletillas al sarmiento: esencia de La Rioja 🔥🍖'", async () => {
      const { result } = renderHook(() => usePosts());

      const postDetail = mapPostDtoToPost(chuletillasSarmientoPostDto);

      const foundPost = await result.current.loadPostById(postDetail.id);

      expect(foundPost).toStrictEqual(
        expect.objectContaining({
          title: "Chuletillas al sarmiento: esencia de La Rioja 🔥🍖",
        }),
      );
    });
  });
});
