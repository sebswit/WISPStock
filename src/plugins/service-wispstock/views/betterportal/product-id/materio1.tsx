/** @jsxImportSource jsx-htmx */

import { BetterPortalUIView } from "@bettercorp/betterportal";
import { ViewDefinition } from "./index";

export const Component: BetterPortalUIView<ViewDefinition> = (props) => {
  const product = props.outboundData;

  return {
    status: 200,
    content: (
      <div class="row" style="height:75vh">
        <div
          class="d-flex shadow p-3 rounded bg-gradient"
          style="width: 100vw;"
        >
          <div class="p-3 rounded-3 w-50">
            <img
              src={product.img}
              class=" rounded-3 w-100 "
              alt={product.title}
            />
            <h1 class="card-title text-center user-select-none">
              {product.title}
            </h1>
          </div>

          <div class="card-body d-flex flex-column w-50 ">
            <p class="card-text user-select-none">
              {product.additionalInfo.descriptionShort}
            </p>

            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item pe-none user-select-none">
                Brand: {product.brand}
              </li>
              <li class="list-group-item pe-none user-select-none">
                SKU: {product.sku}
              </li>
              <li
                class={`list-group-item pe-none user-select-none ${
                  !product.categories || product.categories.length === 0
                    ? "d-none"
                    : ""
                }`}
              >
                Category: {product.categories || "No categories"}
              </li>
              <li
                class={`list-group-item pe-none user-select-none ${
                  !product.status || product.status.length === 0 ? "d-none" : ""
                }`}
              >
                Status: {product.status || "No status"}
              </li>
              <li class="list-group-item pe-none user-select-none">
                Total stock: {}
              </li>
              <li class="list-group-item pe-none user-select-none">
                Distributors: {}
              </li>
            </ul>

            {(product.additionalInfo.descriptionLong ||
              product.additionalInfo.descriptionLongHtml) && (
              <>
                <button
                  class="btn btn-primary mb-3"
                  type="button"
                  style="min-height: 50px"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample"
                  aria-expanded="false"
                  aria-controls="collapseWidthExample"
                >
                  Product additional info
                </button>
                <div style="min-height: 50px;">
                  <div
                    class="collapse collapse-horizontal"
                    id="collapseWidthExample"
                  >
                    <div class="card card-body" style="width: 40vw">
                      {product.additionalInfo.descriptionLongHtml ||
                        product.additionalInfo.descriptionLong}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div class="mt-auto d-flex justify-content-center align-self-center">
              <div class="d-flex gap-2 ">
                <div class="flex-row">
                  <div
                    data-mdb-input-init
                    class="form-outline "
                    style="width: 22rem;"
                  >
                    <input
                      type="number"
                      id="typeNumber"
                      class="form-control"
                      placeholder="Input quantity"
                      onchange="this.value = this.value < 0 ? 0 : this.value;"
                    />
                  </div>
                </div>
                <button type="button" class="btn btn-primary btn-m">
                  Add to basket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };
};
