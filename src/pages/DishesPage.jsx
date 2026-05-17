import { useState, useEffect } from "react";
import DishCard from "../components/DishCard";
import Pagination from "../components/Pagination";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import SmartLink from "../components/SmartLink";

export default function DishesPage({
  dishes = [],
  selectedSearch = "",
  currentPage = 1,
  totalPages = 1,
  categories = [],
  selectedCategoryId = null,
  onCategorySelect,
  getCategoryHref,
  cartCount = 0,
  currentUrl = "/dishes",
  onSearchSubmit,
  onPageChange,
  onAddToCart,
  getDishHref = (dish) => `/dish/${dish.id}`,
  getAddToCartHref = (dish) =>
    `/cart/add?dish_id=${dish.id}&next=${encodeURIComponent(currentUrl)}`,
  getPageHref,
  profileImageUrl,
}) {
  const [search, setSearch] = useState(selectedSearch);
  useEffect(() => {
    setSearch(selectedSearch);
  }, [selectedSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit?.(search);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
      <div className="flex grow flex-col">
        <SiteHeader
          brand="DishDelight"
          brandHref="/dishes"
          brandIcon={
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined">restaurant_menu</span>
            </div>
          }
          navLinks={[
            { label: "Home", href: "/companies" },
            { label: "Menu", href: "/dishes", active: true },
          ]}
          cartCount={cartCount}
          cartHref="/cart"
          avatarUrl={profileImageUrl}
        />

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-20">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                Discover your next{" "}
                <span className="text-primary">favorite dish</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Explore our curated menu of gourmet meals, artisanal desserts,
                and refreshing beverages crafted by top chefs.
              </p>
            </div>
          </div>

          <div className="mb-8 flex flex-col items-center justify-between gap-6 border-b border-slate-200 pb-2 dark:border-slate-800 lg:flex-row">
            <form
              onSubmit={handleSubmit}
              className="flex w-full gap-2 lg:w-auto"
            >
              <input
                className="flex-1 border-none bg-transparent text-slate-900 focus:ring-0 dark:text-slate-100"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for dishes, ingredients..."
                type="text"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary/10 p-1.5 text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <span className="material-symbols-outlined text-xl">
                  search
                </span>
              </button>
            </form>
          </div>

          {selectedSearch && (
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Results for{" "}
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  "{selectedSearch}"
                </span>
              </p>
              <SmartLink
                href="/dishes"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Clear search
              </SmartLink>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div className="mb-8 flex gap-4 overflow-x-auto">
              <SmartLink
                href={getCategoryHref?.(null)}
                onClick={
                  onCategorySelect ? () => onCategorySelect(null) : undefined
                }
                className={`whitespace-nowrap rounded-xl px-6 py-3 ${
                  !selectedCategoryId
                    ? "bg-primary font-bold text-slate-900"
                    : "bg-white font-semibold text-slate-700"
                }`}
              ></SmartLink>

              {categories.map((category) => (
                <SmartLink
                  key={category.id}
                  href={getCategoryHref?.(category.id)}
                  onClick={
                    onCategorySelect
                      ? () => onCategorySelect(category.id)
                      : undefined
                  }
                  className={`whitespace-nowrap rounded-xl px-6 py-3 ${
                    Number(selectedCategoryId) === category.id
                      ? "bg-primary font-bold text-slate-900"
                      : "bg-white font-semibold text-slate-700"
                  }`}
                >
                  {category.label ?? category.name}
                </SmartLink>
              ))}
            </div>

            {dishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                href={getDishHref(dish)}
                addToCartHref={getAddToCartHref(dish)}
                onAddToCart={onAddToCart ? () => onAddToCart(dish) : undefined}
              />
            ))}
          </div>

          {dishes.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                No dishes found.
              </p>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Try another search by dish name, ingredient, or restaurant.
              </p>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            getPageHref={getPageHref}
            onPageChange={onPageChange}
          />
        </main>

        <SiteFooter
          brand="DishDelight"
          description="Bringing gourmet experiences directly to your doorstep. Fresh ingredients, professional chefs, and fast delivery."
          linkGroups={[
            {
              title: "Quick Links",
              links: [
                { label: "Menu", href: "#" },
                { label: "Special Offers", href: "#" },
                { label: "Gift Cards", href: "#" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Contact Us", href: "#" },
                { label: "FAQs", href: "#" },
                { label: "Track Order", href: "#" },
              ],
            },
            {
              title: "Social",
              links: [
                { label: "Share", href: "#" },
                { label: "Like", href: "#" },
              ],
            },
          ]}
          legalLinks={[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
          ]}
        />
      </div>
    </div>
  );
}
