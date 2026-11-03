import type { MetadataRoute } from "next";

// Enquanto for demonstração, todas as páginas são noindex: o sitemap fica vazio
// para não listar página que pede para não ser indexada. Ao virar site real,
// liste as rotas com `SITE_URL`.
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
