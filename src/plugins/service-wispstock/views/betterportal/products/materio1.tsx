/** @jsxImportSource jsx-htmx */

import {BetterPortalUIView} from "@bettercorp/betterportal";
import {
  ViewDefinition,
} from "./index";

export const Component: BetterPortalUIView<ViewDefinition> = (props) => {
  return {
    status: 200,
    content: (
        <div class="row">
          PRODUCTS
        </div>
    ),
  };
};