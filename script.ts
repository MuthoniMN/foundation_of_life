import { getPayload } from "payload";
import config from "./payload.config";

async function run() {
  const payload = await getPayload({ config });
  
  const home = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
  });
  
  const about = await payload.find({
    collection: "pages",
    where: { slug: { equals: "about" } },
  });

  const layout = home.docs[0]?.layout || [];
  layout.forEach(block => {
    console.log("HOME BLOCK:", block.blockName);
    console.log(JSON.stringify(block, null, 2));
  });

  const layoutAbout = about.docs[0]?.layout || [];
  layoutAbout.forEach(block => {
    console.log("ABOUT BLOCK:", block.blockName);
    console.log(JSON.stringify(block, null, 2));
  });
}

run();
