import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("homepage includes the company history video section", () => {
  const homepage = read("src/app/page.tsx");

  assert.match(homepage, /HistoryVideo/);
  assert.match(homepage, /<HistoryVideo\s*\/>/);
});

test("company history video section uses the shared video card", () => {
  assert.equal(existsSync(new URL("src/components/sections/HistoryVideo.tsx", root)), true);
  const section = read("src/components/sections/HistoryVideo.tsx");

  assert.match(section, /YouTubeVideoCard/);
  assert.match(section, /companyHistoryVideo/);
});

test("company history video keeps the supplied YouTube source", () => {
  const videos = read("src/content/videos.ts");

  assert.match(videos, /companyHistoryVideo/);
  assert.match(videos, /xlg-fWC3GzA/);
});
