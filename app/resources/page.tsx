import { ResourcesContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function ResourcesPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Resources"
        title="Practical insight for connected enterprise decisions."
        copy="Explore thinking on information systems, decision support, execution workflows, and enterprise visibility."
      />
      <ResourcesContent />
    </SiteFrame>
  );
}
