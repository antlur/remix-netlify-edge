import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import netlifyBlobsDriver from "unstorage/drivers/netlify-blobs";
import { env } from "./env";

function makeStorage() {
  // If we're not in a Netlify environment, use memory storage
  if (!env("SITE_ID")) {
    console.log("Using memory storage");
    return createStorage({
      driver: memoryDriver(),
    });
  }

  return createStorage({
    driver: netlifyBlobsDriver({
      deployScoped: true,
    }),
  });
}

const storage = makeStorage();

export { storage };
