// Production before/after clips for issue #72. Serve the checked-in production
// build on :4401 and the updated production build on :4402 before recording.
export const config = {
  baseURL: 'http://localhost:4402',
  viewport: { width: 1408, height: 792 },
};

async function tour(t, baseURL) {
  await t.go(`${baseURL}/`);
  const clocks = t.page.locator('.block__clock');
  await clocks.first().waitFor({ state: 'visible' });

  for (const index of [0, 1, 2, 3, 4, 5]) {
    const clock = clocks.nth(index);
    await t.moveTo(clock);
    await t.wait(1700);
  }

  await t.page.mouse.move(1380, 760);
  await t.wait(2000);
}

export const clips = {
  before: (t) => tour(t, 'http://localhost:4401'),
  after: (t) => tour(t, 'http://localhost:4402'),
};
