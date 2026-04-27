import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Homelab } from "@/components/Homelab";
import { Now } from "@/components/Now";
import { OpenSource } from "@/components/OpenSource";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Stack } from "@/components/Stack";
import { Timeline } from "@/components/Timeline";
import { TopBar } from "@/components/TopBar";
import { TweaksPanel } from "@/components/TweaksPanel";

export default function Page() {
  return (
    <>
      <TopBar />
      <main className="shell" id="main">
        <Hero />
        <About />
        <Resume />
        <Contact />
        <Timeline />
        <Stack />
        <Projects />
        <OpenSource />
        <Homelab />
        <Now />
      </main>
      <Footer />
      <TweaksPanel />
    </>
  );
}
