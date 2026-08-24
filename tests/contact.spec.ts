import { test, expect } from "@playwright/test";

test("honeypot submissions show success without provider configuration", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.locator("#company_website").fill("automated-bot.example");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("I read every message");
});
