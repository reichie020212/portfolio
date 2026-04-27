import Image from "next/image";
import { resumeMeta } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading">
      <SectionHead
        idx="02"
        title="resume"
        meta="cat ~/resume.pdf"
        headingId="resume-heading"
      />

      <div className="resume-grid">
        <a
          className="resume-thumb"
          href={resumeMeta.pdf}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open resume PDF in a new tab"
        >
          <Image
            src={resumeMeta.preview}
            alt="Page 1 of Redick Butay's resume"
            width={resumeMeta.previewWidth}
            height={resumeMeta.previewHeight}
            sizes="(max-width: 760px) 100vw, 360px"
            priority={false}
          />
          <span className="resume-thumb-cta" aria-hidden="true">
            ↗ open
          </span>
        </a>

        <div className="resume-copy">
          <h3>
            The printed version<span className="sl">.</span>
          </h3>
          <p className="prose">
            Same content as this page, different format. Updated{" "}
            <strong>{resumeMeta.updated}</strong>. Have a look, send it on, or
            drop it into your ATS — whatever works.
          </p>

          <div className="resume-actions">
            <a
              className="btn primary"
              href={resumeMeta.pdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ open in new tab
            </a>
            <a
              className="btn"
              href={resumeMeta.pdf}
              download={resumeMeta.downloadAs}
            >
              ↓ download
            </a>
          </div>

          <dl className="resume-meta">
            <div style={{ display: "contents" }}>
              <dt>file</dt>
              <dd>{resumeMeta.fileLabel}</dd>
            </div>
            <div style={{ display: "contents" }}>
              <dt>updated</dt>
              <dd>{resumeMeta.updated}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
