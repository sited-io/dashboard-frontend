import {
  A,
  PathMatch,
  useMatch,
  useNavigate,
  useParams,
} from "@solidjs/router";
import _ from "lodash";
import {
  Suspense,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from "solid-js";

import { MdIcon } from "~/components/assets/MdIcon";
import { MdIconButton } from "~/components/form/MdIconButton";
import { MdSelect, SelectKey } from "~/components/form/MdSelect";
import { userIndexPath } from "~/routes/user";
import { fetchSession } from "~/services/auth";
import { websiteService } from "~/services/website";
import styles from "./Header.module.scss";
import { NavigationSlider } from "./NavigationSlider";
import { NavigationSliderItem } from "./NavigationSliderItem";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { Title } from "@solidjs/meta";
import { indexPath } from "~/routes";
import { offersPath } from "~/routes/offers";
import { configurationPath } from "~/routes/configuration";
import { settingsPath } from "~/routes/settings";
import { pagesPath } from "~/routes/pages/index";
import { createWebsitePath } from "~/routes/create-website";

export function Header() {
  const navigate = useNavigate();

  const { setWebsites, selectedWebsite, setSelectedWebsite } =
    useWebsiteContext();

  const [session] = createResource(fetchSession);

  const [websites, { refetch }] = createResource(
    () => session()?.userId,
    async (userId: string) => websiteService.listWebsites({ userId })
  );

  const [showHeaderShadow, setShowHeaderShadow] = createSignal(false);
  const [showNavigationSlider, setShowNavigationSlider] = createSignal(false);

  onMount(() => {
    window.addEventListener("scroll", handleHeaderShadow);
  });

  createEffect(async () => {
    await refetch();
    const _websites = websites();
    setWebsites(_websites);
    if (
      _.isNil(selectedWebsite()) &&
      !_.isNil(_websites) &&
      !_.isEmpty(_websites)
    ) {
      setSelectedWebsite(_.first(_websites));
    }
  });

  function websiteOptions() {
    return (
      websites()?.map((w) => ({
        name: w.name,
        key: w.websiteId,
      })) || []
    );
  }

  function handleSelectWebsite(selectKey: SelectKey) {
    if (selectKey === "create") {
      navigate(createWebsitePath);
      setSelectedWebsite(undefined);
    } else {
      const foundWebsite = websites()?.find((w) => w.websiteId == selectKey);
      setSelectedWebsite(foundWebsite);
    }
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
      <Title>Dashboard - {selectedWebsite()?.name} - sited.io</Title>

      <div
        class={styles.Header}
        classList={{ [styles.HeaderShadow]: showHeaderShadow() }}
      >
        <div class={styles.HeaderLeft}>
          <MdIconButton
            class={styles.MenuIcon}
            onClick={handleOpenNavigationSlider}
          >
            <MdIcon icon="menu" />
          </MdIconButton>

          <MdSelect
            class={styles.WebsiteSelect}
            type="outlined"
            label="Website"
            options={websiteOptions()}
            selected={selectedWebsite()?.websiteId}
            onChange={handleSelectWebsite}
          />
        </div>

        <div class={styles.HeaderRight}>
          <div class={styles.Links}>
            <NavLink path={indexPath} label="Home" />
            <NavLink path={pagesPath} label="Pages" />
            {/* <NavLink path={offersPath} label="Offers" />
            <NavLink path={configurationPath} label="Configuration" />
            <NavLink path={settingsPath} label="Settings" /> */}
          </div>

          <MdIconButton href={userIndexPath}>
            <MdIcon icon="account_circle" />
          </MdIconButton>
        </div>
      </div>

      <NavigationSlider
        show={showNavigationSlider()}
        onClose={handleCloseNavigationSlider}
      >
        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(() => indexPath)())}
          icon="home"
          label="Home"
          onClick={() => handleNavigate(indexPath)}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(() => pagesPath)())}
          icon="article"
          label="Pages"
          onClick={() => handleNavigate(pagesPath)}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(() => configurationPath)())}
          icon="tune"
          label="Configuration"
          onClick={() => handleNavigate(configurationPath)}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(() => settingsPath)())}
          icon="settings"
          label="Settings"
          onClick={() => handleNavigate(settingsPath)}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(() => offersPath)())}
          icon="view_list"
          label="Offers"
          onClick={() => handleNavigate(offersPath)}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(() => userIndexPath)())}
          icon="account_circle"
          label="Profile"
          onClick={() => handleNavigate(userIndexPath)}
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
