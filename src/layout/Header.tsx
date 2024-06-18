import { A, useMatch, useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal, onMount } from "solid-js";

import { MdIcon } from "~/components/assets/MdIcon";
import { Font } from "~/components/content/Font";
import { MdButton } from "~/components/form/MdButton";
import { MdIconButton } from "~/components/form/MdIconButton";
import { TKEYS } from "~/locales";
import { fetchSession, signIn, signOut } from "~/services/auth";
import styles from "./Header.module.scss";
import { NavigationSlider } from "./NavigationSlider";
import { NavigationSliderItem } from "./NavigationSliderItem";

export function Header() {
  const navigate = useNavigate();

  const [session] = createResource(fetchSession);

  const [showHeaderShadow, setShowHeaderShadow] = createSignal(false);
  const [showNavigationSlider, setShowNavigationSlider] = createSignal(false);

  onMount(async () => {
    window.addEventListener("scroll", handleHeaderShadow);
  });

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

  async function handleSignIn() {
    handleCloseNavigationSlider();

    const clientId = import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID;
    const redirectTo = location.href;

    if (!_.isNil(clientId) && !_.isNil(redirectTo)) {
      const signInUrl = await signIn(clientId, redirectTo);
      if (!_.isNil(signInUrl)) {
        location.href = signInUrl.toString();
      } else {
        const signOutUrl = await signOut();
        if (!_.isNil(signOutUrl)) {
          location.href = signOutUrl.toString();
        } else {
          navigate("/");
        }
      }
    }
  }

  return (
    <>
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
        </div>

        <div class={styles.HeaderRight}>
          <div class={styles.Links}>
            <A
              class={styles.Link}
              classList={{
                [styles.LinkActive]: Boolean(useMatch(() => "/")()),
              }}
              href="/"
            >
              Home
            </A>
          </div>

          <Show
            when={session()?.isAuthenticated}
            fallback={
              <MdButton type="filled" square small onClick={handleSignIn}>
                <Font type="body" key={TKEYS.user["sign-in"]} />
              </MdButton>
            }
          >
            <MdIconButton href={"#"}>
              <MdIcon icon="account_circle" />
            </MdIconButton>
          </Show>
        </div>
      </div>

      <NavigationSlider
        show={showNavigationSlider()}
        onClose={handleCloseNavigationSlider}
      >
        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(() => "/")())}
          icon="home"
          label="Home"
          onClick={() => handleNavigate("/")}
        />

        <NavigationSliderItem
          type="body"
          active={Boolean(useMatch(() => "/user")())}
          icon="account_circle"
          label="Profile"
          onClick={() => handleNavigate("#")}
        />
      </NavigationSlider>
    </>
  );
}
