import { LegalContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function TermsPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Terms of Use"
        title="Simple terms for a clear website experience."
        copy="These terms guide access, content usage, and communication through the Canyon website."
      />
      <LegalContent type="terms" />
    </SiteFrame>
  );
}
