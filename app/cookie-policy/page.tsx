import { LegalContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function CookiePolicyPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Cookie Policy"
        title="Transparent preferences for a better site experience."
        copy="Canyon uses essential site signals to support performance, preferences, and a smoother visitor experience."
      />
      <LegalContent type="cookies" />
    </SiteFrame>
  );
}
