// 에셋에 대해서 들고오는 타입
interface SanityAsset{
    url: string;
    originalFilename: string;
    uploadId: string;
    assetId: string;
    extension: string;
    mimeType: string;
    path: string;
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
}

// Projection에 대한 타입
interface SanityRequest {
    _id: string;
    _type: string;
    title: string;
    description: string;
    // 에셋들 (Filter를 통해서 가져온 에셋들입니다.)
    // Filter: *[_type in ["lottie", "svg", "gif"]]
    lottie: SanityAsset;
    capture: SanityAsset;
    font: SanityAsset;
    icon: SanityAsset;
    gif: SanityAsset;
    img: SanityAsset;
    logo: SanityAsset;
    video: SanityAsset;
}

const SANITY_USER_AGENT = "Sanity.io webhook delivery"; // Webhook을 처리할 때 User-Agent를 체크하기 위한 상수

/**
 * NOTE: sanity cdn url format:
 * https://cdn.sanity.io/files/<projectId>/<dataset>/<assetId>.<extension>
 * @example https://cdn.sanity.io/files/abc123/production/1234567890.json
 *
 * NOTE: r2 cdn url format:
 * https://<cdnDomain>/<dataset>/<documentType>/<documentId>/<assetId>.<extension>
 * @example https://cdn.yourdomain.com/development/lottie/1234567890/123456.json
 * @example https://cdn.yourdomain.com/production/lottie/1234567890/123211.svg
 * @example https://cdn.yourdomain.com/production/lottie/1234567890/122131.gif
 */
export const putAssetFromBucket = async (request: Request, env: Env): Promise<Response> => {
  if (request.headers.get("user-agent") !== SANITY_USER_AGENT) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 401,
    });
  }

  const asset = await request.json<SanityRequest>();
  console.log("asset", asset);

  const dataset = request.headers.get("sanity-dataset");

  if (asset.lottie) {
    const lottie = await fetch(asset.lottie.url, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    const lottiePath = `${dataset}/${asset._type}/${asset._id}/${asset.lottie.assetId}.${asset.lottie.extension}`;

    console.log("lottiePath", lottiePath);

    try {
      await env.ASSET_TOWN_CDN_BUCKET.put(lottiePath, JSON.stringify(lottie), {
        httpMetadata: {
          contentType: asset.lottie.mimeType,
        },
        customMetadata: {
          ...asset.lottie,
        },
      });
    } catch {
      return new Response(JSON.stringify({ message: "Lottie Put Failed!!!" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
      });
    }
  }

  if (asset.gif) {
    const axios = require('axios');

    // Fetch the image as an ArrayBuffer
    const response = await axios.get(asset.gif.url, {
    responseType: 'arraybuffer',
    headers: {
        'Content-Type': 'image/gif',
    },
    });

    const gif = response.data;
    // const gif = await fetch(asset.gif.url, {
    //   headers: {
    //     "Content-Type": "image/gif",
    //   },
    // }).then((response) => response.blob());
    const gifPath = `${dataset}/${asset._type}/${asset._id}/${asset.gif.assetId}.${asset.gif.extension}`;

    console.log("gifPath", gifPath);

    try {
      await env.ASSET_TOWN_CDN_BUCKET.put(gifPath, gif, {
        httpMetadata: {
          contentType: asset.gif.mimeType,
        },
        customMetadata: {
          ...asset.gif,
        },
      });
    } catch {
      return new Response(JSON.stringify({ message: "GIF Put Failed!!!" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
      });
    }
  }

  if (asset.font) {
    const axios = require('axios');

    // Fetch the image as an ArrayBuffer
    const response = await axios.get(asset.font.url, {
      responseType: 'arraybuffer',
      headers: {
          'Content-Type': 'font/ttf',
      },
    });

    const font = response.data;
    // const gif = await fetch(asset.gif.url, {
    //   headers: {
    //     "Content-Type": "image/gif",
    //   },
    // }).then((response) => response.blob());
    const fontPath = `${dataset}/${asset._type}/${asset._id}/${asset.font.assetId}.${asset.font.extension}`;

    console.log("fontPath", fontPath);

    try {
      await env.ASSET_TOWN_CDN_BUCKET.put(fontPath, font, {
        httpMetadata: {
          contentType: asset.font.mimeType,
        },
        customMetadata: {
          ...asset.font,
        },
      });
    } catch {
      return new Response(JSON.stringify({ message: "FONT Put Failed!!!" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
      });
    }
  }

  return new Response(JSON.stringify({ message: "Put Success!!!" }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    status: 200,
  });
};

export const deleteAssetFromBucket = async (request: Request, env: Env): Promise<Response> => {
  if (request.headers.get("user-agent") !== SANITY_USER_AGENT) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 401,
    });
  }

  const asset = await request.json<SanityRequest>();
  console.log("asset", asset);

  const dataset = request.headers.get("sanity-dataset");

  if (asset.lottie) {
    try {
      const lottiePath = `${dataset}/${asset._type}/${asset._id}/${asset.lottie.assetId}.${asset.lottie.extension}`;
      console.log("lottiePath", lottiePath);

      await env.ASSET_TOWN_CDN_BUCKET.delete(lottiePath);
    } catch {
      return new Response(JSON.stringify({ message: "Lottie Delete Failed!!!" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
      });
    }
  }

  if (asset.gif) {
    try {
      const gifPath = `${dataset}/${asset._type}/${asset._id}/${asset.gif.assetId}.${asset.gif.extension}`;
      console.log("gifPath", gifPath);

      await env.ASSET_TOWN_CDN_BUCKET.delete(gifPath);
    } catch {
      return new Response(JSON.stringify({ message: "GIF Delete Failed!!!" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
      });
    }
  }

  if (asset.font) {
    try {
      const fontPath = `${dataset}/${asset._type}/${asset._id}/${asset.font.assetId}.${asset.font.extension}`;
      console.log("fontPath", fontPath);

      await env.ASSET_TOWN_CDN_BUCKET.delete(fontPath);
    } catch {
      return new Response(JSON.stringify({ message: "FONT Delete Failed!!!" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
      });
    }
  }

  return new Response(JSON.stringify({ message: "Delete Success!!!" }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    status: 200,
  });
};