import MaterialIcon from "./MaterialIcon";
import SmartLink from "./SmartLink";
import { normalizeDish } from "../utils/adapters";
import { resolveImageSrc } from "../utils/assets";
import { formatCurrencyBRL } from "../utils/format";

export default function DishCard({
  dish,
  href,
  onClick,
  addToCartHref,
  onAddToCart,
  imageBasePath = "/static_dish/images",
  compact = false,
}) {
  const normalizedDish = normalizeDish(dish);
  const imageName = normalizedDish.imageUrl || "sanduiche_natural.png";

  if (compact) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex gap-4">
          <img
            className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover"
            src={resolveImageSrc(imageBasePath, imageName)}
            alt={normalizedDish.name}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">{normalizedDish.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {normalizedDish.description}
                </p>
              </div>
              <span className="whitespace-nowrap font-extrabold text-primary">
                {formatCurrencyBRL(normalizedDish.price)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Rating {normalizedDish.rating}
              </span>
              <SmartLink
                href={addToCartHref}
                onClick={onAddToCart}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-background-dark transition-opacity hover:opacity-90"
              >
                Add to cart
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="relative h-40 overflow-hidden">
        <SmartLink href={href} onClick={onClick}>
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt={normalizedDish.name}
            src={resolveImageSrc(imageBasePath, imageName)}
          />
        </SmartLink>
        <div className="absolute right-2 top-2 rounded-lg bg-white/90 px-2 py-0.5 text-[10px] font-bold text-primary shadow-sm backdrop-blur dark:bg-slate-900/90">
          ★ {normalizedDish.rating}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-col">
          <h3 className="line-clamp-1 text-sm font-bold leading-tight text-slate-900 dark:text-slate-100">
            <SmartLink
              href={href}
            onClick={onClick}
            className="transition-colors hover:text-primary"
          >
              {normalizedDish.name}
            </SmartLink>
          </h3>
          <span className="mt-1 text-md font-extrabold text-primary">
            {formatCurrencyBRL(normalizedDish.price)}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 flex-1 text-xs text-slate-500 dark:text-slate-400">
          {normalizedDish.description}
        </p>

        <SmartLink
          href={addToCartHref}
          onClick={onAddToCart}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-xs font-bold text-white transition-colors hover:bg-primary/90"
        >
          <MaterialIcon className="text-lg">add_shopping_cart</MaterialIcon>
          Add
        </SmartLink>
      </div>
    </div>
  );
}
