import { AboutContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function AboutPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="About Canyon Data Labs"
        title={
          <>
            An embedded partner
            <br />
            for enterprise clarity
          </>
        }
        copy="Canyon Data Labs is an enterprise-wide data solutions company. We help organisations define their data strategy and execute it end-to-end, from putting the right systems in place, to building intelligence on top of the data they generate, to automating the checks that keep every critical process accountable."
        cta="Get in Touch"
        ctaHref="/contact"
      />
      <AboutContent />
    </SiteFrame>
  );
}
