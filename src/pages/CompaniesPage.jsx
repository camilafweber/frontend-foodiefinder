import { useState, useEffect } from "react";
import CompanyCard from "../components/CompanyCard";
import Pagination from "../components/Pagination";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import SmartLink from "../components/SmartLink";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Top Rated", href: "#" },
      { label: "Deals", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "App",
    links: [
      { label: "App Store", href: "#" },
      { label: "Play Store", href: "#" },
    ],
  },
];

export default function CompaniesPage({
  companies = [],
  categories = [],
  selectedCategoryId = null,
  selectedSearch = "",
  currentPage = 1,
  totalPages = 1,
  errorMessage = "",
  onSearchSubmit,
  onCategorySelect,
  onPageChange,
  getCompanyHref = (company) => `/company/${company.id}`,
  getPageHref,
  getCategoryHref,
  profileImageUrl,
}) {
  const [search, setSearch] = useState(selectedSearch);
  useEffect(() => {
    setSearch(selectedSearch);
  }, [selectedSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit?.({ search, categoryId: selectedCategoryId });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-light text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
      <SiteHeader
        brand="FoodieFinder"
        brandHref="/"
        navLinks={[
          { label: "Home", href: "/companies" },
          { label: "Explore", href: "#explore", active: true },
          { label: "Dishes", href: "/dishes" },
        ]}
        avatarUrl={profileImageUrl}
      />

      <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-20">
        <section className="relative mb-12 overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
          <div
            className="h-[450px] w-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80")',
            }}
          />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-6xl">
              Discover the best{" "}
              <span className="text-primary">food & drinks</span>
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-white/80">
              Explore top-rated restaurants, cafes, and bars in your city
              delivered to your doorstep.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl md:flex-row"
            >
              <div className="flex flex-1 items-center gap-2 px-4">
                <input
                  className="w-full border-none py-3 text-slate-900 placeholder:text-slate-400 focus:ring-0"
                  name="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cuisine or a dish"
                  type="text"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-primary px-10 py-3 font-bold text-slate-900 transition-all hover:bg-primary/90"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="mb-12 overflow-x-auto">
          {errorMessage && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center gap-4 pb-2">
            <SmartLink
              href={getCategoryHref?.(null, search)}
              onClick={
                onCategorySelect ? () => onCategorySelect(null) : undefined
              }
              className={`whitespace-nowrap rounded-xl px-6 py-3 transition-all ${
                !selectedCategoryId
                  ? "bg-primary font-bold text-slate-900 shadow-lg shadow-primary/20"
                  : "border border-slate-200 bg-white font-semibold text-slate-700 hover:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              All
            </SmartLink>

            {categories.map((category) => (
              <SmartLink
                key={category.id}
                href={getCategoryHref?.(category.id, search)}
                onClick={
                  onCategorySelect
                    ? () => onCategorySelect(category.id)
                    : undefined
                }
                className={`whitespace-nowrap rounded-xl px-6 py-3 transition-all ${
                  String(selectedCategoryId) === String(category.id)
                    ? "bg-primary font-bold text-slate-900 shadow-lg shadow-primary/20"
                    : "border border-slate-200 bg-white font-semibold text-slate-700 hover:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
              >
                {category.label ?? category.name}
              </SmartLink>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tight">
              {selectedSearch ? "Search Results" : "Popular Restaurants Nearby"}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                href={getCompanyHref(company)}
              />
            ))}
          </div>

          {companies.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                No restaurants found for this filter.
              </p>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Try another category, another search term, or view all
                restaurants.
              </p>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            getPageHref={getPageHref}
            onPageChange={onPageChange}
          />
        </section>
      </main>

      <SiteFooter
        brand="FoodieFinder"
        description="Connecting food lovers with the best flavors in the city since 2026."
        linkGroups={footerGroups}
      />
    </div>
  );
}
