import { SimplePage, SolutionsContent } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function SolutionsPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Solutions"
        title="Three products. One connected platform."
        copy="Canyon Data Labs builds the systems that capture your data, the layer that gives it business meaning, and the intelligence that turns it into decisions. Every product works independently. Together, they cover the full journey."
      />
      <SolutionsContent />
    </SiteFrame>
  );
}
