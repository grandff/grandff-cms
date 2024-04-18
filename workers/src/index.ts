import {Router} from "itty-router";
import { handleOptions } from "./helper";
import { deleteAssetFromBucket, putAssetFromBucket } from "./api/asset";

const router = Router();

router.put("/api/v1", putAssetFromBucket) // 등록, 수정
router.delete("/api/v1", deleteAssetFromBucket) // 삭제

router.options("*", handleOptions);

export default {
  fetch: (request: Request, ...extra: unknown[]) => {
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    return router
      .handle(request, ...extra)
      .then((response: Response) => {
        response.headers.set("Access-Control-Allow-Origin", "*");
        return response;
      })
      .catch((error: unknown) => {
        console.error("error: ", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          status: 500,
        });
      });
  },
};