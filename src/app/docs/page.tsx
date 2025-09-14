"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";



export default function DocsPage() {
  const [types, setTypes] = useState<DocType[]>([]);
  const [functions, setFunctions] = useState<DocFunction[]>([]);
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

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Falcon Docs (v1.0.7)</h1>

      {Object.entries(grouped).map(([pkg, content]) => (
        <div key={pkg} className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-4 flex flex-wrap items-center gap-2">
            {pkg} Package <Badge variant="default">{pkg}</Badge>
          </h2>

          <Accordion type="multiple" className="space-y-3">
            {/* Types */}
            {content.types.map((t, idx) => (
              <AccordionItem key={`${pkg}-type-${idx}`} value={`${pkg}-type-${idx}`}>
                <AccordionTrigger className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium">{t.name}</span>
                  
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-gray-700">{t.doc}</p>
                  {t.code && (
                    <div className="overflow-x-auto rounded-lg">
                      <SyntaxHighlighter
                        language="go"
                        style={materialDark}
                        className="rounded-lg min-w-[300px]"
                      >
                        {t.code}
                      </SyntaxHighlighter>
                    </div>
                  )}
                  {t.methods && t.methods.length > 0 && (
                    <Accordion type="single" collapsible className="pl-4 space-y-1 mt-2">
                      {t.methods.map((m, midx) => (
                        <AccordionItem key={`${pkg}-method-${midx}`} value={`${pkg}-method-${midx}`}>
                          <AccordionTrigger className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                            {m.name} {m.package && <Badge>{m.package}</Badge>}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-700">{m.doc}</p>
                            {m.code && (
                              <div className="overflow-x-auto rounded-lg mt-1">
                                <SyntaxHighlighter
                                  language="go"
                                  style={materialDark}
                                  className="rounded-lg min-w-[250px]"
                                >
                                  {m.code}
                                </SyntaxHighlighter>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}

            {/* Functions */}
            {content.functions.length > 0 && (
              <Accordion type="multiple" className="space-y-2 mt-4">
                {content.functions.map((f, idx) => (
                  <AccordionItem key={`${pkg}-fn-${idx}`} value={`${pkg}-fn-${idx}`}>
                    <AccordionTrigger className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                      {f.name}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p className="text-gray-700">{f.doc}</p>
                      {f.code && (
                        <div className="overflow-x-auto rounded-lg mt-1">
                          <SyntaxHighlighter
                            language="go"
                            style={materialDark}
                            className="rounded-lg min-w-[250px]"
                          >
                            {f.code}
                          </SyntaxHighlighter>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Accordion>
        </div>
      ))}
    </main>
  );
}
