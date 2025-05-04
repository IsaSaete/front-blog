import { renderHook } from "@testing-library/react";
import usePostsContext from "./usePostsContext";

describe("Given the usePostsContext function", () => {
  describe("When it's called without context", () => {
    test("Then it should throw an erro with message 'Missing context for Post provider'", () => {
      const expectedErrorMessage = "Missing context for Post provider";

      const renderUsePostsContext = () => renderHook(() => usePostsContext());

      expect(renderUsePostsContext).toThrow(expectedErrorMessage);
    });
  });
});
