interface SectionHeadProps {
  idx: string;
  title: string;
  meta: string;
  headingId?: string;
}

export function SectionHead({ idx, title, meta, headingId }: SectionHeadProps) {
  return (
    <div className="sec-head">
      <span className="idx">{idx}</span>
      <h2 id={headingId} className="title">
        <b>{"//"}</b> {title}
      </h2>
      <span className="rule" aria-hidden="true" />
      <span className="meta">{meta}</span>
    </div>
  );
}
