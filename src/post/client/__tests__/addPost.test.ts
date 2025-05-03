import { http, HttpResponse } from "msw";
import { huevosRotosBruc159PostDto } from "../../dto/fixturesDto";
import { mapPostDtoToPost } from "../../dto/mappers";
import { huevosRotosBruc159PostData } from "../../fixtures";
import { server } from "../../mocks/node";
import PostClient from "../PostClient";

describe("Given the addPost method to PostClient", () => {
  describe("When it's called with 'Huevos rotos de Bruc,159' data", () => {
    test("Then it should return Huevos rotos de Bruc,159 post", async () => {
      const postClient = new PostClient();

      const newPost = await postClient.addPost(huevosRotosBruc159PostData);

      const huevosPost = mapPostDtoToPost(huevosRotosBruc159PostDto);

      expect(newPost).toStrictEqual(huevosPost);
    });
  });

  describe("When the it's called and response is not ok", () => {
    test("Then it should throw an error with message 'Error adding new post'", () => {
      const expectedErrorMessage = "Error adding new post";

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(`${apiUrl}/posts`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const postClient = new PostClient();

      const newPost = postClient.addPost(huevosRotosBruc159PostData);

      expect(newPost).rejects.toThrow(expectedErrorMessage);
    });
  });
});
