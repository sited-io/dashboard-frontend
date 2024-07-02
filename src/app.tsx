import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";

import "./app.scss";
import { Layout } from "./layout/Layout";
import "./material-icons.scss";
import "./normalize.scss";
import "./theme.scss";
import { LOCALES } from "./locales";
import { TransProvider } from "@mbarzda/solid-i18next";
import { WebsiteContextProvider } from "./contexts/WebsiteContext";
import { MetaProvider } from "@solidjs/meta";

export default function App() {
  const i18nextInstance = i18next.createInstance({
    load: "all",
    resources: LOCALES,
  });
  i18nextInstance.use(LanguageDetector);
  i18nextInstance.use(ICU);

  return (
    <MetaProvider>
      <TransProvider instance={i18nextInstance}>
        <WebsiteContextProvider>
          <Router root={Layout}>
            <FileRoutes />
          </Router>
        </WebsiteContextProvider>
      </TransProvider>
    </MetaProvider>
  );
}
