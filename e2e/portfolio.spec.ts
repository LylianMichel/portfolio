import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320,375,390,430,768,1024,1280,1440,1920,2560]) {
  test(`navigation et largeur à ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: width >= 768 ? 900 : 844 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Lylian.*Michel/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await page.getByRole("button", { name: "En cours" }).click();
    await expect(page.locator(".project-row")).toHaveCount(1);
    await page.getByRole("link", { name: /Ashes of Eternity/ }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ashes of Eternity");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    expect(errors).toEqual([]);
  });
}

test("clavier, domaines, CV et accessibilité de l’accueil", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.getByRole("button", { name: "Logiciel et jeux" }).click();
  await expect(page.locator(".skills")).toContainText("FractaLens");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("link", { name: "CV", exact: true }).click();
  await expect(page.getByRole("heading", { name: "CV" })).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Télécharger le CV (PDF)" }).click();
  expect((await download).suggestedFilename()).toBe("CV-Lylian-Michel.pdf");
});

test("captures et page introuvable", async ({ page, request }) => {
  for (const width of [390,1440]) {
    await page.setViewportSize({width, height: 900});
    await page.goto("/");
    for (const img of await page.locator("img").all()) await img.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({path: `docs/captures/accueil-${width}.png`, fullPage: true, animations: "disabled"});
  }
  await page.goto("/404.html");
  await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();
  expect((await request.get("/projets/yorivai/")).status()).toBe(200);
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/projets/yorivai/index.html");
  await expect(page.getByRole("heading", { name: "Yorivai" })).toBeVisible();
  await page.goto("/projets/introuvable/");
  await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();
  expect(errors).toEqual([]);
});
