import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyPage from "./pages/CompanyPage";
import DishesPage from "./pages/DishesPage";
import DishPage from "./pages/DishPage";
import { api } from "./api";
import {
  categoryOptions,
  companies,
  dishes,
  profileImageUrl,
} from "./data/mockData";

const paginate = (items, page, itemsPerPage = 12) => {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const start = (safePage - 1) * itemsPerPage;

  return {
    current_page: safePage,
    total_pages: totalPages,
    items: items.slice(start, start + itemsPerPage),
  };
};

const filterBySearch = (items, search, fields) => {
  const term = search.trim().toLowerCase();

  if (!term) {
    return items;
  }

  return items.filter((item) =>
    fields.some((field) =>
      String(item[field] ?? "")
        .toLowerCase()
        .includes(term),
    ),
  );
};

function useCartState() {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedCart = window.localStorage.getItem("frontend-menu-cart");
      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(
      "frontend-menu-cart",
      JSON.stringify(cartItems),
    );
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const addToCart = (dish, quantity = 1) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === dish.id);

      if (existingItem) {
        return current.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * item.price,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          id: dish.id,
          name: dish.name,
          image_url: dish.image_url ?? dish.imageUrl,
          price: dish.price,
          quantity,
          subtotal: dish.price * quantity,
        },
      ];
    });
  };

  const updateQuantity = (dishId, delta) => {
    setCartItems((current) =>
      current
        .map((item) => {
          if (item.id !== dishId) {
            return item;
          }

          const quantity = item.quantity + delta;

          if (quantity <= 0) {
            return null;
          }

          return {
            ...item,
            quantity,
            subtotal: quantity * item.price,
          };
        })
        .filter(Boolean),
    );
  };

  const removeFromCart = (dishId) => {
    setCartItems((current) => current.filter((item) => item.id !== dishId));
  };

  return {
    cartItems,
    cartCount,
    totalPrice,
    addToCart,
    decreaseItem: (dishId) => updateQuantity(dishId, -1),
    increaseItem: (dishId) => updateQuantity(dishId, 1),
    removeFromCart,
  };
}

function CompaniesRoute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({ companies: [], total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const selectedSearch = searchParams.get("search") ?? "";
  const selectedCategoryId = searchParams.get("category_id");
  const page = Number(searchParams.get("page") ?? "1");

  const buildCompaniesHref = (nextPage, categoryId, search) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    if (categoryId) params.set("category_id", String(categoryId));
    if (search) params.set("search", search);
    const query = params.toString();
    return query ? `/companies?${query}` : "/companies";
  };

  useEffect(() => {
    setLoading(true);
    const url = new URL("/api/companies", window.location.origin);
    url.searchParams.append("page", page);
    if (selectedSearch) url.searchParams.append("search", selectedSearch);
    if (selectedCategoryId)
      url.searchParams.append("category_id", selectedCategoryId);

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        const filteredCompanies = filterBySearch(
          selectedCategoryId
            ? companies.filter(
                (company) => company.category_id === Number(selectedCategoryId),
              )
            : companies,
          selectedSearch,
          ["name", "summary", "description"],
        );
        const pageData = paginate(filteredCompanies, page);

        setData({
          companies: pageData.items,
          current_page: pageData.current_page,
          total_pages: pageData.total_pages,
        });
        setLoading(false);
      });
  }, [page, selectedSearch, selectedCategoryId]);

  useEffect(() => {
    api("/category")
      .then((json) => setCategories(json ?? []))
      .catch(() => setCategories(categoryOptions));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <CompaniesPage
      companies={data.companies}
      categories={categories} // Use data from FastAPI
      selectedCategoryId={selectedCategoryId}
      selectedSearch={selectedSearch}
      currentPage={data.current_page}
      totalPages={data.total_pages}
      profileImageUrl={profileImageUrl}
      onSearchSubmit={({ search, categoryId }) =>
        navigate(buildCompaniesHref(1, categoryId, search))
      }
      onCategorySelect={(categoryId) =>
        navigate(buildCompaniesHref(1, categoryId, selectedSearch))
      }
      onPageChange={(nextPage) =>
        navigate(
          buildCompaniesHref(nextPage, selectedCategoryId, selectedSearch),
        )
      }
      getCategoryHref={(categoryId, search) =>
        buildCompaniesHref(1, categoryId, search)
      }
      getPageHref={(nextPage) =>
        buildCompaniesHref(nextPage, selectedCategoryId, selectedSearch)
      }
    />
  );
}

function CompanyRoute({ cartCount, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [companyData, setCompanyData] = useState(null);
  const selectedSearch = searchParams.get("search") ?? "";

  const buildCompanyHref = (search) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const query = params.toString();
    return query ? `/company/${id}?${query}` : `/company/${id}`;
  };

  useEffect(() => {
    const encodedSearch = encodeURIComponent(selectedSearch);
    fetch(`/api/company/${id}?search=${encodedSearch}`)
      .then((res) => res.json())
      .then((data) => setCompanyData(data))
      .catch(() => {
        const company = companies.find((item) => item.id === Number(id));

        if (!company) {
          navigate("/companies", { replace: true });
          return;
        }

        setCompanyData({
          company,
          dishes: filterBySearch(
            dishes.filter((dish) => dish.company_id === Number(id)),
            selectedSearch,
            ["name", "descript", "category_name"],
          ),
        });
      });
  }, [id, selectedSearch]);

  if (!companyData) return <div>Loading...</div>;

  return (
    <CompanyPage
      company={companyData.company} // From FastAPI response
      dishes={companyData.dishes} // From FastAPI response
      selectedSearch={selectedSearch}
      cartCount={cartCount}
      onSearchSubmit={(search) => navigate(buildCompanyHref(search))}
      onAddToCart={(dish) => addToCart(dish, 1)}
      getDishHref={(dish) => `/dish/${dish.id}`}
      getAddToCartHref={(dish) => `/company/${companyData.company.id}`}
    />
  );
}

function DishesRoute({ cartCount, addToCart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({ dishes: [], total_pages: 1 });
  const selectedSearch = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const selectedCategoryId = searchParams.get("category_id");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = new URL("/api/dishes", window.location.origin);
    url.searchParams.append("page", page);
    if (selectedSearch) url.searchParams.append("search", selectedSearch);
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {
        const filteredDishes = filterBySearch(dishes, selectedSearch, [
          "name",
          "descript",
          "category_name",
        ]);
        const pageData = paginate(filteredDishes, page);

        setData({
          dishes: pageData.items,
          current_page: pageData.current_page,
          total_pages: pageData.total_pages,
        });
      });
  }, [page, selectedSearch]);

  const buildDishesHref = (nextPage, search) => {
    const params = new URLSearchParams();

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }
    if (search) {
      params.set("search", search);
    }

    const query = params.toString();
    return query ? `/dishes?${query}` : "/dishes";
  };

  return (
    <DishesPage
      dishes={data.dishes}
      selectedSearch={selectedSearch}
      currentPage={data.current_page}
      totalPages={data.total_pages}
      cartCount={cartCount}
      currentUrl={buildDishesHref(page, selectedSearch)}
      profileImageUrl={profileImageUrl}
      onSearchSubmit={(search) => navigate(buildDishesHref(1, search))}
      onPageChange={(nextPage) =>
        navigate(buildDishesHref(nextPage, selectedSearch))
      }
      onAddToCart={(dish) => addToCart(dish, 1)}
      getDishHref={(dish) => `/dish/${dish.id}`}
      getPageHref={(nextPage) => buildDishesHref(nextPage, selectedSearch)}
    />
  );
}

function DishRoute({ cartCount, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    api(`/dish/${id}`)
      .then(setDish)
      .catch(() => {
        const fallbackDish = dishes.find((item) => item.id === Number(id));

        if (fallbackDish) {
          setDish(fallbackDish);
          return;
        }

        navigate("/dishes", { replace: true });
      });
  }, [id]);

  if (!dish) return <div>Loading...</div>;

  return (
    <DishPage
      dish={dish}
      cartCount={cartCount}
      currentUrl={`${location.pathname}${location.search}`}
      profileImageUrl={profileImageUrl}
      onAddToCart={(selectedDish, quantity) => {
        addToCart(selectedDish, quantity);
        navigate("/cart");
      }}
    />
  );
}

function CartRoute({
  cartItems,
  cartCount,
  totalPrice,
  decreaseItem,
  increaseItem,
  removeFromCart,
}) {
  return (
    <CartPage
      items={cartItems}
      cartCount={cartCount}
      totalPrice={totalPrice}
      onDecreaseItem={(item) => decreaseItem(item.id)}
      onIncreaseItem={(item) => increaseItem(item.id)}
      onRemoveItem={(item) => removeFromCart(item.id)}
    />
  );
}

export default function App() {
  const cart = useCartState();

  const defaultCompanyId = useMemo(() => companies[0]?.id ?? 1, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/companies" replace />} />
      <Route path="/companies" element={<CompaniesRoute />} />
      <Route
        path="/company/:id"
        element={
          <CompanyRoute cartCount={cart.cartCount} addToCart={cart.addToCart} />
        }
      />
      <Route
        path="/dishes"
        element={
          <DishesRoute cartCount={cart.cartCount} addToCart={cart.addToCart} />
        }
      />
      <Route
        path="/dish/:id"
        element={
          <DishRoute cartCount={cart.cartCount} addToCart={cart.addToCart} />
        }
      />
      <Route
        path="/cart"
        element={
          <CartRoute
            cartItems={cart.cartItems}
            cartCount={cart.cartCount}
            totalPrice={cart.totalPrice}
            decreaseItem={cart.decreaseItem}
            increaseItem={cart.increaseItem}
            removeFromCart={cart.removeFromCart}
          />
        }
      />
      <Route
        path="*"
        element={<Navigate to={`/company/${defaultCompanyId}`} replace />}
      />
    </Routes>
  );
}
