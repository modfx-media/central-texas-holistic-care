type LexicalText = {
  type: "text";
  text: string;
  format: number;
  detail: number;
  mode: "normal";
  style: string;
  version: 1;
};

export function lexicalParagraph(text: string): unknown {
  const child: LexicalText = {
    type: "text",
    text,
    format: 0,
    detail: 0,
    mode: "normal",
    style: "",
    version: 1,
  };
  return {
    type: "paragraph",
    children: [child],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

export function lexicalHeading(text: string, tag: "h2" | "h3"): unknown {
  return {
    type: "heading",
    tag,
    children: [
      {
        type: "text",
        text,
        format: 0,
        detail: 0,
        mode: "normal",
        style: "",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

export function lexicalRoot(children: unknown[]): Record<string, unknown> {
  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

export function textToLexical(text: string): Record<string, unknown> {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => lexicalParagraph(part));
  return lexicalRoot(paragraphs.length > 0 ? paragraphs : [lexicalParagraph("")]);
}
