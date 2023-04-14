import { DOMWrapper, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import waitForExpect from "wait-for-expect";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../../../app/router";
import SignForm from "./SignForm.vue";

describe("SignForm", () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory(),
      routes,
    });
  });

  it("renders correct fields", () => {
    const wrapper = mount(SignForm, {
      global: {
        plugins: [pinia, router],
      },
    });

    expect(wrapper.find('[data-testid="sign-form"]').exists()).toBe(true);

    expect(wrapper.find('[data-testid="user-name"]').exists()).toBe(true);

    expect(wrapper.find('[data-testid="user-password"]').exists()).toBe(true);
  });

  const setIncorrectValueRequired = async (input: DOMWrapper<Element>) =>
    await input.setValue("");

  const setIncorrectValueMin = async (input: DOMWrapper<Element>) =>
    await input.setValue("12");

  const setIncorrectValueMax = async (input: DOMWrapper<Element>) =>
    await input.setValue("123456789012345612121211");

  const setCorrectValue = async (input: DOMWrapper<Element>) =>
    input.setValue("1234567890");

  // eslint-disable-next-line @typescript-eslint/ban-types
  async function expectAsync(callback: () => void) {
    // required by library Veevalidate
    // https://vee-validate.logaretm.com/v4/guide/testing/
    await flushPromises();
    await waitForExpect(callback);
  }

  it("renders username validation message IsRequired", async () => {
    const wrapper = mount(SignForm, {
      global: {
        plugins: [pinia, router],
      },
    });

    const usernameField = wrapper.find('[data-testid="user-name"]');

    await setCorrectValue(usernameField.find("#Username"));

    await expectAsync(() => {
      expect(usernameField.find(".is-danger").exists()).toBe(false);
    });

    await setIncorrectValueRequired(usernameField.find("#Username"));

    await expectAsync(() => {
      expect(usernameField.find(".is-danger").exists()).toBe(true);

      expect(usernameField.find(".is-danger").text()).toBe(
        "This field is required"
      );
    });
  });

  it("renders username validation message MINMAX", async () => {
    const wrapper = mount(SignForm, {
      global: {
        plugins: [pinia, router],
      },
    });

    const usernameField = wrapper.find('[data-testid="user-name"]');

    await setCorrectValue(usernameField.find("#Username"));

    await expectAsync(() => {
      expect(usernameField.find(".is-danger").exists()).toBe(false);
    });

    await setIncorrectValueMin(usernameField.find("#Username"));

    await expectAsync(() => {
      expect(usernameField.find(".is-danger").text()).toBe(
        "This field must be between 3 and 15 characters"
      );
    });

    await setIncorrectValueMax(usernameField.find("#Username"));

    await expectAsync(() => {
      expect(usernameField.find(".is-danger").text()).toBe(
        "This field must be between 3 and 15 characters"
      );
    });
  });

  it("renders password validation message IsRequired", async () => {
    const wrapper = mount(SignForm, {
      global: {
        plugins: [pinia, router],
      },
    });

    const userpassField = wrapper.find('[data-testid="user-password"]');

    await setCorrectValue(userpassField.find("#Password"));

    await expectAsync(() => {
      expect(userpassField.find(".is-danger").exists()).toBe(false);
    });

    await setIncorrectValueRequired(userpassField.find("#Password"));

    await expectAsync(() => {
      expect(userpassField.find(".is-danger").exists()).toBe(true);

      expect(userpassField.find(".is-danger").text()).toBe(
        "This field is required"
      );
    });
  });

  it("renders userpass validation message MINMAX", async () => {
    const wrapper = mount(SignForm, {
      global: {
        plugins: [pinia, router],
      },
    });

    const userpassField = wrapper.find('[data-testid="user-password"]');

    await setCorrectValue(userpassField.find("#Password"));

    await expectAsync(() => {
      expect(userpassField.find(".is-danger").exists()).toBe(false);
    });

    await setIncorrectValueMin(userpassField.find("#Password"));

    await expectAsync(() => {
      expect(userpassField.find(".is-danger").text()).toBe(
        "This field must be between 10 and 20 characters"
      );
    });

    await setIncorrectValueMax(userpassField.find("#Password"));

    await expectAsync(() => {
      expect(userpassField.find(".is-danger").text()).toBe(
        "This field must be between 10 and 20 characters"
      );
    });
  });

  it("renders submit button state: disabled when validation is incorrect", async () => {
    const wrapper = mount(SignForm, {
      global: {
        plugins: [pinia, router],
      },
    });
    const btnElement = wrapper.find("button").element;

    await expectAsync(() => {
      expect(btnElement.disabled).toBe(true);
    });

    const userpassFieldInput = wrapper
      .find('[data-testid="user-password"]')
      .find("#Password");
    const usernameFieldInput = wrapper
      .find('[data-testid="user-name"]')
      .find("#Username");

    await setCorrectValue(userpassFieldInput);
    await setCorrectValue(usernameFieldInput);

    await expectAsync(() => {
      expect(btnElement.disabled).toBe(false);
    });

    await usernameFieldInput.setValue("12");

    await setIncorrectValueMin(usernameFieldInput);

    await expectAsync(() => {
      expect(btnElement.disabled).toBe(true);
    });

    await setCorrectValue(usernameFieldInput);
    await setIncorrectValueMin(userpassFieldInput);

    await expectAsync(() => {
      expect(btnElement.disabled).toBe(true);
    });
  });

  it("click submit button", async () => {
    const wrapper = mount(SignForm, {
      global: {
        plugins: [pinia, router],
      },
    });

    const userpassFieldInput = wrapper
      .find('[data-testid="user-password"]')
      .find("#Password");
    const usernameFieldInput = wrapper
      .find('[data-testid="user-name"]')
      .find("#Username");

    await setCorrectValue(usernameFieldInput);
    await setCorrectValue(userpassFieldInput);

    await expectAsync(() => {
      wrapper.trigger("submit.prevent");
    });

    const emittedPayload = wrapper.emitted().submit[0];

    expect(emittedPayload).toEqual([
      {
        username: "1234567890",
        password: "1234567890",
      },
    ]);
  });
});
