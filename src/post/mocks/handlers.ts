import { http, HttpResponse } from "msw";
import {
  archivoDeLasTormentasComidaPostsDto,
  huevosRotosBruc159PostDto,
} from "../dto/fixturesDto";
import { PostDto } from "../dto/types";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found URL");
}

export const handlers = [
  http.get(`${apiUrl}/posts`, () => {
    return HttpResponse.json<{ posts: PostDto[]; postsTotal: number }>({
      posts: archivoDeLasTormentasComidaPostsDto,
      postsTotal: archivoDeLasTormentasComidaPostsDto.length,
    });
  }),

  http.get(`${apiUrl}/posts/159678901234567890123456`, () => {
    return HttpResponse.json<PostDto>(huevosRotosBruc159PostDto);
  }),

  http.delete(`${apiUrl}/posts/159678901234567890123456`, () => {
    return HttpResponse.json<PostDto>(huevosRotosBruc159PostDto);
  }),

  http.post(`${apiUrl}/posts`, () => {
    return HttpResponse.json<PostDto>(huevosRotosBruc159PostDto);
  }),
];
