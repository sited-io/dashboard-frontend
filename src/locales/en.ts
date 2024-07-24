import { TKEYS } from ".";

export const EN: typeof TKEYS = {
  lang: "en",
  common: {
    "per-or-every": "{count, plural, =1 {every} other {every} }",
  },
  form: {
    "critical-settings": "Critical Settings",
    action: {
      Create: "Create",
      Update: "Update",
      Save: "Save",
      Close: "Close",
      Cancel: "Cancel",
      Delete: "Delete",
      "Confirm-Deletion?": "Confirm Deletion?",
      "Are-you-sure-you-want-to-delete-the-item":
        'Are you sure you want to delete the {item}: "{name}"?',
    },
    errors: {
      "wrong-type": "Wrong file type. Currently supported: {types}",
      "item-too-large": "{item} is too large. maximum: {maxSize}",
    },
  },
  navigation: {
    back: "Back",
    redirecting: "Redirecting",
    pages: {
      Home: "Home",
      Pages: "Pages",
      Configuration: "Configuration",
      Settings: "Settings",
      Offers: "Offers",
      Profile: "Profile",
      "Offer-Images": "Edit Images",
      "Offer-Media": "Edit Files",
    },
  },
  user: {
    "sign-in": "Sign In",
    "sign-out": "Sign Out",
    register: "Register",
    "sign-in-or-register": "Please sign in or register to access the dashboard",
  },
  websites: {
    website: "Website",
    "create-website": "Create a new Website",
    "no-website-information": "Create your first website to get started!",
    "delete-website": "Delete this Website",
    labels: {
      name: "Name",
      pages: "Pages",
      domains: "Domains",
    },
  },
  customization: {
    labels: {
      "primary-color": "Primary Color",
      "logo-image": "Logo",
    },
  },
  page: {
    page: "page",
    "create-page": "Create a new Page",
    "edit-page-settings": "Edit Page Settings",
    "home-page": "Home Page",
    "no-pages-yet": "No pages yet ...",
    labels: {
      title: "Title",
      "page-type": "Page Type",
      "is-home-page": "Is Homepage",
    },
    placeholders: {
      title: "Home",
    },
    "page-type": {
      "0": "UNSPECIFIED",
      "1": "Static",
      "2": "Shop",
    },
  },
  domain: {
    domain: "Domain",
    "add-domain": "Add a domain",
    "domain-status": {
      "0": "UNSPECIFIED",
      "1": "Internal",
      "2": "Pending",
      "3": "Active",
    },
    labels: {
      domain: "domain",
    },
  },
  shop: {
    "no-shop-yet": "No shops yet ...",
    stripe: {
      integration: "Stripe Integration",
      url: "https://stripe.com/",
      title: "Stripe",
      "integration-info-left": "Register with",
      "integration-info-right":
        " to set up many popular online payment methods.",
      "start-integration": "Start with",
      "continue-integration": "Continue with",
      connected: "Stripe account is connected",
    },
  },
  offers: {
    offer: "Offer",
    "create-offer": "Create a new Offer",
    "delete-offer": "Delete this Offer",
    "edit-details": "Edit Details",
    "edit-media": "Edit Media",
    "offer-type": {
      "0": "UNDEFINED",
      "1": "Physical",
      "2": "Digital",
      "3": "Service",
    },
    "is-active-info":
      "This offer is published and available for your customers to discover.",
    "is-not-active-info":
      "This offer is currently in draft mode and not discoverable.",
    "make-active": "Publish this offer to make it visible to your customers",
    "make-inactive":
      "Set this offer as draft to make it not visible to your customers",
    visibility: {
      "0": "Draft",
      "1": "Published",
    } as Record<string, string>,
    labels: {
      name: "name",
      image: "image",
      type: "type",
    },
  },
  images: {
    "add-image": "Add Image",
    "remove-image": "Remove Image",
  },
  price: {
    "decimal-point": ".",
    "days-free": "{periodDays, plural, =1 {day} other {days}} free",
    "update-price": "Update Price",
    "price-type": {
      "0": "UNDEFINED",
      "1": "One time",
      "2": "Recurring",
    },
    currency: {
      "0": "UNDEFINED",
      "1": "EUR",
    },
    "recurring-interval": {
      "0": `UNDEFINED`,
      "1": `{intervalCount, plural, =1 {day} other {days} }`,
      "2": `{intervalCount, plural, =1 {week} other {weeks} }`,
      "3": `{intervalCount, plural, =1 {month} other {months} }`,
      "4": `{intervalCount, plural, =1 {year} other {years} }`,
    },
    labels: {
      price: "Price",
      "price-type": "Type",
      "billing-period": "Billing period",
    },
  },
  "shipping-rate": {
    "shipping-rate": "Shipping Rate",
    "update-shipping-rate": "Update Shipping Rate",
  },
  media: {
    media: "File",
    "upload-media": "Upload File",
    "edit-file": "Edit File",
    labels: {
      name: "Name",
      filename: "Filename",
      ordering: "Ordering",
    },
  },
};
