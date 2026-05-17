import { useState, useEffect } from "react";
import MaterialIcon from "../components/MaterialIcon";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import SmartLink from "../components/SmartLink";
import { normalizeDish } from "../utils/adapters";
import { resolveImageSrc } from "../utils/assets";
import { formatCurrencyBRL } from "../utils/format";
import { API_BASE } from "../api";

export default function DishPage({
  dish,
  cartCount = 0,
  currentUrl,
  quantity = 1,
  onQuantityChange,
  onAddToCart,
  profileImageUrl,
  addToCartHref,
}) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);
  const normalizedDish = normalizeDish(dish);

  const updateQuantity = (nextValue) => {
    const safeValue = Math.max(1, nextValue);
    setLocalQuantity(safeValue);
    onQuantityChange?.(safeValue);
  };

  const cartHref =
    addToCartHref ??
    `/cart/add?dish_id=${normalizedDish.id}&next=${encodeURIComponent(
      currentUrl ?? `/dish/${normalizedDish.id}`,
    )}`;

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light font-display text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
      <SiteHeader
        brand="Menu"
        brandHref="/dishes"
        navLinks={[
          { label: "Menu", href: "/dishes", active: true },
          { label: "Orders", href: "#" },
          { label: "Locations", href: "#" },
          { label: "About", href: "#" },
        ]}
        cartCount={cartCount}
        cartHref="/cart"
        avatarUrl={profileImageUrl}
      />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-3xl bg-primary/5 shadow-2xl lg:mx-0">
            <img
              className="h-full w-full object-cover"
              src={resolveImageSrc(
                `${API_BASE}/static_dish/images`,
                normalizedDish.imageUrl,
              )}
              alt={normalizedDish.name}
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
                {normalizedDish.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-primary">
                {normalizedDish.category}
              </p>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 text-3xl font-black text-primary">
                {formatCurrencyBRL(normalizedDish.price)}
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 dark:bg-white/5">
                <MaterialIcon className="text-primary">star</MaterialIcon>
                <span className="font-bold">{normalizedDish.rating}</span>
              </div>
            </div>

            <div className="prose mb-10 dark:prose-invert">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {normalizedDish.description}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex h-14 items-center rounded-2xl bg-primary/10 px-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(localQuantity - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-primary/20"
                >
                  <MaterialIcon>remove</MaterialIcon>
                </button>
                <span className="w-12 text-center text-xl font-bold">
                  {localQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(localQuantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-background-dark"
                >
                  <MaterialIcon>add</MaterialIcon>
                </button>
              </div>

              <SmartLink
                href={cartHref}
                onClick={
                  onAddToCart
                    ? () => onAddToCart(normalizedDish, localQuantity)
                    : undefined
                }
                className="flex h-14 w-full flex-1 items-center justify-center gap-3 rounded-2xl bg-primary text-lg font-bold text-background-dark shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
              >
                <MaterialIcon>shopping_bag</MaterialIcon>
                Add to Order
              </SmartLink>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter
        brand="FoodieFinder"
        compact
        legalLinks={[
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Contact Us", href: "#" },
        ]}
      />
    </div>
  );
}
