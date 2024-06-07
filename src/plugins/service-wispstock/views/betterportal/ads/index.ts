import {
  BetterPortalUIComponentBaseTypeDefinition,
  BetterPortalUIView,
  BetterPortalUIComponentDataHandler,
  HTTP_DATA_METHOD,
} from "@bettercorp/betterportal";
import {Tools} from "@bettercorp/tools/lib/Tools";
import {z} from "zod";
import {ADCover} from "../../../../../index";
import {Plugin} from "../../../plugin";
import {T_SUPPORTED_THEMES} from "../index";

const querySchema = z.object({});
const outputSchemaItem = z.object({
  id: z.string(),
  title: z.string(),
  link: z.string(),
  ads: z.array(z.object({
    img: z.string(),
    line1: z.string(),
    line2: z.string(),
    linkText: z.string(),
  })),
});
const outputSchema = z.array(outputSchemaItem);

export interface ViewDefinition
    extends BetterPortalUIComponentBaseTypeDefinition {
  context?: Plugin,
  path: "/a",
  query: typeof querySchema;
  inboundData: null;
  outputData: typeof outputSchema;
  internalData?: {};
}

export const ViewSchema: ViewDefinition = {
  path: "/a",
  query: querySchema,
  inboundData: null,
  outputData: outputSchema,
  methods: [
    "GET",
  ],
};

import {Component as Materio1} from "./materio1";

export const ViewHandlers: Record<T_SUPPORTED_THEMES, BetterPortalUIView<ViewDefinition> | null> = {
  materio1: Materio1,
};

export const DataHandler: BetterPortalUIComponentDataHandler<ViewDefinition> = async (props) => {
  let session = props.context.RavenDB.openSession();
  let now = Date.now();
  let ads = await session
      .query<ADCover>({collection: "ads"})
      .whereNotEquals("enabled", false)
      .all();
  session.dispose();
  let returnAds: Array<z.infer<typeof outputSchemaItem>> = [];
  for (let ad of ads) {
    if (!Tools.isNullOrUndefined(ad.start) && ad.start > now) {
      continue;
    }
    if (!Tools.isNullOrUndefined(ad.end) && ad.end < now) {
      continue;
    }
    returnAds.push({
      id: ad.id,
      title: ad.title,
      link: ad.link,
      ads: ad.ads.map((ad) => {
        return {
          img: ad.img,
          line1: ad.line1,
          line2: ad.line2,
          linkText: ad.linkText,
        };
      }),
    });
  }
  return {
    status: 200,
    content: returnAds,
  };
};
export const DataHandlers: Record<HTTP_DATA_METHOD, BetterPortalUIComponentDataHandler<ViewDefinition> | undefined> = {
  POST: DataHandler,
  GET: DataHandler,
  PATCH: undefined,
  DELETE: undefined,
  PUT: undefined,
};