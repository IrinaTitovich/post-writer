import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import waitForExpect from "wait-for-expect";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../router";
import { useUsers } from "../../entities/user";
import NavBar from "./NavBar.vue";

vi.stubGlobal(
  "fetch",
  vi.fn(() => {
    // Do nothing
  })
);

describe("NavBar", () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    const el = document.createElement("div");
    el.id = "modal";
    document.body.appendChild(el);

    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory(),
      routes,
    });
  });

  it("renders sign-in and sign up buttons when users not authenticated", () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router, VueQueryPlugin],
      },
    });

    expect(wrapper.find("#sign-up").exists()).toBe(true);
    expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);
  });

  it("renders new post and logout buttons when users authenticated", async () => {
    const usersStore = useUsers();
    usersStore.currentUserId = "1";

    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router, VueQueryPlugin],
      },
    });

    expect(wrapper.find('[data-testid="new-post"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="log-out"]').exists()).toBe(true);

    expect(wrapper.text()).toContain("New Post");
    expect(wrapper.text()).toContain("Log out");

    expect(wrapper.find("a").text()).toBe("New Post");
    expect(wrapper.find("button").text()).toBe("Log out");
  });

  it("after clicking logout button two buttons:sign-in and sing-up appears", async () => {
    const usersStore = useUsers();
    usersStore.currentUserId = "1";

    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router, VueQueryPlugin],
      },
    });

    await wrapper.find('[data-testid="log-out"]').trigger("click");

    await flushPromises();

    await waitForExpect(() => {
      expect(wrapper.find("#sign-up").exists()).toBe(true);
      expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);
    });
  });

  it("sign-in form opens after clicking button sign-in", async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router, VueQueryPlugin],
      },
    });

    const getSignInForm = () =>
      document.body.querySelector('[data-testid="sign-in-form"]');

    expect(getSignInForm()).toBeFalsy();

    await wrapper.find('[data-testid="sign-in"]').trigger("click");

    expect(getSignInForm()).toBeTruthy();
  });

  it("sign-up form opens after clicking button sign-up", async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router, VueQueryPlugin],
      },
    });

    const getSignUpForm = () =>
      document.body.querySelector('[data-testid="sign-up-form"]');

    expect(getSignUpForm()).toBeFalsy();

    await wrapper.find('[data-testid="sign-up"]').trigger("click");

    expect(getSignUpForm()).toBeTruthy();
  });
});
