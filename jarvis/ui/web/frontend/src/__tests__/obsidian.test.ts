import { describe, expect, it } from "vitest";
import { buildObsidianUrl } from "@/lib/obsidian";

describe("buildObsidianUrl", () => {
  it("builds the expected URL for a simple vault-relative path", () => {
    const url = buildObsidianUrl("C:\\Notes\\Sam", "entities/harald.md");
    expect(url).toBe(
      `obsidian://open?path=${encodeURIComponent("C:\\Notes\\Sam\\entities\\harald.md")}`,
    );
  });

  it("omits the file param when the path is empty (opens vault root)", () => {
    const url = buildObsidianUrl("/home/user/Notes/Sam/");
    expect(url).toBe(
      `obsidian://open?path=${encodeURIComponent("/home/user/Notes/Sam")}`,
    );
  });

  it("encodes spaces as %20 (real Obsidian round-trip)", () => {
    const url = buildObsidianUrl("/home/user/My Vault/Sam", "entities/my note.md");
    expect(url).toContain("my%20note.md");
    expect(url.startsWith("obsidian://open?path=")).toBe(true);
  });

  it("encodes German umlauts in the file path", () => {
    const url = buildObsidianUrl("/notes/Sam", "entities/küche.md");  // i18n-allow: German umlaut is the content under test
    // U+00FC -> %C3%BC under encodeURIComponent
    expect(url).toContain("k%C3%BCche.md");
  });
});
