import { CareersContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function CareersPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Careers"
        title="Build clarity for organizations operating in complexity."
        copy="Canyon Data Labs is for people who think across business, systems, data, and execution."
        cta="Get in Touch"
        ctaHref="/contact"
      />
      <CareersContent />
    </SiteFrame>
  );
}
