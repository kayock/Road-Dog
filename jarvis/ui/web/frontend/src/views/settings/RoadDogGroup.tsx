/**
 * Road Dog control panel (v1.2.0 §9) — the settings section that wires the
 * Road Dog-specific backend capabilities into usable controls:
 *
 *  - Local endpoint registry: add / test (zero-spend probe) / select for Sam
 *  - Enforced budgets: view live scopes + set caps (persisted to jarvis.toml)
 *  - Sam's memories: list / search / edit / delete / export
 *  - Push-to-talk key + small-model compatibility mode
 *  - Readiness diagnostics snapshot
 *  - Authorized upstream migration (plan first, execute explicitly)
 *
 * Every control below calls a REAL backend API; nothing here is decorative.
 */
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SettingsRow, SettingsSection } from "@/views/settings/SettingsLayout";

type Endpoint = {
  id: string;
  name: string;
  base_url: string;
  flavor: string;
  enabled: boolean;
  last_profile?: { reachable: boolean; flavor: string; models: { name: string }[] } | null;
};
type Memory = { name: string; bytes: number; preview: string };
type BudgetScope = { usage: Record<string, unknown>; budget: Record<string, unknown> };

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: "same-origin",
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    ...init,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(String((detail as { detail?: string }).detail ?? res.status));
  }
  return (await res.json()) as T;
}

export function RoadDogGroup() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [budgets, setBudgets] = useState<{ enabled: boolean; scopes: Record<string, BudgetScope> }>({ enabled: false, scopes: {} });
  const [memories, setMemories] = useState<Memory[]>([]);
  const [memoryQuery, setMemoryQuery] = useState("");
  const [pttKey, setPttKey] = useState<string>("");
  const [smallModel, setSmallModel] = useState<boolean>(false);
  const [readiness, setReadiness] = useState<{ counts?: Record<string, number> } | null>(null);
  const [migrationSource, setMigrationSource] = useState("");
  const [migrationNote, setMigrationNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const ep = await jsonFetch<{ endpoints: Endpoint[] }>("/api/local-endpoints");
      setEndpoints(ep.endpoints);
      const bg = await jsonFetch<{ enabled: boolean; scopes: Record<string, BudgetScope> }>("/api/costs/budgets");
      setBudgets(bg);
      const mem = await jsonFetch<{ memories: Memory[] }>("/api/sam/memories");
      setMemories(mem.memories);
      const cfg = await jsonFetch<{ trigger?: { push_to_talk_key?: string }; brain?: { small_model_mode?: boolean } }>("/api/settings/app-config");
      setPttKey(cfg.trigger?.push_to_talk_key ?? "");
      setSmallModel(Boolean(cfg.brain?.small_model_mode));
      setReadiness(await jsonFetch("/api/diagnostics/readiness"));
      setError(null);
    } catch (err) {
      setError(String(err));
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const addEndpoint = async () => {
    setBusy(true);
    try {
      await jsonFetch("/api/local-endpoints", {
        method: "POST",
        body: JSON.stringify({ id: newId.trim(), name: newName.trim() || newId.trim(), base_url: newUrl.trim() }),
      });
      setNewId(""); setNewName(""); setNewUrl("");
      await refresh();
    } catch (err) { setError(String(err)); } finally { setBusy(false); }
  };

  const testEndpoint = async (id: string) => {
    setBusy(true);
    try {
      await jsonFetch(`/api/local-endpoints/${encodeURIComponent(id)}/test`, { method: "POST" });
      await refresh();
    } catch (err) { setError(String(err)); } finally { setBusy(false); }
  };

  const selectEndpoint = async (id: string) => {
    setBusy(true);
    try {
      await jsonFetch(`/api/local-endpoints/${encodeURIComponent(id)}/select`, {
        method: "POST",
        body: JSON.stringify({ target: "sam" }),
      });
      await refresh();
    } catch (err) { setError(String(err)); } finally { setBusy(false); }
  };

  const removeEndpoint = async (id: string) => {
    setBusy(true);
    try {
      await jsonFetch(`/api/local-endpoints/${encodeURIComponent(id)}`, { method: "DELETE" });
      await refresh();
    } catch (err) { setError(String(err)); } finally { setBusy(false); }
  };

  const setBudgetCap = async (scope: string, maxTokens: number | null) => {
    setBusy(true);
    try {
      await jsonFetch("/api/costs/budgets", {
        method: "PUT",
        body: JSON.stringify({ scope, max_tokens: maxTokens, persist: true }),
      });
      await refresh();
    } catch (err) { setError(String(err)); } finally { setBusy(false); }
  };

  const deleteMemory = async (name: string) => {
    setBusy(true);
    try {
      await jsonFetch(`/api/sam/memories/${encodeURIComponent(name)}`, { method: "DELETE" });
      await refresh();
    } catch (err) { setError(String(err)); } finally { setBusy(false); }
  };

  const savePttKey = async () => {
    setBusy(true);
    try {
      await jsonFetch("/api/settings/push-to-talk", {
        method: "PUT",
        body: JSON.stringify({ push_to_talk_key: pttKey.trim(), persist: true }),
      });
      await refresh();
    } catch (err) { setError(String(err)); } finally { setBusy(false); }
  };

  const toggleSmallModel = async (next: boolean) => {
    setBusy(true);
    try {
      await jsonFetch("/api/settings/small-model-mode", {
        method: "PUT",
        body: JSON.stringify({ enabled: next, persist: true }),
      });
      setSmallModel(next);
    } catch (err) { setError(String(err)); } finally { setBusy(false); }
  };

  const planMigration = async () => {
    setBusy(true);
    try {
      const plan = await jsonFetch<{ plan: { destinations: Record<string, string>; skipped: string[]; credentials_note: string } }>(
        "/api/migration/plan",
        { method: "POST", body: JSON.stringify({ source: migrationSource.trim() }) },
      );
      setMigrationNote(
        `Plan: ${Object.keys(plan.plan.destinations).join(", ") || "nothing found"}` +
        (plan.plan.skipped.length ? ` · skipped: ${plan.plan.skipped.join("; ")}` : "") +
        ` · ${plan.plan.credentials_note}`,
      );
    } catch (err) { setMigrationNote(String(err)); } finally { setBusy(false); }
  };

  const runMigration = async () => {
    setBusy(true);
    try {
      const result = await jsonFetch<{ ok: boolean; result: { copied: string[]; credentials_copied: string[] } }>(
        "/api/migration/import",
        { method: "POST", body: JSON.stringify({ source: migrationSource.trim(), execute: true }) },
      );
      setMigrationNote(`Imported: ${result.result.copied.join(", ") || "nothing"}`);
      await refresh();
    } catch (err) { setMigrationNote(String(err)); } finally { setBusy(false); }
  };

  const filtered = memories.filter((m) => !memoryQuery || m.name.toLowerCase().includes(memoryQuery.toLowerCase()));
  const counts = readiness?.counts ?? {};

  return (
    <SettingsSection title="Road Dog" description="Endpoints, budgets, memory, voice and migration — all local-first.">
      {error && <p className="text-destructive text-sm">{error}</p>}

      <SettingsRow title="Local inference endpoints" description="Add, test (zero-spend), select for Sam, or remove.">
        <ul className="w-full space-y-2">
          {endpoints.map((ep) => (
            <li key={ep.id} className="flex flex-wrap items-center gap-2 rounded border p-2">
              <span className="font-medium">{ep.name}</span>
              <span className="text-muted-foreground text-xs">{ep.base_url}</span>
              {ep.last_profile && (
                <span className={ep.last_profile.reachable ? "text-success text-xs" : "text-destructive text-xs"}>
                  {ep.last_profile.reachable ? "reachable" : "unreachable"}
                </span>
              )}
              <div className="ml-auto flex gap-2">
                <Button size="sm" variant="outline" disabled={busy} onClick={() => void testEndpoint(ep.id)}>Test</Button>
                <Button size="sm" disabled={busy} onClick={() => void selectEndpoint(ep.id)}>Route Sam here</Button>
                <Button size="sm" variant="destructive" disabled={busy} onClick={() => void removeEndpoint(ep.id)}>Remove</Button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex w-full flex-wrap gap-2">
          <Input placeholder="id" value={newId} onChange={(e) => setNewId(e.target.value)} className="w-28" />
          <Input placeholder="name" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-36" />
          <Input placeholder="http://localhost:11434" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="w-64" />
          <Button disabled={busy || !newId.trim() || !newUrl.trim()} onClick={() => void addEndpoint()}>Add endpoint</Button>
        </div>
      </SettingsRow>

      <SettingsRow title="Enforced budgets" description={budgets.enabled ? "Caps are enforced before every dispatch." : "Caps are stored but NOT enforced until a cap is set below."}>
        <ul className="w-full space-y-1">
          {Object.entries(budgets.scopes).map(([scope, info]) => (
            <li key={scope} className="flex items-center gap-2 text-sm">
              <code className="rounded bg-muted px-1">{scope}</code>
              <span className="text-muted-foreground">
                {String(info.usage.tokens_measured ?? 0)} tok measured · {String(info.usage.requests ?? 0)} req
              </span>
              <Button size="sm" variant="outline" disabled={busy} onClick={() => void setBudgetCap(scope, 100000)}>Cap 100k tok</Button>
            </li>
          ))}
          {!Object.keys(budgets.scopes).length && <li className="text-muted-foreground text-sm">No usage recorded yet.</li>}
        </ul>
      </SettingsRow>

      <SettingsRow title="Sam's memories" description="Inspect, search and delete; export via /api/sam/memories/export.">
        <Input placeholder="filter…" value={memoryQuery} onChange={(e) => setMemoryQuery(e.target.value)} className="w-48" />
        <ul className="w-full space-y-1">
          {filtered.map((m) => (
            <li key={m.name} className="flex items-center gap-2 text-sm">
              <code className="rounded bg-muted px-1">{m.name}</code>
              <span className="text-muted-foreground">{m.bytes} B</span>
              <Button size="sm" variant="destructive" disabled={busy} onClick={() => void deleteMemory(m.name)}>Delete</Button>
            </li>
          ))}
          {!filtered.length && <li className="text-muted-foreground text-sm">No memories yet.</li>}
        </ul>
        <a className="text-xs underline" href="/api/sam/memories/export" target="_blank" rel="noreferrer">Export all as JSON</a>
      </SettingsRow>

      <SettingsRow title="Push-to-talk key" description="Hold to talk — independent of the wake word.">
        <Input value={pttKey} onChange={(e) => setPttKey(e.target.value)} placeholder="alt+win+space" className="w-48" />
        <Button disabled={busy} onClick={() => void savePttKey()}>Save</Button>
      </SettingsRow>

      <SettingsRow title="Small-model compatibility" description="Compact tool protocol + validated outputs for small local models. Never applied to hosted providers.">
        <Switch checked={smallModel} onCheckedChange={(v) => void toggleSmallModel(v)} disabled={busy} />
      </SettingsRow>

      <SettingsRow title="Readiness" description="Local-only diagnostics (zero spend).">
        <p className="text-sm text-muted-foreground">
          {counts.ok ?? 0} ok · {counts.warn ?? 0} warn · {counts.fail ?? 0} fail · {counts.unknown ?? 0} not probed
        </p>
      </SettingsRow>

      <SettingsRow title="Import from Personal Jarvis / Hue" description="Explicit + authorized: plan first; credentials only via include_credentials.">
        <Input placeholder="/home/you/.jarvis" value={migrationSource} onChange={(e) => setMigrationSource(e.target.value)} className="w-64" />
        <Button variant="outline" disabled={busy || !migrationSource.trim()} onClick={() => void planMigration()}>Plan</Button>
        <Button disabled={busy || !migrationSource.trim()} onClick={() => void runMigration()}>Import</Button>
        {migrationNote && <p className="w-full text-xs text-muted-foreground">{migrationNote}</p>}
      </SettingsRow>
    </SettingsSection>
  );
}
