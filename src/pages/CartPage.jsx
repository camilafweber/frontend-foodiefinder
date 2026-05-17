import CartItemCard from "../components/CartItemCard";
import SmartLink from "../components/SmartLink";
import { formatCountLabel, formatCurrencyBRL } from "../utils/format";

export default function CartPage({
  items = [],
  cartCount = 0,
  totalPrice = 0,
  onDecreaseItem,
  onIncreaseItem,
  onRemoveItem,
  getDecreaseHref = (item) => `/cart/decrease?dish_id=${item.id}&next=/cart`,
  getIncreaseHref = (item) => `/cart/increase?dish_id=${item.id}&next=/cart`,
  getRemoveHref = (item) => `/cart/remove?dish_id=${item.id}&next=/cart`,
}) {
  return (
    <div className="min-h-screen bg-background-light text-slate-900 antialiased">
      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-12">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">Cart</p>
            <h1 className="text-4xl font-extrabold tracking-tight">Your order</h1>
          </div>
          <SmartLink
            href="/dishes"
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            Back to dishes
          </SmartLink>
        </div>

        {items.length > 0 ? (
          <>
            <div className="grid gap-6">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onDecrease={onDecreaseItem ? () => onDecreaseItem(item) : undefined}
                  onIncrease={onIncreaseItem ? () => onIncreaseItem(item) : undefined}
                  onRemove={onRemoveItem ? () => onRemoveItem(item) : undefined}
                  decreaseHref={getDecreaseHref(item)}
                  increaseHref={getIncreaseHref(item)}
                  removeHref={getRemoveHref(item)}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-500">
                  {formatCountLabel(cartCount, "item")} in cart
                </p>
                <p className="text-2xl font-extrabold">
                  Total: {formatCurrencyBRL(totalPrice)}
                </p>
              </div>
              <SmartLink
                href="/dishes"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-primary/90"
              >
                Add more dishes
              </SmartLink>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-slate-500">
              Browse the menu and add a few dishes to get started.
            </p>
            <SmartLink
              href="/dishes"
              className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-primary/90"
            >
              Explore dishes
            </SmartLink>
          </div>
        )}
      </main>
    </div>
  );
}
