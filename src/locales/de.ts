import { TKEYS } from ".";
import { EN } from "./en";

export const DE: typeof TKEYS = {
  lang: "de",
  common: {
    "per-or-every": "{count, plural, =1 {pro} other {alle} }",
  },
  form: {
    "critical-settings": "Kritische Einstellungen",
    action: {
      Create: "Erstellen",
      Update: "Speichern",
      Save: "Speichern",
      Close: "Schließen",
      Cancel: "Abbrechen",
      Delete: "Löschen",
      "Confirm-Deletion?": "Wirklich löschen?",
      "Are-you-sure-you-want-to-delete-the-item":
        '{item} namens "{name}" wirklich löschen?',
    },
    errors: {
      "wrong-type": "Falscher Dateityp. Derzeit unterstützt: {types}",
      "item-too-large": "{item} is too large. maximum: {maxSize}",
    },
  },
  navigation: {
    back: "Zurück",
    redirecting: "Redirecting",
    pages: {
      Home: "Home",
      Pages: "Seiten",
      Configuration: "Konfiguration",
      Settings: "Einstellungen",
      Offers: "Angebote",
      Profile: "Profil",
      "Offer-Images": "Bilder bearbeiten",
      "Offer-Media": "Dateien bearbeiten",
    },
  },
  user: {
    "sign-in": "Einloggen",
    "sign-out": "Logout",
    register: "Registrieren",
    "sign-in-or-register":
      "Melde dich an oder registriere dich, um auf das Dashboard zuzugreifen",
  },
  websites: {
    website: "Webseite",
    "create-website": "Erstelle eine neue Webseite",
    "no-website-information": "Erstelle deine erste Webseite!",
    "delete-website": "Diese Webseite Löschen",
    labels: {
      name: "Name",
      pages: "Seiten",
      domains: "Domains",
    },
  },
  customization: {
    labels: {
      "primary-color": "Primäre Farbe",
      "logo-image": "Logo",
    },
  },
  page: {
    page: "Seite",
    "create-page": "Erstelle eine neue Seite",
    "edit-page-settings": "Seiteneinstellungen",
    "home-page": "Hauptseite",
    "no-pages-yet": "Bislang keine Seiten ...",
    labels: {
      title: "Titel",
      "page-type": "Seiten Typ",
      "is-home-page": "Ist Homepage",
    },
    placeholders: {
      title: "Home",
    },
    "page-type": {
      "0": "UNSPECIFIED",
      "1": "Statisch",
      "2": "Shop",
    },
  },
  domain: {
    domain: "Domain",
    "add-domain": "Domain hinzufügen",
    "domain-status": {
      "0": "UNSPECIFIED",
      "1": "Intern",
      "2": "Ausstehend",
      "3": "Aktiv",
    },
    labels: {
      domain: "Domain",
    },
  },
  shop: {
    "no-shop-yet": "Bisher keinen Shop erstellt ...",
    stripe: {
      integration: "Stripe Integration",
      url: "https://stripe.com/de",
      title: "Stripe",
      "integration-info-left": "Registriere dich bei",
      "integration-info-right":
        ", um viele gängige Online-Zahlungsmethoden einzurichten.",
      "start-integration": "Starte mit",
      "continue-integration": "Fortsetzen mit",
      connected: "Stripe Account ist verbunden",
    },
  },
  offers: {
    offer: "Angebot",
    "create-offer": "Erstelle ein Angebot",
    "delete-offer": "Dieses Angebot löschen",
    "edit-details": "Details bearbeiten",
    "edit-media": "Dateien bearbeiten",
    "offer-type": {
      "0": "UNDEFINED",
      "1": "Gegenstand",
      "2": "Digital",
      "3": "Dienstleistung",
    },
    "is-active-info":
      "Das Angebot ist veröffentlicht und kann von deinen Kunden*innen entdeckt werden.",
    "is-not-active-info":
      "Das Angebot ist noch ein Entwurf und kann nicht entdeckt werden.",
    "make-active":
      "Veröffentliche das Angebot, um es für deine Kunden*innen sichtbar zu machen",
    "make-inactive":
      "Mache das Angebot zu einem Entwurf, dadurch wird es nicht mehr sichtbar für deine Kunden*innen",
    visibility: {
      "0": "Entwurf",
      "1": "Aktiv",
    } as Record<string, string>,
    labels: {
      name: "Name",
      image: "Bild",
      type: "Typ",
      description: "Beschreibung",
    },
  },
  images: {
    "add-image": "Bild hinzufügen",
    "remove-image": "Bild löschen",
  },
  price: {
    "decimal-point": ",",
    "days-free": "{periodDays, plural, =1 {Tag} other {Tage}} kostenlos",
    "update-price": "Preis bearbeiten",
    "price-type": {
      "0": "UNDEFINED",
      "1": "Einmalig",
      "2": "Wiederkehrend",
    },
    currency: EN.price.currency,
    "recurring-interval": {
      "0": EN.price["recurring-interval"][0],
      "1": `{intervalCount, plural, =1 {Tag} other {Tage} }`,
      "2": `{intervalCount, plural, =1 {Woche} other {Wochen} }`,
      "3": `{intervalCount, plural, =1 {Monat} other {Monate} }`,
      "4": `{intervalCount, plural, =1 {Jahr} other {Jahre} }`,
    },
    labels: {
      price: "Preis",
      "price-type": "Typ",
      "billing-period": "Abrechnungszeitraum",
    },
  },
  "shipping-rate": {
    "shipping-rate": "Versandkosten",
    "update-shipping-rate": "Versandkosten bearbeiten",
  },
  media: {
    media: "Datei",
    "upload-media": "Datei hochladen",
    "edit-file": "Datei bearbeiten",
    labels: {
      name: "Name",
      filename: "Dateiname",
      ordering: "Sortierung",
    },
  },
};
