import { useState, useEffect } from "react";
import DishCard from "../components/DishCard";
import MaterialIcon from "../components/MaterialIcon";
import SiteHeader from "../components/SiteHeader";
import SmartLink from "../components/SmartLink";
import { normalizeCompany, normalizeDish } from "../utils/adapters";
import { resolveImageSrc } from "../utils/assets";
import { API_BASE } from "../api";

const featureCards = [
  {
    icon: "award_star",
    title: "Michelin Star",
    description: "Excellence in every bite",
  },
  {
    icon: "local_shipping",
    title: "Local Sourcing",
    description: "Fresh daily ingredients",
  },
  {
    icon: "wine_bar",
    title: "Expert Pairing",
    description: "Curated wine selection",
  },
];

const hours = [
  { day: "Monday", value: "Closed", muted: true },
  { day: "Tuesday - Thursday", value: "12:00 - 23:00" },
  { day: "Friday - Saturday", value: "12:00 - 00:30" },
  { day: "Sunday", value: "12:00 - 22:00" },
];

export default function CompanyPage({
  company,
  dishes = [],
  cartCount = 0,
  selectedSearch = "",
  onSearchSubmit,
  onAddToCart,
  getDishHref = (dish) => `/dish/${dish.id}`,
  getAddToCartHref = (dish) => `/cart/add?dish_id=${dish.id}`,
}) {
  const [search, setSearch] = useState(selectedSearch);
  useEffect(() => {
    setSearch(selectedSearch);
  }, [selectedSearch]);
  const normalizedCompany = normalizeCompany(company);
  const normalizedDishes = dishes.map(normalizeDish);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit?.(search);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <SiteHeader
        brand={normalizedCompany.name}
        brandHref="/companies"
        brandIcon={
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-background-dark">
            <MaterialIcon>restaurant</MaterialIcon>
          </div>
        }
        navLinks={[
          { label: "Home", href: "/companies" },
          { label: "Menu", href: "#menu" },
          { label: "Reservations", href: "#" },
          { label: "Contact", href: "#location" },
        ]}
        cartCount={cartCount}
        cartHref="/cart"
        searchSlot={
          <form
            onSubmit={handleSubmit}
            className="hidden items-center rounded-xl bg-slate-100 px-3 py-1.5 dark:bg-white/5 lg:flex"
          >
            <MaterialIcon className="text-xl text-slate-400">
              search
            </MaterialIcon>
            <input
              className="w-48 border-none bg-transparent text-sm focus:ring-0"
              name="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search menu..."
              type="text"
            />
          </form>
        }
      />

      <main className="flex-1">
        <section className="relative min-h-[500px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqFY7KLDCMU1KgJuCmBBojlpeF_DCvd7SXIR-LC221i_LQ4akxi9aSu3_bik8B0K1S4J3CpnKO_kOzB-Rga66Q9fwq7Wkrhs4aQAGQKKJ__jplVLuZwSUNulwNGhMdhJS9KrZx8Ga8JHhHbxueeE3l7hE2ocVGgJvoyBQFgaivPiK9BS9VGcsZD_0-cgkeEVAXyS19y9TnZsjQfg5hWQ4KoCanOmebt9aWSrBrmrmYXV2jnMV5n2BboIOXQRns3JZAQlxYaSJteN0")',
            }}
          />

          <div className="relative flex h-full flex-col items-center justify-center px-4 py-24 text-center">
            <h1 className="mb-6 text-5xl font-black text-white drop-shadow-lg md:text-7xl">
              {normalizedCompany.name}
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              {normalizedCompany.summary}
            </p>

            <a
              href="#menu"
              className="rounded-xl bg-primary px-8 py-4 text-base font-bold text-background-dark transition-transform hover:scale-105"
            >
              Explore Menu
            </a>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section>
              <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
                <span className="h-1 w-10 rounded-full bg-primary" />
                Um pouco sobre o restaurante
              </h2>

              <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
                <img
                  className="h-full w-full object-cover"
                  src={resolveImageSrc(
                    `${API_BASE}/static/images/restaurants`,
                    normalizedCompany.imagePath,
                  )}
                  alt={normalizedCompany.name}
                />
              </div>
              <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {normalizedCompany.description}
              </p>

              <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-3">
                {featureCards.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <MaterialIcon className="mb-3 text-3xl text-primary">
                      {feature.icon}
                    </MaterialIcon>
                    <h3 className="mb-1 font-bold">{feature.title}</h3>
                    <p className="text-sm text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="menu">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Explore Menu</h2>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Search for a dish, ingredient, or browse the restaurant
                    photos below.
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5"
                >
                  <MaterialIcon className="text-slate-400">search</MaterialIcon>
                  <input
                    className="w-56 border-none bg-transparent text-sm focus:ring-0"
                    name="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search dishes..."
                    type="text"
                  />
                </form>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                  <img
                    className="h-64 w-full object-cover"
                    src={resolveImageSrc(
                      "/static/images/restaurants",
                      normalizedCompany.imagePath,
                    )}
                    alt={`${normalizedCompany.name} dining room`}
                  />
                </div>
                {normalizedDishes[0]?.imageUrl && (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                    <img
                      className="h-64 w-full object-cover"
                      src={resolveImageSrc(
                        "/static_dish/images",
                        normalizedDishes[0].imageUrl,
                      )}
                      alt={normalizedDishes[0].name}
                    />
                  </div>
                )}
              </div>

              {selectedSearch && (
                <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                  Results for{" "}
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    "{selectedSearch}"
                  </span>
                </p>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {normalizedDishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    compact
                    href={getDishHref(dish)}
                    addToCartHref={getAddToCartHref(dish)}
                    onAddToCart={
                      onAddToCart ? () => onAddToCart(dish) : undefined
                    }
                  />
                ))}
              </div>

              {normalizedDishes.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-white/10">
                  <p className="text-lg font-bold">
                    No dishes found for this search.
                  </p>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Try another dish name or ingredient.
                  </p>
                </div>
              )}
            </section>

            <section id="location">
              <h2 className="mb-6 text-3xl font-bold">Location & Contact</h2>

              <div className="relative mb-6 h-80 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq3JguWMLCYhz25H2MDiVgP7PcFSK1OUZsjn1ChKtt_3ip_iidtUcKp14gU5grL6mg3uq82sdncr3nRtgU2eD8970zSrcr4lw8nej8vieGwp5MjleuxEDX7dlb29Z9Ub_9-pwMWXDeF8IF8w51lpRdP6e_CNj6eaLI8BLBrRFdHRXBwe76IdunoAbW8jaaQAkGkp4k0kVAEjEgoONFqX7VXe2YCuDo0z5eoKOu483saRnnH5RmhxfmY2c-KiM3OX6iFkdy6juw9yU"
                  alt="Restaurant location"
                />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white p-4 shadow-lg dark:bg-background-dark">
                  <div>
                    <p className="text-sm font-bold">
                      {normalizedCompany.addressLine1 ||
                        "Calle de la Gastronomia, 42"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {normalizedCompany.addressLine2 || "28001 Madrid, Spain"}
                    </p>
                  </div>
                  <button className="rounded-lg bg-primary p-2 text-background-dark">
                    <MaterialIcon>directions</MaterialIcon>
                  </button>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <MaterialIcon className="text-primary">schedule</MaterialIcon>
                Opening Hours
              </h3>
              <ul className="space-y-4">
                {hours.map((item, index) => (
                  <li
                    key={item.day}
                    className={`flex items-center justify-between ${
                      index < hours.length - 1
                        ? "border-b border-slate-50 pb-3 dark:border-white/5"
                        : ""
                    }`}
                  >
                    <span className="font-medium">{item.day}</span>
                    <span
                      className={
                        item.muted
                          ? "italic text-slate-500"
                          : "text-slate-600 dark:text-slate-400"
                      }
                    >
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 p-4">
                <MaterialIcon className="text-primary">info</MaterialIcon>
                <p className="text-xs font-medium leading-snug">
                  Kitchen closes 45 minutes before restaurant closing time.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <MaterialIcon className="text-primary">
                  contact_page
                </MaterialIcon>
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10">
                    <MaterialIcon className="text-xl text-primary">
                      call
                    </MaterialIcon>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Phone
                    </p>
                    <p className="font-semibold">
                      {normalizedCompany.phone || "+34 912 345 678"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10">
                    <MaterialIcon className="text-xl text-primary">
                      mail
                    </MaterialIcon>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email
                    </p>
                    <p className="font-semibold">
                      {normalizedCompany.email || "reservations@saborarte.com"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10">
                    <MaterialIcon className="text-xl text-primary">
                      language
                    </MaterialIcon>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Socials
                    </p>
                    <div className="mt-1 flex gap-3">
                      <SmartLink
                        href="#"
                        className="text-slate-400 hover:text-primary"
                      >
                        <MaterialIcon>public</MaterialIcon>
                      </SmartLink>
                      <SmartLink
                        href="#"
                        className="text-slate-400 hover:text-primary"
                      >
                        <MaterialIcon>camera_enhance</MaterialIcon>
                      </SmartLink>
                      <SmartLink
                        href="#"
                        className="text-slate-400 hover:text-primary"
                      >
                        <MaterialIcon>alternate_email</MaterialIcon>
                      </SmartLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
