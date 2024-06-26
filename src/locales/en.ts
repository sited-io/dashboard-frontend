import { OfferType } from "../services/sited_io/commerce/v1/offer";
import {
  Currency,
  PriceType,
  RecurringInterval,
  currencyToJSON,
  priceTypeToJSON,
  recurringIntervalToJSON,
} from "../services/sited_io/commerce/v1/price";
import { ShopLayoutType } from "../services/sited_io/commerce/v1/shop_customization";
import { ReportType } from "../services/sited_io/report/v1/report";
import { TKEYS } from "./keys";

export const EN: typeof TKEYS = {
  lang: "en",
  "Peoples-Markets": "People's Markets",
  peoplesmarkets_com: "sited.io",
  peoplesmarkets_main_link: "https://sited.io",
  "powered-by-sited_io": " - powered by sited.io",
  fetching: {
    "content-loading": "Content loading ...",
    "content-error": "Unexpected Error",
  },
  common: {
    by: "By",
    or: "or",
    more: "more",
    file: "file",
    per: "per",
    every: "every",
    "per-or-every": "{count, plural, =1 {every} other {every} }",
    cancel: "Cancel",
    resume: "Resume",
    any: "Any",
    Preview: "Preview",
    reload: "reload",
    public: "public",
    hidden: "hidden",
  },
  authentication: {
    "sign-in": "Sign in",
    register: "Register",
    "sign-out": "Sign out",
  },
  form: {
    action: {
      "Create-new": "Create new",
      Add: "Add",
      OK: "OK",
      Next: "Next",
      Back: "Back",
      Previous: "Previous",
      Save: "Save",
      "Save-and-continue": "Save and continue",
      Done: "Done",
      Send: "Send",
      Edit: "Edit",
      Delete: "Delete",
      Cancel: "Cancel",
      Close: "Close",
      Discard: "Discard",
      Remove: "Remove",
      Enable: "Enable",
      Disable: "Disable",
      Publish: "Publish",
      Hide: "Hide",
      Accept: "Accept",
      Buy: "Buy",
      Subscribe: "Subscribe",
      "Are-you-sure-you-want-to-delete-the-item":
        'Are you sure you want to delete the {item}: "{name}"?',
      "Confirm-Deletion?": "Confirm Deletion?",
      "Discard-unsafed-changes": "Discard unsaved changes?",
      "Confirm-Cancellation": "Confirm Cancellation?",
    },
    "critical-settings": "Critical Settings",
    errors: {
      Conflict: "Conflict",
      "required-field": "Required field",
      "not-modified": "Not modified",
      "already-exists": "Already exists",
      "already-used": "Already exists",
      "item-too-large": "{item} is too large",
      "item-too-large-size": "{item} is too large. maximum: {maxSize}",
      "quota-exceeded": "File Quota exceeded",
      "wrong-type": "Wrong file type. Currently supported: {types}",
      "invalid-css-color": "Invalid CSS color",
      remove: "Remove: {item}",
    },
  },
  query: {
    "order-by": {
      "created-at": {
        title: "Created at",
        "newest-first": "Newest first",
        "oldest-first": "Oldest first",
      },
      "updated-at": {
        title: "Updated at",
        "newest-first": "Newest first",
        "oldest-first": "Oldest first",
      },
      random: {
        title: "Random",
      },
    },
  },
  pagination: {
    previous: "previous",
    next: "next",
  },
  navigation: {
    redirecting: "Redirecting",
  },
  price: {
    Price: "Price",
    "decimal-point": ".",
    "billing-period": "Billing period",
    "add-trial-period": "Add trial period",
    "trial-period": "Trial period",
    "days-free": "{periodDays, plural, =1 {day} other {days}} free",
    currency: {
      title: "Currency",
      [currencyToJSON(Currency.CURRENCY_EUR)]: `EUR`,
    },
    "price-type": {
      title: "Type",
      [priceTypeToJSON(PriceType.PRICE_TYPE_ONE_TIME)]: `One time`,
      [priceTypeToJSON(PriceType.PRICE_TYPE_RECURRING)]: `Recurring`,
    },
    "recurring-interval": {
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_DAY
      )]: `{intervalCount, plural, =1 {day} other {days} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_WEEK
      )]: `{intervalCount, plural, =1 {week} other {weeks} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_MONTH
      )]: `{intervalCount, plural, =1 {month} other {months} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_YEAR
      )]: `{intervalCount, plural, =1 {year} other {years} }`,
    },
  },
  shop: {
    title: "Shop",
    "title-plural": "Shops",
    "no-description": "No description ...",
    configuration: {
      title: "Configuration",
      info: "Configure how people see your shop, like name, description and appearance.",
      Details: "Details",
      Payment: "Payment",
      Appearance: "Appearance",
      Settings: "Settings",
    },
    settings: {
      title: "Shop Settings",
    },
    errors: {
      "conflict-on-delete":
        "Ensure all Offers are deleted and also remove the configured domain if any.",
      "invalid-url": "Invalid URL",
    },
    labels: {
      Details: "Details",
      Name: "Name",
      name: "name",
      Slug: "URL-Path",
      slug: "URL-Path",
      Description: "Description",
      description: "description",
      "Name-and-Description": "Name and Description",
      Image: "Banner Image",
      Logo: "Logo",
      Theme: "Theme",
      Path: "URL-path",
      Domain: "Domain",
      domain: "domain",
      "is-publicly-visible": "This Shop is publicly visible",
      "contact-email-address": "Contact email address",
      "Created-at": "Created at",
      "Updated-at": "Updated at",
    },
  },
  "shop-customization": {
    "layout-info":
      "Select the layout with which your offers will be presented on your home page.",
    labels: {
      Layout: "Layout",
      "primary-color": "Brand Color",
    },
    "layout-types": {
      [ShopLayoutType.SHOP_LAYOUT_TYPE_FEAD]: "Fead",
      [ShopLayoutType.SHOP_LAYOUT_TYPE_OFFER_LIST]: "Offers search",
    },
    "layout-type-info": {
      [ShopLayoutType.SHOP_LAYOUT_TYPE_FEAD]:
        'When you choose the layout "Fead" your offers will be listed one after the other on your home page.',
      [ShopLayoutType.SHOP_LAYOUT_TYPE_OFFER_LIST]:
        'When you choose the layout "Offers search" your offers will be listed as cards. Additionally there will be a search field available.',
    },
  },
  offer: {
    title: "Offer",
    "title-plural": "Offers",
    "no-offers-yet": "No Offers yet ...",
    "no-description": "No description ...",
    "currently-not-available": "Currently not available",
    "sign-in-to-subscribe": "Sign in and subscribe",
    "contact-shop": "Contact Shop",
    "other-offers": "Other Offers",
    "downloadable-content": "Downloadable Content",
    "downloadable-content-info":
      "In order to subscribe and access the files in this offer, you need to be signed in.",
    visibility: {
      title: "Visibility",
      visible: "Publicly visible",
      "not-visible": "Not publicly visible",
    },
    labels: {
      Price: "Price",
      Name: "Name",
      name: "Name",
      Description: "Description",
      description: "Description",
      "Created-at": "Created at",
      "Updated-at": "Updated at",
      "is-publicly-visible": "This offer is publicly visible",
      "show-on-home-page": "Show this offer on home page",
    },
    types: {
      [OfferType.OFFER_TYPE_PHYSICAL]: `Physical`,
      [OfferType.OFFER_TYPE_DIGITAL]: `Digital`,
      [OfferType.OFFER_TYPE_SERVICE]: `Service`,
    },
  },
  media: {
    Title: "File",
    "Title-plural": "Files",
    Download: "Download",
    "Download-now": "Download now",
    "download-file": 'Download the file "{item}"',
    Inventory: "My Subscriptions",
    "download-all": "Download all",
    errors: {
      "still-part-of-an-offer": "The file is still contained in some offers",
    },
    labels: {
      name: "Name",
      file: "File",
      filename: "Filename",
    },
  },
  subscription: {
    Title: "Subscription",
    "Title-plural": "Subscriptions",
    "My-Subscriptions": "My Subscriptions",
    "subscription-to": "Subscription for",
    "already-subscribed": "Already subscribed",
    "payed-until": "Payed until",
    "cancel-subscription": "Cancel Subscription",
    "included-files": "Included files",
    "subscription-configuration": "Subscription Configuration",
    resume: "Resume Subscription",
    "canceled-at": "Canceled at",
    "cancel-to": "Cancel at",
    "no-subscriptions-yet": "No Subscriptions yet ...",
  },
  report: {
    label: "Report / Feedback",
    title: "Report a bug / Submit feedback",
    "link-information":
      "Your feedback was successfully created as GitHub issue. You can check the status of it using the following link.",

    labels: {
      type: "Type",
      title: "Title",
      content: "Message",
    },
    types: {
      [ReportType.REPORT_TYPE_BUG]: "Bug report",
      [ReportType.REPORT_TYPE_FEATURE_REQUEST]: "Feature request",
      [ReportType.REPORT_TYPE_QUESTION]: "Question",
    },
  },
  dashboard: {
    shop: {
      Details: "Details",
      "my-shops": "My Shops",
      "no-shop-yet": "No shops yet ...",
      "create-new-shop": "Create a new shop",
      "name-your-shop": "Give your new shop a name.",
      "edit-name-and-description": "Edit name and description",
      "edit-contact-email": "Edit contact email address",
      "edit-image": "Edit image",
      "delete-image": "Delete image",
      "logo-image": "Logo image",
      "edit-logo": "Edit logo",
      "delete-logo": "Delete logo",
      "edit-theme": "Edit theme",
      "configure-shop": "Configure this shop",
      "delete-this-shop": "Delete this shop",
      "delete-shop-info":
        "Are you sure you want to delete this shop? All data will be deleted and can not be recovered afterwards.",
      "resulting-url": "Resulting URL",
      "duplicate-slug-error":
        "The automatically generated URL-path is already taken. Please provide a different one.",
      "empty-offers-warning-title": "Currently no offers",
      "empty-offers-warning-content":
        "Currently there are no items offered in this shop. If you publish your shop now, it will be empty.",
      logo: {
        "preview-info": "Preview of your shop's navigation bar",
        "delete-confirmation-message":
          "Are you sure you want to delete the current logo?",
        "logo-info":
          "Choose a logo that will be used in your shop's navigation bar. If no image is available, we will use the name of your shop instead.",
      },
      image: {
        label: "Image",
        "for-dark-theme": "For dark theme",
        "use-same-for-dark-mode": "Use same image in dark theme",
        "show-on-home": "Show banner image on home page",
        "show-in-listings": "Show banner image in listings",
        "preview-home-info": "Preview of your shop's home page",
        "preview-listing-info": "Preview of your shop in linstings",
        "delete-confirmation-message":
          "Are you sure you want to delete the current image?",
      },
      stripe: {
        title: "Stripe",
        url: "https://stripe.com/",
        integration: "Stripe Integration",
        "integration-info-left": "Register with",
        "integration-info-right":
          " to set up many popular online payment methods.",
        "start-integration": "Start with",
        "continue-integration": "Continue with",
        "remove-integration": "Remove Stripe integration",
        connected: "Stripe account is connected",
      },
      contact: {
        info: "If you don't use an online payment method, enter an email address here where your customers can reach you.",
      },
      visibility: {
        Title: "Public Visibility",
        Info: "At any point in time you can change the public visibility of your shop. When changing the visibility of this shop, the visibility of all it's offers will be changed aswell.",
        "not-published-yet-info": "Your shop is currently no publicly visible.",
        "hide-this-shop": "Hide this shop",
        "publish-shop": "Publish this shop",
        "publish-notification-title": "Make this shop publicy visible",
        "publish-notification-message-left":
          "Please read and accept the Terms Of Service",
        "publish-notification-message-right": "in order to publish this shop.",
        "publish-anyway": "Publish anyway",
        "unpublish-notification-title":
          "Are you sure you want to hide this shop?",
        "unpublish-notification-message":
          "Hiding this shop will also hide all it's offers.",
      },
      settings: {
        Title: "Settings",
      },
      path: {
        "edit-path": "Edit URL-path",
        "edit-path-info":
          "In case you do not use your own domain, you can edit the URL-path at wich your shop will be accessible.",
      },
      domain: {
        "edit-domain": "Edit domain",
        "edit-domain-info":
          "You can bring your own domain to your shop. After providing the domain please configure the correct DNS record at your domain provider. We will configure our side so it will be accessible afterwards.",
        pending: "Pending verification",
        "pending-information":
          "Please configure the following DNS CNAME record for the specified domain:",
        "pending-information-sample":
          "{item}. CNAME mysite.sited.io.",
        active: "Verified",
      },
    },
    offers: {
      Details: "Details",
      "My-Offers": "My Offers",
      "title-plural": "Offers",
      "create-new-offer": "Create a new offer",
      "name-your-offer": "Give your new offer a name",
      "create-your-first-offer": "Create your first offer",
      "edit-offer": "Edit offer",
      "delete-this-offer": "Delete this offer",
      "add-image": "Add image",
      "edit-price": "Edit Price",
      "public-visibility": "Public Visibility",
      "publish-notification-title": "Make this offer publicy visible",
      "publish-notification-message": "",
      "shop-not-public-title": "Your shop is not yet publicly visible",
      "shop-not-public-message":
        "Your shop is currently not publicly visible. You can proceed publishing this offer, but your shop wont be accessible yet.",
      "go-to-shop-settings": "Shop Settings",
      "unpublish-notification-title":
        "Are you sure you want to hide this offer?",
      "unpublish-notification-message": "",
      "no-offers-yet": "No offers yet ...",
    },
    "shipping-rate": {
      "add-shipping-rate": "Add Shipping Rate",
      "shipping-rates": "Shipping Rate",
      "no-shipping-rates-yet": "No Shipping Rate yet ...",
      country: "Country",
      "to-all-countries": "To all countries",
    },
    media: {
      "my-media": "My Files",
      "create-new-file": "Upload new File",
      "edit-file": "Edit File",
    },
  },
  "main-navigation": {
    actions: {
      "create-shop": "Create your Shop",
      "create-your-own-shop": "Create Your Own Shop",
      "sign-in": "Sign In",
      "sign-out": "Sign Out",
    },
    links: {
      home: "Home",
      "My-Shop": "My Shop",
      shops: "Shops",
      offers: "Offers",
      "My-Offers": "My Offers",
      "My-Subscriptions": "My Subscriptions",
      dashboard: "Dashboard",
      community: "Community",
      "get-started": "Get started",
    },
    settings: {
      Title: "Settings",
      "switch-to-light-mode": "Switch to light theme",
      "switch-to-dark-mode": "Switch to dark theme",
      "change-language": "Language / Sprache",
      report: "Feedback",
    },
  },
  user: {
    authenticating: "Authenticating",
    settings: {
      title: "User Settings",
    },
  },
  "community-page": {
    headline: "Help the project grow!",
    description:
      "## This is planned to be the place where everyone can involve themselves in the project. Currently, the place to give feedback and criticize is the [Issues section](https://github.com/sited_io/Project/issues) on GitHub.",
    posts: {
      title: "Posts",
      "presentation-is-inspired-by":
        "The presentation of the posts is heavily inspired by",
      medium: "Medium",
    },
  },
  "home-page": {
    "search-shops": "Search Shops",
    "search-offers": "Search Offers",
    "get-started-with-your-own-shop": "Get started with your own shop",
  },
  "landing-page": {
    "get-started": "Get started",
    "register-now": "Register Now",
    "Sign-In": "Sign In",
    "to-create-your-own-shop": "to create your own shop",
    "establish-your-online-appearance": "Establish Your Online Appearance",
    "create-your-online-shop-and-build-your-brand": "Create your online shop",
    "offer-your-goods-to-the-people": "Offer your goods to the people",
    "no-costs-until-you-sell": "No costs until you sell",
    "no-strings-attached": "No strings attached",
  },
  imprint: {
    title: "Imprint",
    responsible: {
      title: "Currently responsible",
      name: "Maximilian Temeschinko",
      street: "Thalkirchner Str. 182",
      address_line_1: "81371 Munich",
      address_line_2: "Germany",
    },
    Support: "Support",
  },
  "privacy-policy": {
    title: "Privacy Policy",
  },
  "terms-of-service": {
    title: "Terms of service",
    "accept-tos": "Accept the terms of service",
  },
  "page-not-found": {
    title: "404 Page Not Found",
    "back-to-home": "Back to home page",
  },
  beta: {
    title: "Beta Feature",
    info:
      "This feature is still very new. If you encounter any problems please send us an email at: ",
  },
  "environment-banner": {
    title: "Developement Environment",
    description:
      "This is a developement environment for testing purpose only. For the main site visit: ",
  },
  footer: {
    "powered-by": "Powered by:",
    "main-paragraph":
      "Build your own online shop and offer your goods to the people.",
    "community-paragraph": "Get involved in any aspect of the project.",
  },
};
