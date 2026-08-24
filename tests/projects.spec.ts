import { test, expect } from "@playwright/test";

test("project filters are shareable and survive a reload", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Python", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\?tag=python/);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Python", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("heading", {
      name: "Predicting Airbnb Rental Prices in Melbourne",
    }),
  ).toBeVisible();
});
