import SmartLink from "./SmartLink";
import { normalizeCartItem } from "../utils/adapters";
import { resolveImageSrc } from "../utils/assets";
import { formatCurrencyBRL } from "../utils/format";

export default function CartItemCard({
  item,
  onDecrease,
  onIncrease,
  onRemove,
  decreaseHref,
  increaseHref,
  removeHref,
  imageBasePath = "/static_dish/images",
}) {
  const normalizedItem = normalizeCartItem(item);

  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="flex min-w-0 items-center gap-4">
        <img
          className="h-20 w-20 rounded-xl object-cover"
          src={resolveImageSrc(imageBasePath, normalizedItem.imageUrl)}
          alt={normalizedItem.name}
        />
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold">{normalizedItem.name}</h2>
          <p className="text-sm text-slate-500">
            Unit price: {formatCurrencyBRL(normalizedItem.price)}
          </p>
          <div className="mt-3 inline-flex items-center overflow-hidden rounded-xl border border-slate-200">
            <SmartLink
              href={decreaseHref}
              onClick={onDecrease}
              className="flex h-10 w-10 items-center justify-center text-lg font-bold text-slate-600 transition-colors hover:bg-slate-50"
            >
              -
            </SmartLink>
            <span className="min-w-12 px-3 text-center text-sm font-bold">
              {normalizedItem.quantity}
            </span>
            <SmartLink
              href={increaseHref}
              onClick={onIncrease}
              className="flex h-10 w-10 items-center justify-center text-lg font-bold text-slate-600 transition-colors hover:bg-slate-50"
            >
              +
            </SmartLink>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:flex-col sm:items-end">
        <p className="text-lg font-extrabold text-primary">
          {formatCurrencyBRL(normalizedItem.subtotal)}
        </p>
        <SmartLink
          href={removeHref}
          onClick={onRemove}
          className="text-sm font-semibold text-slate-500 transition-colors hover:text-red-500"
        >
          Remove
        </SmartLink>
      </div>
    </div>
  );
}
