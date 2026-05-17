import MaterialIcon from "./MaterialIcon";
import SmartLink from "./SmartLink";

export default function SiteFooter({
  brand = "FoodieFinder",
  description,
  linkGroups = [],
  legalLinks = [],
  compact = false,
}) {
  if (compact) {
    return (
      <footer className="mt-auto border-t border-primary/10 bg-background-light py-12 dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-xl font-bold">{brand}</div>
            <div className="flex gap-8 text-sm text-slate-500">
              {legalLinks.map((link) => (
                <SmartLink key={link.label} href={link.href} className="hover:text-primary">
                  {link.label}
                </SmartLink>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all hover:bg-primary hover:text-background-dark">
                <MaterialIcon className="text-xl">share</MaterialIcon>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all hover:bg-primary hover:text-background-dark">
                <MaterialIcon className="text-xl">thumb_up</MaterialIcon>
              </button>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">
            All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-20 border-t border-primary/10 bg-white px-6 py-16 dark:bg-background-dark lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 text-sm md:grid-cols-4">
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold tracking-tight dark:text-white">
            {brand}
          </h2>
          {description && (
            <p className="text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>

        {linkGroups.map((group) => (
          <div key={group.title}>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              {group.title}
            </h5>
            <ul className="space-y-2 text-slate-500">
              {group.links.map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {legalLinks.length > 0 && (
        <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-400 dark:border-slate-800">
          <p>{brand}. All rights reserved.</p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <SmartLink key={link.label} href={link.href} className="hover:text-primary">
                {link.label}
              </SmartLink>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
}
