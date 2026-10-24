export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'date';

export interface FieldDef {
  id: string;
  label: string;
  labelNe: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
  hintNe?: string;
  options?: { value: string; label: string; labelNe: string }[];
  /** 2 = full-width inside the section grid */
  span?: 1 | 2;
}

export interface SectionDef {
  id: string;
  title: string;
  titleNe: string;
  fields: FieldDef[];
  /** When set, the section is a repeatable list (partners, subscribers, witnesses...) */
  repeat?: {
    min: number;
    max: number;
    itemLabel: string;
    itemLabelNe: string;
  };
}

/** A single repeated row of a repeatable section */
export type RowValues = Record<string, string>;

/** Plain section => string per field id. Repeatable section => array of rows. */
export type Values = Record<string, string | RowValues[]>;

export type Block =
  | { t: 'title'; text: string }
  | { t: 'sub'; text: string }
  | { t: 'h'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'sign'; names: string[] };

export interface DocDef {
  slug: string;
  sections: SectionDef[];
  /** Starting values (also used by "Clear all") */
  initial: () => Values;
  /** Builds the printable document */
  render: (v: Values) => Block[];
  /** Soft validation shown above the preview — never blocks printing */
  warnings: (v: Values) => { en: string; ne: string }[];
}
