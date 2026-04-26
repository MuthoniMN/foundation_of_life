import { getPayload } from "payload";
import config from "@/payload.config";

export async function GET() {
  const payload = await getPayload({ config });
  
  const home = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
  });
  
  const about = await payload.find({
    collection: "pages",
    where: { slug: { equals: "about" } },
  });

  return Response.json({
    homeLayout: home.docs[0]?.layout,
    aboutLayout: about.docs[0]?.layout,
  });
}
