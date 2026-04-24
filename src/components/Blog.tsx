import { posts } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Blog() {
  return (
    <section id="blog" aria-labelledby="blog-heading">
      <SectionHead idx="08" title="writing" meta="~/notes · draft posts" />
      <h2 id="blog-heading" style={{ position: "absolute", left: "-9999px" }}>
        Writing
      </h2>

      <div className="posts">
        {posts.map((p) => (
          <a key={p.title} className="post" href={p.href}>
            <span className="date">{p.date}</span>
            <h3>
              <span className="tag-inline">{p.tag}</span>
              {p.title}
            </h3>
            <span className="rt">{p.readTime}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
