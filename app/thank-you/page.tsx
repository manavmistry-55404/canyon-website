import { SimplePage, ThankYouContent } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function ThankYouPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Thank You"
        title="Your request is with Canyon."
        copy="Our team will review the priority and share a clear next step."
        cta="Explore Solutions"
        ctaHref="/solutions"
        secondaryCta="Return Home"
        secondaryHref="/"
      />
      <ThankYouContent />
    </SiteFrame>
  );
}
