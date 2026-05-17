import { Link } from "react-router-dom";

export default function SmartLink({
  href,
  onClick,
  className = "",
  children,
  ...props
}) {
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }

  const isInternalRoute =
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith("//");

  if (isInternalRoute) {
    return (
      <Link to={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href ?? "#"} className={className} {...props}>
      {children}
    </a>
  );
}
