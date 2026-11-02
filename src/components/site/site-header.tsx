import Link from "next/link";

const links = [
  { href: "/cardapio", label: "Cardápio" },
  { href: "/promocoes", label: "Promoções" },
  { href: "/contato", label: "Contato" },
];

export const SiteHeader = () => (
  <header className="site-header">
    <div className="wrap site-header-row">
      <Link href="/" className="wordmark" aria-label="Burger Premium, início">
        <span className="wordmark-full" aria-hidden="true">
          Burger Premium
        </span>
        <span className="wordmark-short" aria-hidden="true">
          BP
        </span>
      </Link>
      <nav aria-label="Principal">
        <ul className="nav-list">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);
