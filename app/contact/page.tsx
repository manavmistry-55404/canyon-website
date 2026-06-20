import { ContactContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function ContactPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Get in Touch"
        title="Let's turn your data into decisions."
        copy="Every engagement starts with a single structured session. Tell us what you're trying to solve — we'll bring the map."
        cta="Book a Discovery Workshop"
        ctaHref="#book-demo"
        secondaryCta="Explore Solutions"
        secondaryHref="/solutions"
      />
      <ContactContent />
    </SiteFrame>
  );
}
