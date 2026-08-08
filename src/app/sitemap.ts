import type { MetadataRoute } from "next";
import { getProductSlugs, getServiceSlugs } from "@/content";
import { site } from "@/lib/utils";

/**
 * Generated from the content layer rather than hand-maintained, so a new
 * product or service is indexed the moment it is added to the data files.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Annotated before `.map`, otherwise the literal `changeFrequency` values
  // widen to `string` and no longer satisfy MetadataRoute.Sitemap.
  const routes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/products`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${site.url}/services`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${site.url}/about`, priority: 0.8, changeFrequency: "yearly" },
    { url: `${site.url}/contact`, priority: 0.8, changeFrequency: "yearly" },
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    ...route,
    lastModified,
  }));

  const productRoutes: MetadataRoute.Sitemap = getProductSlugs().map((slug) => ({
    url: `${site.url}/products/${slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getServiceSlugs().map((slug) => ({
    url: `${site.url}/services/${slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...productRoutes, ...serviceRoutes];
}
