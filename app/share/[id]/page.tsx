import { Tooltip } from "react-tooltip";
import Share from "@/app/common/components/Pages/Share";

export default function SharePage({ params }: { params: any }) {
  // decode base64

  return <Share id={params.id} />;
}
