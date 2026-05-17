import MaterialIcon from "./MaterialIcon";
import SmartLink from "./SmartLink";

export default function SiteHeader({
  brand = "FoodieFinder",
  brandHref = "/",
  brandIcon,
  navLinks = [],
  searchSlot,
  cartCount,
  cartHref = "/cart",
  cartOnClick,
  avatarUrl,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background-light/80 px-6 py-4 backdrop-blur-md dark:bg-background-dark/80 lg:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <SmartLink
            href={brandHref}
            className="flex items-center gap-3 text-primary"
          >
            {brandIcon}
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              {brand}
            </h2>
          </SmartLink>

          {navLinks.length > 0 && (
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <SmartLink
                  key={link.label}
                  href={link.href}
                  onClick={link.onClick}
                  className={
                    link.active
                      ? "text-primary font-semibold"
                      : "text-sm font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
                  }
                >
                  {link.label}
                </SmartLink>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {searchSlot}

          {(cartHref || cartOnClick) && (
            <SmartLink
              href={cartHref}
              onClick={cartOnClick}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all hover:bg-primary/10 hover:text-primary dark:bg-slate-800 dark:text-slate-200"
              aria-label="Cart"
            >
              <MaterialIcon>shopping_cart</MaterialIcon>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-slate-900">
                  {cartCount}
                </span>
              )}
            </SmartLink>
          )}

          {avatarUrl && (
            <div className="size-10 overflow-hidden rounded-full border-2 border-primary/20 bg-cover bg-center">
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
