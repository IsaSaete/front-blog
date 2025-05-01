import PostClient from "../PostClient";
import { huevosRotosBruc159PostDto } from "../../dto/fixturesDto";
import { mapPostDtoToPost } from "../../dto/mappers";

describe("Given the getPostById method to PostClient", () => {
  describe("When it's called with 'Huevos rotos de Bruc, 159' id", () => {
    test("Then it should return Huevos rotos de Bruc, 159 post", async () => {
      const postClient = new PostClient();

      const post = await postClient.getPostById(huevosRotosBruc159PostDto._id);

      const huevosPost = mapPostDtoToPost(huevosRotosBruc159PostDto);

      expect(post).toStrictEqual(huevosPost);
    });
  });
});
