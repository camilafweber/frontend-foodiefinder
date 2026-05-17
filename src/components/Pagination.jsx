import SmartLink from "./SmartLink";

function pageClass(isActive) {
  return `size-10 rounded-xl flex items-center justify-center font-bold transition-all ${
    isActive
      ? "bg-primary text-background-dark shadow-lg shadow-primary/20"
      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-primary hover:text-primary"
  }`;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  getPageHref,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-16 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <SmartLink
          href={getPageHref?.(currentPage - 1)}
          onClick={
            onPageChange ? () => onPageChange(currentPage - 1) : undefined
          }
          className="size-10 rounded-xl flex items-center justify-center border border-slate-200 transition-colors hover:bg-primary/10 dark:border-slate-700"
          aria-label="Previous page"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M12.5 5 7.5 10l5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SmartLink>
      )}

      {pages.map((page) => (
        <SmartLink
          key={page}
          href={getPageHref?.(page)}
          onClick={onPageChange ? () => onPageChange(page) : undefined}
          className={pageClass(page === currentPage)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </SmartLink>
      ))}

      {currentPage < totalPages && (
        <SmartLink
          href={getPageHref?.(currentPage + 1)}
          onClick={
            onPageChange ? () => onPageChange(currentPage + 1) : undefined
          }
          className="size-10 rounded-xl flex items-center justify-center border border-slate-200 transition-colors hover:bg-primary/10 dark:border-slate-700"
          aria-label="Next page"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M7.5 5 12.5 10l-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SmartLink>
      )}
    </div>
  );
}
