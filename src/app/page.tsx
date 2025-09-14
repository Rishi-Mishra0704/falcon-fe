"use client";

import { useEffect, useState } from "react";

type DocEntry = {
  name: string;
  doc: string;
  package?: string;
  methods?: DocEntry[];
};

export default function DocsPage() {
  const [types, setTypes] = useState<DocEntry[]>([]);
  const [functions, setFunctions] = useState<DocEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch("/api/docs");
        const data = await res.json();

        setTypes(data.types || []);
        setFunctions(data.functions || []);
      } catch (err) {
        console.error("Failed to fetch docs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDocs();
  }, []);

  if (loading) return <div className="p-8">Loading docs...</div>;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Falcon Docs (v1.0.7)</h1>

      <section className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Types & Methods</h2>
        {types.map((t, idx) => (
          <div key={`${t.package || "root"}-${t.name}-${idx}`} className="mb-4">
            <strong>{t.name}</strong>
            {t.package && <span className="text-gray-500 ml-2">({t.package})</span>}:
            <div className="ml-4 mt-1 whitespace-pre-wrap">{t.doc}</div>
            {t.methods && t.methods.length > 0 && (
              <div className="ml-6 mt-2">
                {t.methods.map((m, midx) => (
                  <div
                    key={`${t.name}-${m.name}-${midx}`}
                    className="mb-1"
                  >
                    <strong>{m.name}</strong>:
                    <span className="ml-1 whitespace-pre-wrap">{m.doc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Functions</h2>
        {functions.map((f, idx) => (
          <div
            key={`${f.package || "root"}-${f.name}-${idx}`}
            className="mb-2"
          >
            <strong>{f.name}</strong>
            {f.package && <span className="text-gray-500 ml-2">({f.package})</span>}:
            <span className="ml-1 whitespace-pre-wrap">{f.doc}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
