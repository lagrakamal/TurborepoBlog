import DOMPurify from "isomorphic-dompurify";

/**
 * Gibt bereinigtes HTML zurück, z. B. für Tiptap.
 * Entfernt gefährliche Scripts, lässt aber Style, Class, Align etc. zu.
 */
export const getSanitizedHtml = (input: string | undefined): string => {
  if (!input) return "";
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [
      "ul", "ol", "li", "span", "b", "i", "u", "p", "br", "strong", "em", "a",
      "h1", "h2", "h3", "h4", "h5", "h6"
    ],
    ALLOWED_ATTR: ["style", "class", "align", "href"],
  });
};

/**
 * Gibt reinen Text zurück – entfernt ALLES an HTML.
 */
export const getSanitizedPlainText = (input: string | undefined): string => {
  if (!input) return "";
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};
