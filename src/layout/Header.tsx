import { useTransContext } from "@mbarzda/solid-i18next";
import { A, useMatch, useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Show, Suspense, createSignal, onMount } from "solid-js";

import { MdIcon } from "~/components/assets/MdIcon";
import { MdIconButton } from "~/components/form/MdIconButton";
import { MdSelect, SelectKey } from "~/components/form/MdSelect";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { TKEYS } from "~/locales";
import { indexPath } from "~/routes";
import { configurationPath } from "~/routes/configuration";
import { offersPath } from "~/routes/offers/(offers)";
import { pagesPath } from "~/routes/pages/(pages)";
import { settingsPath } from "~/routes/settings";
import { userIndexPath } from "~/routes/user/(user)";
import styles from "./Header.module.scss";
import { NavigationSlider } from "./NavigationSlider";
import { NavigationSliderItem } from "./NavigationSliderItem";

type Props = {
  hasWebsite: boolean;
};

export function Header(props: Props) {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { websites, selectedWebsiteId, setSelectedWebsite } =
    useWebsiteContext();

  const [showHeaderShadow, setShowHeaderShadow] = createSignal(false);
  const [showNavigationSlider, setShowNavigationSlider] = createSignal(false);

  onMount(() => {
    window.addEventListener("scroll", handleHeaderShadow);
  });

  function websiteOptions() {
    const _websites = websites();
    if (_.isNil(_websites)) {
      return [];
    }
    return _websites.map((w) => ({
      name: w.name,
      key: w.websiteId,
    }));
  }

  function handleSelectWebsite(selectKey: SelectKey) {
    const foundWebsite = websites()?.find((w) => w.websiteId == selectKey);
    setSelectedWebsite(foundWebsite);
  }

  function handleHeaderShadow() {
    if (!_.isNil(window)) {
      if (window.scrollY === 0) setShowHeaderShadow(false);
      else setShowHeaderShadow(true);
    }
  }

  function handleOpenNavigationSlider() {
    setShowNavigationSlider(true);
  }

  function handleCloseNavigationSlider() {
    setShowNavigationSlider(false);
  }

  function handleNavigate(path: string) {
    handleCloseNavigationSlider();
    navigate(path);
  }

  return (
    <>
      <nav
        class={styles.Header}
        classList={{ [styles.HeaderShadow]: showHeaderShadow() }}
      >
        <div class={styles.HeaderLeft}>
          <Show when={props.hasWebsite}>
            <MdIconButton
              class={styles.MenuIcon}
              onClick={handleOpenNavigationSlider}
            >
              <MdIcon icon="menu" />
            </MdIconButton>
          </Show>
        </div>

        <div class={styles.HeaderRight}>
          <div class={styles.Links}>
            <NavLink
              path={indexPath()}
              label={trans(TKEYS.navigation.pages.Home)}
            />
            <Show when={props.hasWebsite}>
              <NavLink
                path={pagesPath()}
                label={trans(TKEYS.navigation.pages.Pages)}
              />

              <NavLink
                path={offersPath()}
                label={trans(TKEYS.navigation.pages.Offers)}
              />
            </Show>
          </div>

          <MdIconButton href={userIndexPath()}>
            <MdIcon icon="account_circle" />
          </MdIconButton>
        </div>
      </nav>

      <NavigationSlider
        show={showNavigationSlider()}
        onClose={handleCloseNavigationSlider}
      >
        <Suspense>
          <MdSelect
            class={styles.WebsiteSelect}
            type="outlined"
            label="Website"
            options={websiteOptions}
            selected={selectedWebsiteId}
            onChange={handleSelectWebsite}
          />
        </Suspense>

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(indexPath)())}
          icon="home"
          label={trans(TKEYS.navigation.pages.Home)}
          onClick={() => handleNavigate(indexPath())}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(pagesPath)())}
          icon="article"
          label={trans(TKEYS.navigation.pages.Pages)}
          onClick={() => handleNavigate(pagesPath())}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(offersPath)())}
          icon="view_list"
          label={trans(TKEYS.navigation.pages.Offers)}
          onClick={() => handleNavigate(offersPath())}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(configurationPath)())}
          icon="tune"
          label={trans(TKEYS.navigation.pages.Configuration)}
          onClick={() => handleNavigate(configurationPath())}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(settingsPath)())}
          icon="settings"
          label={trans(TKEYS.navigation.pages.Settings)}
          onClick={() => handleNavigate(settingsPath())}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(userIndexPath)())}
          icon="account_circle"
          label={trans(TKEYS.navigation.pages.Profile)}
          onClick={() => handleNavigate(userIndexPath())}
        />
      </NavigationSlider>
    </>
  );
}

type NavLinkProps = {
  path: string;
  label: string;
};

function NavLink(props: NavLinkProps) {
  return (
    <A
      class={styles.Link}
      classList={{
        [styles.LinkActive]: Boolean(useMatch(() => props.path)()),
      }}
      href={props.path}
    >
      {props.label}
    </A>
  );
}
