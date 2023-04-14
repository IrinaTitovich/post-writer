import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { computed, defineComponent, ref } from "vue";
import FormInput from "./FormInput.vue";

describe("FormInput", () => {
  it("test validation", async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
      <FormInput
      name="foo"
      type="input"
      v-model="formValue"
      :errorMessage="errorMessage"
      />
      `,
      setup() {
        const formValue = ref("foo");
        const errorMessage = computed(() => {
          if (formValue.value.length > 5) {
            return undefined;
          } else {
            return "Incorrect Length";
          }
        });

        return {
          formValue,
          errorMessage,
        };
      },
    });

    const wrapper = mount(Parent);

    expect(wrapper.find(".is-danger").text()).toBe("Incorrect Length");

    await wrapper.find("input").setValue("foobar");

    expect(wrapper.find(".is-danger").exists()).toBe(false);
  });

  it("renders some errors", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "foo",
        modelValue: "bar",
        errorMessage: "test",
        type: "input",
      },
    });

    expect(wrapper.find(".is-danger").exists()).toBe(true);
  });

  it("renders no errors", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "foo",
        modelValue: "bar",
        status: "",
        type: "input",
      },
    });

    expect(wrapper.find(".is-danger").exists()).toBe(false);
  });
});
