import {
  BetterPortalUIComponentBaseTypeDefinition,
  BetterPortalUIView,
  BetterPortalUIComponentDataHandler,
  HTTP_DATA_METHOD,
} from "@bettercorp/betterportal";
import { z } from "zod";
import { Plugin } from "../../../plugin";
import { T_SUPPORTED_THEMES } from "../index";

const querySchema = z.object({});
// schemas
const productAdditionalInfoSchema = z.object({
  descriptionShort: z.string().optional(),
  descriptionLong: z.string().optional(),
  descriptionLongHtml: z.string().optional(),
  images: z.array(z.string()),
  urls: z.record(z.string().url()),
  // created: z.number().optional(),
  // published: z.number().optional(),
});

const distributorSchema = {
  key: z.string(),
  name: z.string(),
  icon: z.string(),
  url: z.string(),
};
const productSchema = {
  img: z.string(),
  brand: z.string(),
  categories: z.array(z.string()),
  title: z.string(),
  sku: z.string(),
  status: z.string(),
  additionalInfo: productAdditionalInfoSchema,
};

// main schema

const outputSchema = z.object({
  ...productSchema,
  distributors: z.array(z.object(distributorSchema)),
});

export interface ViewDefinition
  extends BetterPortalUIComponentBaseTypeDefinition {
  context?: Plugin;
  path: "/products/:id/";
  query: typeof querySchema;
  inboundData: null;
  outputData: typeof outputSchema;
  internalData?: {};
}

export const ViewSchema: ViewDefinition = {
  path: "/products/:id/",
  query: querySchema,
  inboundData: null,
  outputData: outputSchema,
  methods: ["GET"],
};

import { Component as Materio1 } from "./materio1";
import { ProductListItem } from "src";

export const ViewHandlers: Record<
  T_SUPPORTED_THEMES,
  BetterPortalUIView<ViewDefinition> | null
> = {
  materio1: Materio1,
};

export const DataHandler: BetterPortalUIComponentDataHandler<
  ViewDefinition
> = async (props) => {
  const session = props.context.RavenDB.openSession();

  const product = await session.load<ProductListItem>(props.params.id);

  if (product == null)
    return {
      status: 404,
      content: null,
    };

  return {
    status: 200,
    content: {
      sku: product.sku,
      title: product.title,
      brand: product.brand,
      img: product.img,
      categories: product.categories,
      additionalInfo: {
        descriptionLong: product.additionalInfo.descriptionLong,
        descriptionShort: product.additionalInfo.descriptionShort,
        delscriptionLongHtml: product.additionalInfo.descriptionLongHtml,
        images: product.additionalInfo.images,
        urls: product.additionalInfo.urls,
      },
      status: product.status,
      distributors: [],
    } as z.infer<typeof outputSchema>,
  };
};

export const DataHandlers: Record<
  HTTP_DATA_METHOD,
  BetterPortalUIComponentDataHandler<ViewDefinition> | undefined
> = {
  POST: DataHandler,
  GET: DataHandler,
  PATCH: undefined,
  DELETE: undefined,
  PUT: undefined,
};
