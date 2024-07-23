export const TKEYS = {
  lang: "lang",
  common: {
    "per-or-every": "common.per-or-every",
  },
  form: {
    "critical-settings": "form.critical-settings",
    action: {
      Create: "form.action.Create",
      Update: "form.action.Update",
      Save: "form.action.Save",
      Close: "form.action.Close",
      Cancel: "form.action.Cancel",
      Delete: "form.action.Delete",
      "Confirm-Deletion?": "form.action.Confirm-Deletion?",
      "Are-you-sure-you-want-to-delete-the-item":
        "form.action.Are-you-sure-you-want-to-delete-the-item",
    },
    errors: {
      "wrong-type": "form.errors.wrong-type",
      "item-too-large": "form.errors.item-too-large",
    },
  },
  navigation: {
    back: "navigation.back",
    redirecting: "navigation.redirecting",
    pages: {
      Home: "navigation.pages.Home",
      Pages: "navigation.pages.Pages",
      Configuration: "navigation.pages.Configuration",
      Settings: "navigation.pages.Settings",
      Offers: "navigation.pages.Offers",
      Profile: "navigation.pages.Profile",
      "Offer-Images": "navigation.pages.Offer-Images",
      "Offer-Media": "navigation.pages.Offer-Media",
    },
  },
  user: {
    "sign-in": "user.sign-in",
    "sign-out": "user.sign-out",
    register: "user.register",
    "sign-in-or-register": "user.sign-in-or-register",
  },
  websites: {
    website: "websites.website",
    "create-website": "websites.create-website",
    "no-website-information": "websites.no-website-information",
    "delete-website": "websites.delete-website",
    labels: {
      name: "websites.labels.name",
      pages: "websites.labels.pages",
      domains: "websites.labels.domains",
    },
  },
  customization: {
    labels: {
      "primary-color": "customization.labels.primary-color",
      "logo-image": "customization.labels.logo-image",
    },
  },
  page: {
    page: "page.page",
    "create-page": "page.create-page",
    "home-page": "page.home-page",
    "no-pages-yet": "page.no-pages-yet",
    labels: {
      title: "page.labels.title",
      "page-type": "page.labels.page-type",
      "is-home-page": "page.labels.is-home-page",
    },
    placeholders: {
      title: "page.placeholders.title",
    },
    "page-type": {
      "0": "page.page-type.0",
      "1": "page.page-type.1",
      "2": "page.page-type.2",
    } as Record<string, string>,
  },
  domain: {
    domain: "domain.domain",
    "add-domain": "domain.add-domain",
    "domain-status": {
      "0": "domain.domain-status.0",
      "1": "domain.domain-status.1",
      "2": "domain.domain-status.2",
      "3": "domain.domain-status.3",
    },
    labels: {
      domain: "domain.labels.domain",
    },
  },
  shop: {
    "no-shop-yet": "shop.no-shop-yet",
    stripe: {
      integration: "shop.stripe.integration",
      url: "shop.stripe.url",
      title: "shop.stripe.title",
      "integration-info-left": "shop.stripe.integration-info-left",
      "integration-info-right": "shop.stripe.integration-info-right",
      "start-integration": "shop.stripe.start-integration",
      "continue-integration": "shop.stripe.continue-integration",
      connected: "shop.stripe.connected",
    },
  },
  offers: {
    offer: "offers.offer",
    "create-offer": "offers.create-offer",
    "delete-offer": "offers.delete-offer",
    "edit-details": "offers.edit-details",
    "edit-media": "offers.edit-media",
    "offer-type": {
      "0": "offers.offer-type.0",
      "1": "offers.offer-type.1",
      "2": "offers.offer-type.2",
      "3": "offers.offer-type.3",
    } as Record<string, string>,
    "is-active-info": "offers.is-active-info",
    "is-not-active-info": "offers.is-not-active-info",
    "make-active": "offers.make-active",
    "make-inactive": "offers.make-inactive",
    visibility: {
      "0": "offers.visibility.0",
      "1": "offers.visibility.1",
    } as Record<string, string>,
    labels: {
      name: "offers.labels.name",
      image: "offers.labels.image",
      type: "offers.labels.type",
    },
  },
  images: {
    "add-image": "images.add-image",
    "remove-image": "images.remove-image",
  },
  price: {
    "decimal-point": "price.decimal-point",
    "days-free": "price.days-free",
    "update-price": "price.update-price",
    "price-type": {
      "0": "price.price-type.0",
      "1": "price.price-type.1",
      "2": "price.price-type.2",
    } as Record<string, string>,
    currency: {
      "0": "price.currency.0",
      "1": "price.currency.1",
    } as Record<string, string>,
    "recurring-interval": {
      "0": "price.recurring-interval.0",
      "1": "price.recurring-interval.1",
      "2": "price.recurring-interval.2",
      "3": "price.recurring-interval.3",
      "4": "price.recurring-interval.4",
    } as Record<string, string>,
    labels: {
      price: "price.labels.price",
      "price-type": "price.labels.price-type",
      "billing-period": "price.labels.billing-period",
    },
  },
  "shipping-rate": {
    "shipping-rate": "shipping-rate.shipping-rate",
    "update-shipping-rate": "shipping-rate.update-shipping-rate",
  },
  media: {
    media: "media.media",
    "upload-media": "media.upload-media",
    "edit-file": "media.edit-file",
    labels: {
      name: "media.labels.name",
      filename: "media.labels.filename",
      ordering: "media.labels.ordering",
    },
  },
};
