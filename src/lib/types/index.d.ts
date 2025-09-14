type DocType = {
  name: string;
  doc: string;
  package?: string;
  methods?: DocType[];
  code?: string;
};
type DocFunction = {
  name: string;
  doc: string;
  package?: string;
  code?: string;
};
