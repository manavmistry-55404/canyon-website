import { LegalContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function PrivacyPolicyPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Privacy Policy"
        title="Clear privacy practices for every conversation."
        copy="Canyon treats shared information with care, purpose, and responsible handling."
      />
      <LegalContent type="privacy" />
    </SiteFrame>
  );
}
