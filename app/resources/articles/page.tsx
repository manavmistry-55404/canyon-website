import { ResourceDetailContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function ArticlesPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Articles"
        title="Clear writing for complex operating realities."
        copy="Practical writing on reporting, leadership visibility, execution accountability, and system design."
      />
      <ResourceDetailContent kind="articles" />
    </SiteFrame>
  );
}
