/**
 * The narrative arc (CLAUDE.md §5). Shared by the nav, the signature spine,
 * and the section components so ids and labels never drift.
 */
export interface SectionMeta {
  id: string;
  /** Zero-padded step, shown in the mono spine label. */
  index: string;
  /** Short label for the spine. */
  label: string;
  /** Whether this section appears as a nav anchor. */
  nav: boolean;
}

export const SECTIONS: readonly SectionMeta[] = [
  { id: "opening", index: "00", label: "Start", nav: false },
  { id: "thesis", index: "01", label: "Thesis", nav: false },
  { id: "process", index: "02", label: "How we work", nav: true },
  { id: "capabilities", index: "03", label: "Capabilities", nav: true },
  { id: "work", index: "04", label: "Evidence", nav: true },
  { id: "contact", index: "05", label: "Invitation", nav: true },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id);
