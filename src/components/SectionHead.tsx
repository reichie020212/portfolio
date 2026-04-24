interface SectionHeadProps {
  idx: string;
  title: string;
  meta: string;
}

export function SectionHead({ idx, title, meta }: SectionHeadProps) {
  return (
    <div className="sec-head">
      <span className="idx">{idx}</span>
      <span className="title">
        <b>{"//"}</b> {title}
      </span>
      <span className="rule" aria-hidden="true" />
      <span className="meta">{meta}</span>
    </div>
  );
}
