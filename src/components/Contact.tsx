import { contactLinks } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <SectionHead idx="09" title="contact" meta={`echo "hi" | mail red`} />

      <div className="contact-card">
        <div>
          <h2 id="contact-heading">Let&apos;s build something.</h2>
          <p className="lede">
            I&apos;m around for contract work, open-source collaboration, or just a nerdy chat about Odoo modules, self-hosting, or why your Caddyfile is misbehaving. Pick whatever channel fits — I actually read them all.
          </p>
          <div className="sig">
            {`-- redick\n   red@homelab:~$`}
          </div>
        </div>

        <ul className="contact-list">
          {contactLinks.map((l) => (
            <li key={l.label}>
              <span className="lbl">{l.label}</span>
              {l.disabled ? (
                <span>{l.display}</span>
              ) : l.external ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.display}
                </a>
              ) : (
                <a href={l.href}>{l.display}</a>
              )}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
