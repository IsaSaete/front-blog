import { Link } from "react-router";
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
      <Link
        className={`paginator__link ${firstPageClass}`}
        to={`/posts?page=${previousPage}`}
        aria-label="Página anterior"
      >
        {"<"}
      </Link>
      <span className="pagintator__current-page">{currentPage}</span>
      <Link
        className={`paginator__link ${lastPageClass}`}
        to={`/posts?page=${nextPage}`}
        aria-label="Página siguiente"
      >
        {">"}
      </Link>
    </nav>
  );
};

export default Pagination;
