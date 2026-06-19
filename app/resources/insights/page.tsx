import { ResourceDetailContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function InsightsPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Insights"
        title="Ideas for moving from information to impact."
        copy="Perspective for leadership teams building clearer information, stronger context, and faster execution."
      />
      <ResourceDetailContent kind="insights" />
    </SiteFrame>
  );
}
