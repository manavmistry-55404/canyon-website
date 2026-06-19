import { SimplePage, SolutionDetail } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function CanyonSystemsPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Canyon Systems"
        title="Bring information together."
        copy="For organizations ready to unify business information, strengthen reporting confidence, and create enterprise-wide visibility."
      />
      <SolutionDetail name="Canyon Systems" />
    </SiteFrame>
  );
}
