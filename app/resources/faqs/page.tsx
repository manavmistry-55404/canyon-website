import { ResourceDetailContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function FaqsPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="FAQs"
        title="Questions leaders ask before connecting systems and action."
        copy="Direct answers on engagement shape, timing, solution fit, and implementation rhythm."
      />
      <ResourceDetailContent kind="faqs" />
    </SiteFrame>
  );
}
