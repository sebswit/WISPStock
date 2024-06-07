import {
  BetterPortalUIComponentBaseTypeDefinition,
  BetterPortalUIView,
  BetterPortalUIComponentDataHandler,
  HTTP_DATA_METHOD,
} from "@bettercorp/betterportal";
import {z} from "zod";
import {Plugin} from "../../../plugin";
import {T_SUPPORTED_THEMES} from "../index";

const querySchema = z.object({
  page: z.coerce.number()
         .min(1)
         .optional(),
  search: z.string().optional(),
});
const outputSchema = z.object({
  products: z.array(z.object({
    title: z.string(),
    rateOfReturn: z.number(),
  })),
  page: z.number(),
  total: z.number(),
});

export interface ViewDefinition
    extends BetterPortalUIComponentBaseTypeDefinition {
  context?: Plugin,
  path: "/products",
  query: typeof querySchema;
  inboundData: null;
  outputData: typeof outputSchema;
  internalData?: {};
}

export const ViewSchema: ViewDefinition = {
  path: "/products",
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
  return {
    status: 200,
    content: {} as any,
  };
};
export const DataHandlers: Record<HTTP_DATA_METHOD, BetterPortalUIComponentDataHandler<ViewDefinition> | undefined> = {
  POST: DataHandler,
  GET: DataHandler,
  PATCH: undefined,
  DELETE: undefined,
  PUT: undefined,
};