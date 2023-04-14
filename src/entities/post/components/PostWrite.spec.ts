import { mount } from "@vue/test-utils";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { describe, beforeEach, it, expect } from "vitest";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../../../app/router";
import { useUsers } from "../../user";
import PostWrite from "./PostWrite.vue";

describe("PostWrite", () => {
  let pinia: Pinia;
  let router: Router;
  const CURRENT_USER = "1";

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    const userStore = useUsers();
    userStore.currentUserId = CURRENT_USER;

    router = createRouter({
      history: createWebHistory(),
      routes,
    });
  });

  it("renders a post using markdown", async () => {
    const wrapper = mount(PostWrite, {
      global: {
        plugins: [pinia, router, VueQueryPlugin],
      },
      props: {
        post: {
          id: "145",
          title: "",
          created: "",
          authorId: CURRENT_USER,
          markdown: "",
          html: "",
        },
      },
    });

    const input = wrapper.find<HTMLDivElement>("#contenteditable");

    input.element.innerHTML = "# Title";

    await input.trigger("input");

    expect(wrapper.text()).toContain("Title");
  });

  it("emits a post correctly", () => {
    return new Promise<void>((resolve) => {
      const wrapper = mount(PostWrite, {
        global: {
          plugins: [pinia, router],
        },
        props: {
          post: {
            id: "145",
            title: "",
            created: "",
            authorId: CURRENT_USER,
            markdown: "",
            html: "",
          },
        },
      });

      const input = wrapper.find<HTMLDivElement>("#contenteditable");

      input.element.innerHTML = "# Title";
      input.trigger("input");

      setTimeout(async () => {
        await wrapper.find("button").trigger("click");

        expect(wrapper.emitted().submit[0]).toMatchInlineSnapshot(`
          [
            {
              "authorId": "1",
              "created": "",
              "html": "",
              "id": "145",
              "markdown": "",
              "title": "",
            },
          ]
        `);

        expect(wrapper.emitted().submit[0]).toStrictEqual([
          {
            id: "145",
            title: "",
            created: "",
            authorId: "1",
            markdown: "",
            html: "",
          },
        ]);

        resolve();
      }, 300);
    });
  });
});
