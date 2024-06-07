import {
  BetterPortalUIClient,
} from "@bettercorp/betterportal";
import * as Products from "./products";
import * as ProductId from "./product-id";
import * as Ads from "./ads";

export const SUPPORTED_THEMES = ["materio1"] as const;
export type T_SUPPORTED_THEMES = typeof SUPPORTED_THEMES[number];

export const RegisterViews = (uiClient: BetterPortalUIClient<T_SUPPORTED_THEMES>) => {
  uiClient.registerView(Products.ViewSchema, Products.DataHandlers, Products.ViewHandlers);
  uiClient.registerView(ProductId.ViewSchema, ProductId.DataHandlers, ProductId.ViewHandlers);
  uiClient.registerView(Ads.ViewSchema, Ads.DataHandlers, Ads.ViewHandlers);
};