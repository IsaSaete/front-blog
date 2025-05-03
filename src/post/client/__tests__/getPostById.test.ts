import { http, HttpResponse } from "msw";
import PostClient from "../PostClient";
import { huevosRotosBruc159PostDto } from "../../dto/fixturesDto";
import { mapPostDtoToPost } from "../../dto/mappers";
import { server } from "../../mocks/node";

describe("Given the getPostById method to PostClient", () => {
  describe("When it's called with 'Huevos rotos de Bruc, 159' id", () => {
    test("Then it should return Huevos rotos de Bruc, 159 post", async () => {
      const postClient = new PostClient();

      const post = await postClient.getPostById(huevosRotosBruc159PostDto._id);

      const huevosPost = mapPostDtoToPost(huevosRotosBruc159PostDto);

      expect(post).toStrictEqual(huevosPost);
    });
  });

  describe("When it's called and response is not ok", () => {
    test("then it should throw an error with message 'Error getting post'", () => {
      const expectedErrorMessage = "Error getting post";

      const apiUrl = import.meta.env.VITE_API_URL;

      const postId = huevosRotosBruc159PostDto._id;

      server.use(
        http.get(`${apiUrl}/posts/${postId}`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const postClient = new PostClient();

      const newPost = postClient.getPostById(huevosRotosBruc159PostDto._id);

      expect(newPost).rejects.toThrow(expectedErrorMessage);
    });
  });
});
