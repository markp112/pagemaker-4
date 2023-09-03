type FontTypes = 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace' | null;

interface FontItemInterface {
  fontName: string;
  fontType: FontTypes;
}

interface GoogleFontInterface {
  kind: string;
  items: GoogleFontItemInterface[];
}

interface GoogleFontItemInterface {
  kind: string;
  family: string;
  category: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified:string;
  files: FilesInterface;
}

interface FilesInterface {
  regular?: string;
  italic?: string;
  "100"?: string;
  "100italic"?: string;
  "200"?: string;
  "200italic"?: string;
  "300"?: string;
  "300italic"?: string;
  "500"?: string;
  "500italic"?: string;
  "600"?: string;
  "600italic"?: string;
  "700"?: string;
  "700italic"?: string;
  "800"?: string;
  "800italic"?: string;
  "900"?: string;
  "900italic"?: string;
}

export type {
  FilesInterface,
  FontItemInterface,
  GoogleFontInterface,
  GoogleFontItemInterface,
  FontTypes,
}
