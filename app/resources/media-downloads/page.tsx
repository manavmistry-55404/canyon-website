import { ResourceDetailContent, SimplePage } from "@/components/InnerPages";
import { SiteFrame } from "@/components/SiteFrame";

export default function MediaDownloadsPage() {
  return (
    <SiteFrame>
      <SimplePage
        eyebrow="Media & Downloads"
        title="Brand, solution, and briefing materials."
        copy="Overview materials, solution summaries, media assets, and launch-ready briefing resources."
      />
      <ResourceDetailContent kind="media" />
    </SiteFrame>
  );
}
