type DocType = {
  name: string;
  doc: string;
  package?: string;
  methods?: DocFunction[];
};
type DocFunction = { name: string; doc: string; package?: string };