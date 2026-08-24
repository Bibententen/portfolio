import { test, expect } from "@playwright/test";

test("sitemap and robots expose the content routes", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("/projects/melbourne-rental-prediction");
  expect(sitemapBody).toContain("/projects/coffee-sales-excel");
  expect(sitemapBody).toContain("/contact");

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(
    "Sitemap: https://charlie-pham.vercel.app/sitemap.xml",
  );
});

test("default and project OG image routes render", async ({ request }) => {
  for (const route of [
    "/opengraph-image",
    "/projects/melbourne-rental-prediction/opengraph-image",
  ]) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  }
});
