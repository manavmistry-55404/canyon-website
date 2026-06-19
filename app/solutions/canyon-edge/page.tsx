import { SimplePage, SolutionDetail } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function CanyonEdgePage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Canyon Edge"
        title="Create business understanding."
        copy="For organizations ready to turn available information into sharper context, forecasting, performance visibility, and decision support."
      />
      <SolutionDetail name="Canyon Edge" />
    </SiteFrame>
  );
}
