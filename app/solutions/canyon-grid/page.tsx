import { SimplePage, SolutionDetail } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function CanyonGridPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Canyon Grid"
        title="Drive action and accountability."
        copy="For organizations ready to turn insights into workflows, alerts, ownership, follow-through, and measurable execution."
      />
      <SolutionDetail name="Canyon Grid" />
    </SiteFrame>
  );
}
