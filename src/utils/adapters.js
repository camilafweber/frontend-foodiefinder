export function normalizeCompany(company = {}) {
  return {
    ...company,
    imagePath: company.imagePath ?? company.image_path ?? "",
    summary: company.summary ?? "",
    description: company.description ?? "",
    stars: company.stars ?? company.rating ?? "",
  };
}

export function normalizeDish(dish = {}) {
  return {
    ...dish,
    imageUrl: dish.imageUrl ?? dish.image_url ?? "",
    description: dish.description ?? dish.descript ?? "",
    category: dish.category ?? dish.category_name ?? "",
    rating: dish.rating ?? 0,
    price: dish.price ?? 0,
  };
}

export function normalizeCartItem(item = {}) {
  return {
    ...item,
    imageUrl: item.imageUrl ?? item.image_url ?? "",
    subtotal: item.subtotal ?? (item.price ?? 0) * (item.quantity ?? 0),
    price: item.price ?? 0,
    quantity: item.quantity ?? 0,
  };
}
