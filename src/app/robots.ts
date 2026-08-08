import type { MetadataRoute } from "next";
import { site } from "@/lib/utils";

/** Required by `output: "export"` — route handlers must opt in to being static. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
