import { http, HttpResponse } from "msw";
import {
  archivoDeLasTormentasComidaPostsDto,
  choutaKaladinPostDto,
  chuletillasSarmientoPostDto,
  comidaRiojanaPostsDto,
  huevosRotosBruc159PostDto,
  pimientosPiquilloPostDto,
} from "../dto/fixturesDto";
import { PostDto } from "../dto/types";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found URL");
}

export const handlers = [
  http.get(`${apiUrl}/posts`, ({ request }) => {
    const url = new URL(request.url);
    const currentPage = url.searchParams.get("page");

    if (currentPage === "2") {
      return HttpResponse.json<{ posts: PostDto[]; postsTotal: number }>({
        posts: comidaRiojanaPostsDto,
        postsTotal: comidaRiojanaPostsDto.length,
      });
    }

    return HttpResponse.json<{ posts: PostDto[]; postsTotal: number }>({
      posts: archivoDeLasTormentasComidaPostsDto,
      postsTotal: archivoDeLasTormentasComidaPostsDto.length,
    });
  }),

  http.get(`${apiUrl}/posts/19`, () => {
    return HttpResponse.json<{ post: PostDto }>({
      post: chuletillasSarmientoPostDto,
    });
  }),

  http.get(`${apiUrl}/posts/159678901234567890123456`, () => {
    return HttpResponse.json<{ post: PostDto }>({
      post: huevosRotosBruc159PostDto,
    });
  }),

  http.get(`${apiUrl}/posts/123451234567890678901234`, () => {
    return HttpResponse.json<{ post: PostDto }>({
      post: pimientosPiquilloPostDto,
    });
  }),

  http.post(`${apiUrl}/posts`, () => {
    return HttpResponse.json<{ post: PostDto }>({
      post: huevosRotosBruc159PostDto,
    });
  }),

  http.delete(`${apiUrl}/posts/159678901234567890123456`, () => {
    return HttpResponse.json<{ post: PostDto }>({
      post: huevosRotosBruc159PostDto,
    });
  }),

  http.delete(`${apiUrl}/posts/abcdefabcdef123456789012`, () => {
    return HttpResponse.json<{ post: PostDto }>({
      post: choutaKaladinPostDto,
    });
  }),
];
