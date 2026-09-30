import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

async function enter(page, role = 'researcher') {
  await page.goto('/');
  const names = { researcher: 'Nia Kamau', student: 'Kwame Mensah', innovator: 'Lerato Molefe', mentor: 'Dr. Amina Diallo', admin: 'Amara Okafor' };
  await page.getByRole('button', { name: new RegExp('Enter as ' + names[role]) }).click();
  await expect(page.getByRole('navigation', { name: 'Workspace' })).toBeVisible();
}
async function go(page, route) {
  await page.goto('/#/' + route);
  await expect(page.locator('main')).toBeVisible();
}
async function screenshot(page, name) {
  await mkdir('artifacts/screenshots', { recursive: true });
  await page.screenshot({ path: `artifacts/screenshots/${name}.png`, fullPage: true });
}

test('desktop modules render without browser errors and navigation works', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await screenshot(page, 'landing');
  await enter(page);
  await screenshot(page, 'overview');
  for (const route of ['problems', 'research', 'projects', 'mentors', 'notifications', 'analytics', 'profile']) {
    await go(page, route);
    await expect(page.locator('main h1')).toBeVisible();
    await screenshot(page, route);
  }
  expect(errors).toEqual([]);
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sign in to workspace' })).toBeVisible();
});

test('problem submission, independent validation, approval, research and project creation', async ({ page, browser }) => {
  await enter(page);
  await go(page, 'problems/new');
  const title = 'Fictional rural water access demonstration';
  await page.getByLabel('Problem title', { exact: true }).fill(title);
  await page.getByLabel('Description', { exact: true }).fill('A fictional community reports unreliable access to drinking water. Validate maintenance costs with residents before choosing an intervention.');
  await page.getByLabel('Evidence and sources').fill('Fictional classroom scenario, not real research. Proposed evidence: interviews and water service logs.');
  await page.getByLabel('Sector', { exact: true }).selectOption('Water & Sanitation');
  await page.getByLabel('Country', { exact: true }).selectOption('Kenya');
  await page.getByLabel('Region or community').fill('Fictional learning community');
  await page.getByLabel('Sustainable Development Goal').fill('6');
  await page.getByRole('button', { name: 'Submit for community review' }).click();
  await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  const id = page.url().split('/problems/')[1];
  const vote = await page.request.post(`/api/problems/${id}/vote`, { data: {} });
  expect([400, 403, 409]).toContain(vote.status());
  const denied = await page.request.post('/api/projects', { data: { problemId: id, name: 'Too early', description: 'This project must not be created yet.', teamName: 'Test team' } });
  expect(denied.status()).toBe(409);
  for (const role of ['student', 'innovator']) {
    const context = await browser.newContext();
    const voter = await context.newPage();
    await enter(voter, role);
    await go(voter, 'problems/' + id);
    await voter.getByRole('button', { name: /Vote/ }).click();
    await expect(voter.getByRole('button', { name: 'Remove my vote' })).toBeVisible();
    await voter.getByLabel('Add a comment').fill('This fictional test supports a participatory investigation, not a proven finding.');
    await voter.getByRole('button', { name: 'Post comment' }).click();
    await expect(voter.getByText('Comment posted.', { exact: true })).toBeVisible();
    await context.close();
  }
  const adminContext = await browser.newContext();
  const admin = await adminContext.newPage();
  await enter(admin, 'admin');
  await go(admin, 'admin');
  const item = admin.locator('.moderation-item').filter({ hasText: title });
  await item.getByLabel('Decision for ' + title, { exact: true }).selectOption('verified');
  await item.getByLabel('Moderation reason for ' + title).fill('Fictional classroom validation reviewed.');
  await item.getByRole('button', { name: 'Save moderation decision' }).click();
  await expect(item.getByText('Moderation decision saved.', { exact: true })).toBeVisible();
  await screenshot(admin, 'administration');
  await adminContext.close();
  await go(page, 'research?problemId=' + id);
  await page.getByLabel(/Research question/).fill('How should we validate affordable water maintenance needs with this fictional community?');
  await page.getByRole('button', { name: /Generate|Research|Analyse|Analyze/ }).first().click();
  await expect(page.getByText(/local heuristic/i).first()).toBeVisible();
  await screenshot(page, 'research-result');
  await go(page, 'projects/new?problemId=' + id);
  await page.getByLabel('Verified problem').selectOption(id);
  await page.getByLabel('Project name', { exact: true }).fill('Community water learning pilot');
  await page.getByLabel('Project description').fill('A fictional pilot for participatory discovery and maintenance planning.');
  await page.getByLabel('Team name').fill('Water learning team');
  await page.getByRole('button', { name: 'Create project', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Community water learning pilot' })).toBeVisible();
  await screenshot(page, 'project-detail');
});

test('mobile landing and workspace fit a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await screenshot(page, 'mobile-landing');
  await enter(page, 'student');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('link', { name: 'Problem repository', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Problem repository' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await screenshot(page, 'mobile-repository');
});
