import { huevosRotosBruc159PostDto } from "../../dto/fixturesDto";
import { mapPostDtoToPost } from "../../dto/mappers";
import PostClient from "../PostClient";

describe("Given the deletePost method to PostClient", () => {
  describe("When it's called with 'Huevos rotos de Bruc, 159' id", () => {
    test("Then it should return Huevos rotos de Bruc, 159 post", async () => {
      const postClient = new PostClient();

      const deletedPost = await postClient.deletePost(
        huevosRotosBruc159PostDto._id,
      );

      const postHuevos = mapPostDtoToPost(huevosRotosBruc159PostDto);

      expect(deletedPost).toStrictEqual(postHuevos);
    });
  });
});
