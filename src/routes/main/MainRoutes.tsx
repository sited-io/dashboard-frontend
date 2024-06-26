import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import {
  DASHBOARD_OFFER_PATH_SEGMENT,
  DASHBOARD_SHOP_PATH_SEGMENT,
  buildDashboardPath,
  buildIndexPath,
  buildMediaConfigurationPath,
  buildOfferDetailConfigurationPath,
  buildShopConfigurationPath,
  buildShopDashboardPath,
  buildShopSettingsPath,
} from "./main-routing";

const MainLayout = lazy(() => import("../../layouts/MainLayout"));

const LandingPage = lazy(
  () => import("../../pages/main-pages/landing-page/Page")
);

const DashboardPage = lazy(() => import("../../pages/dashboard/Page"));
const ShopConfigurationPage = lazy(
  () => import("../../pages/dashboard/shop-configurator/Page")
);
const ShopSettingsPage = lazy(
  () => import("../../pages/dashboard/shop-settings/Page")
);
const OfferDetailConfigurationPage = lazy(
  () => import("../../pages/dashboard/offer-detail-configuration/Page")
);
const MediaConfigurationPage = lazy(
  () => import("../../pages/dashboard/media-configuration/Page")
);

export default function MainRoutes() {
  return (
    <Route path="" component={MainLayout}>
      <Route path={buildIndexPath()} component={LandingPage} />

      <Route path={buildDashboardPath()} component={DashboardPage} />

      <Route
        path={buildShopDashboardPath(DASHBOARD_SHOP_PATH_SEGMENT)}
        component={DashboardPage}
      />

      <Route
        path={buildShopConfigurationPath(DASHBOARD_SHOP_PATH_SEGMENT)}
        component={ShopConfigurationPage}
      />

      <Route
        path={buildShopSettingsPath(DASHBOARD_SHOP_PATH_SEGMENT)}
        component={ShopSettingsPage}
      />

      <Route
        path={buildOfferDetailConfigurationPath(
          DASHBOARD_SHOP_PATH_SEGMENT,
          DASHBOARD_OFFER_PATH_SEGMENT
        )}
        component={OfferDetailConfigurationPage}
      />

      <Route
        path={buildMediaConfigurationPath(DASHBOARD_SHOP_PATH_SEGMENT)}
        component={MediaConfigurationPage}
      />
    </Route>
  );
}
