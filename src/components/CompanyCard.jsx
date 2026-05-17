import SmartLink from "./SmartLink";
import { normalizeCompany } from "../utils/adapters";
import { resolveImageSrc } from "../utils/assets";

export default function CompanyCard({
  company,
  href,
  onClick,
  imageBasePath = "/static/images/restaurants",
}) {
  const normalizedCompany = normalizeCompany(company);

  return (
    <SmartLink
      href={href}
      onClick={onClick}
      className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 shadow-sm backdrop-blur dark:bg-slate-900/90">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            {normalizedCompany.stars}
          </span>
        </div>
        <img
          alt={normalizedCompany.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={resolveImageSrc(imageBasePath, normalizedCompany.imagePath)}
        />
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
          {normalizedCompany.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {normalizedCompany.summary ||
            "Experience the finest ingredients and unique flavors."}
        </p>
      </div>
    </SmartLink>
  );
}
