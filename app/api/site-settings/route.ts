import { getPayload } from "payload";
import config from "@/payload.config";

export async function GET() {
  const payload = await getPayload({ config });
  const site = await payload.findGlobal({ slug: "site-settings" });

  return Response.json({ site });
}
