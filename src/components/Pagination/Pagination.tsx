import { NavLink } from "react-router";
import "./Pagination.css";

interface PaginationProps {
  postsTotal: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ postsTotal, currentPage }) => {
  const pagesTotal = Math.ceil(postsTotal / 5);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const firstPageClass = currentPage > 1 ? "" : " paginator__link--hidden";
  const lastPageClass =
    currentPage < pagesTotal ? "" : " paginator__link--hidden";

  return (
    <nav className="paginator">
      <NavLink
        className={`paginator__link ${firstPageClass}`}
        to={`/posts/${previousPage}`}
        aria-label="Página anterior"
      >
        {"<"}
      </NavLink>
      <span className="pagintator__current-page">{currentPage}</span>
      <NavLink
        className={`paginator__link ${lastPageClass}`}
        to={`/posts/${nextPage}`}
        aria-label="Página siguiente"
      >
        {">"}
      </NavLink>
    </nav>
  );
};

export default Pagination;
