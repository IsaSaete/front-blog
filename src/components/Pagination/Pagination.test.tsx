import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { archivoDeLasTormentasComidaPosts } from "../../post/fixtures";
import Pagination from "./Pagination";

describe("Given the Pagination component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Página anterior' and 'Página siguiente' link", () => {
      render(
        <Pagination
          postsTotal={archivoDeLasTormentasComidaPosts.length}
          currentPage={1}
        />,
        { wrapper: MemoryRouter },
      );

      const previousLink = screen.getByLabelText(/página anterior/i);
      const nextLink = screen.getByLabelText(/página siguiente/i);

      expect(previousLink).toBeVisible();
      expect(nextLink).toBeVisible();
    });
  });
});
