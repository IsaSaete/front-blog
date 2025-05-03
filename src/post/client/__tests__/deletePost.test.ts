import { http, HttpResponse } from "msw";
import { huevosRotosBruc159PostDto } from "../../dto/fixturesDto";
import { mapPostDtoToPost } from "../../dto/mappers";
import { server } from "../../mocks/node";
import PostClient from "../PostClient";

describe("Given the deletePost method to PostClient", () => {
  describe("When it's called with 'Huevos rotos de Bruc, 159' id", () => {
    test("Then it should return Huevos rotos de Bruc, 159 post", async () => {
      const postClient = new PostClient();

      const deletedPost = await postClient.deletePost(
        huevosRotosBruc159PostDto._id,
      );

      const huevosPost = mapPostDtoToPost(huevosRotosBruc159PostDto);

      expect(deletedPost).toStrictEqual(huevosPost);
    });
  });

  describe("When it's called and response is not ok", () => {
    test("Then it should throw an error with message 'Error deleting post'", () => {
      const expectedErrorMessage = "Error deleting post";

      const apiUrl = import.meta.env.VITE_API_URL;

      const deletePostId = huevosRotosBruc159PostDto._id;

      server.use(
        http.delete(`${apiUrl}/posts/${deletePostId}`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const postClient = new PostClient();

      const newPost = postClient.deletePost(huevosRotosBruc159PostDto._id);

      expect(newPost).rejects.toThrow(expectedErrorMessage);
    });
  });
});
