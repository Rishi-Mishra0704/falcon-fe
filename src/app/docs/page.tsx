"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

type DocType = {
  name: string;
  doc: string;
  package?: string;
  methods?: DocFunction[];
};
type DocFunction = { name: string; doc: string; package?: string };

export default function DocsPage() {
  const [types, setTypes] = useState<DocType[]>([]);
  const [functions, setFunctions] = useState<DocFunction[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>(
    {}
  );

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

  if (loading)
    return (
      <div className="p-12 text-center text-lg font-medium text-gray-600">
        Loading docs...
      </div>
    );

  const grouped: Record<string, { types: DocType[]; functions: DocFunction[] }> =
    {};
  types.forEach((t) => {
    if (t.package === "server_test") return;
    const pkg = t.package || "root";
    if (!grouped[pkg]) grouped[pkg] = { types: [], functions: [] };
    grouped[pkg].types.push(t);
  });
  functions.forEach((f) => {
    if (f.package === "server_test") return;
    const pkg = f.package || "root";
    if (!grouped[pkg]) grouped[pkg] = { types: [], functions: [] };
    grouped[pkg].functions.push(f);
  });

  const toggleType = (key: string) =>
    setExpandedTypes((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold mb-6">Falcon Docs (v1.0.7)</h1>

      {Object.entries(grouped).map(([pkg, content]) => (
        <Card key={pkg} className="w-full max-w-6xl shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-100 flex items-center justify-between">
            <CardTitle className="text-2xl">{pkg} Package</CardTitle>
            <Badge variant="secondary">{pkg}</Badge>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Types */}
            {content.types.map((t, idx) => {
              const key = `${pkg}-type-${idx}`;
              const isExpanded = expandedTypes[key] || false;
              return (
                <Card
                  key={key}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader
                    className="bg-gray-50 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleType(key)}
                  >
                    <CardTitle className="text-lg font-semibold">{t.name}</CardTitle>
                    {t.methods && t.methods.length > 0 && (
                      <ChevronDown
                        className={`ml-2 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="space-y-2 pl-4 border-l border-gray-200">
                      <p className="text-gray-700">{t.doc}</p>
                      {t.methods && t.methods.length > 0 && (
                        <div className="mt-2 space-y-2 pl-2 border-l border-gray-300">
                          {t.methods.map((m, midx) => (
                            <div key={`${key}-method-${midx}`}>
                              <code className="bg-gray-100 px-1 rounded">{m.name}()</code>:{" "}
                              {m.doc}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}

            <Separator />

            {/* Functions */}
            {content.functions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Functions</h3>
                {content.functions.map((f, idx) => (
                  <Card
                    key={`${pkg}-fn-${idx}`}
                    className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <CardHeader className="bg-gray-50 flex justify-between items-center">
                      <CardTitle className="text-md font-medium">
                        <code className="bg-gray-100 px-1 rounded">{f.name}()</code>
                      </CardTitle>
                      {f.package && <Badge>{f.package}</Badge>}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{f.doc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
