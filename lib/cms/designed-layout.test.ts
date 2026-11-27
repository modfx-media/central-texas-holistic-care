/**
 * A published page or post keeps the designed template passed to CMSRoute.
 * That is the case that used to swap the layout for RenderRoutedContent.
 *
 *   npx tsx --test lib/cms/designed-layout.test.ts
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { keepsDesignedLayout } from "./designed-layout";

test("a published page keeps the designed template", () => {
  assert.equal(keepsDesignedLayout("pages"), true);
});

test("a published post keeps the designed template", () => {
  assert.equal(keepsDesignedLayout("posts"), true);
});

test("CMSRoute applies the designed-page guard before the generic renderer", () => {
  const source = readFileSync("lib/cms/CMSRoute.tsx", "utf8");
  const guard = source.indexOf("keepsDesignedLayout(routed.collection)");
  const renderer = source.indexOf("<RenderRoutedContent");
  assert.notEqual(guard, -1);
  assert.ok(renderer > guard);
});
