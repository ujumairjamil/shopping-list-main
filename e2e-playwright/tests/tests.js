const { test, expect } = require("@playwright/test");

test("Main page has expected title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Task application!");
  await expect(page.locator("h1")).toHaveText("Shared shopping lists");
});

test("Can create a list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("Can open a list page.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
});

test("Can add an item to a list page.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await page.locator(`a >> text='${listName}'`).click();
  const itemName = `${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit][value='Add item!']").click();
  await page.locator(`a >> text='${itemName}'`);
});

test("Can collect an item.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await page.locator(`a >> text='${listName}'`).click();
  const itemName = `${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit][value='Add item!']").click();
  await page.locator(`a >> text='${itemName}'`);
  await page.locator("input[type=submit][value='Mark collected!']").click();
});
