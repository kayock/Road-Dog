/** Road Dog settings panel: renders against the REAL backend API contract. */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { RoadDogGroup } from "./RoadDogGroup";

const endpoints = [
  { id: "dev", name: "dev box", base_url: "http://127.0.0.1:11434",
    flavor: "ollama", enabled: true,
    last_profile: { reachable: true, flavor: "ollama", models: [{ name: "q" }] } },
];
const budgets = { enabled: false, scopes: {
  "voice-turn": { usage: { tokens_measured: 120, requests: 2 }, budget: {} } } };

function mockFetch(url: string) {
  if (url === "/api/local-endpoints") return { endpoints };
  if (url === "/api/costs/budgets") return budgets;
  if (url === "/api/sam/memories") return { memories: [{ name: "USER.md", bytes: 42, preview: "hi" }] };
  if (url === "/api/settings/app-config") return { trigger: { push_to_talk_key: "alt+q" }, brain: { small_model_mode: true } };
  if (url === "/api/diagnostics/readiness") return { counts: { ok: 5, warn: 1, fail: 0, unknown: 2 } };
  return {};
}

describe("RoadDogGroup", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => ({
      ok: true,
      json: async () => mockFetch(url),
    })));
  });

  it("renders endpoints, budgets, memories, readiness from the real APIs", async () => {
    render(<RoadDogGroup />);
    await waitFor(() => expect(screen.getByText("dev box")).toBeTruthy());
    expect(screen.getByText(/120 tok measured/)).toBeTruthy();
    expect(screen.getByText("USER.md")).toBeTruthy();
    expect(screen.getByText(/5 ok · 1 warn · 0 fail · 2 not probed/)).toBeTruthy();
    expect((screen.getByDisplayValue("alt+q") as HTMLInputElement).value).toBe("alt+q");
  });

  it("routes an endpoint via POST /select when Route Sam here is clicked", async () => {
    render(<RoadDogGroup />);
    await waitFor(() => expect(screen.getByText("Route Sam here")).toBeTruthy());
    (screen.getByText("Route Sam here") as HTMLButtonElement).click();
    await waitFor(() => {
      const calls = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls;
      expect(calls.some(([u, init]) =>
        u === "/api/local-endpoints/dev/select" && init?.method === "POST")).toBe(true);
    });
  });
});
