import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { computed, defineComponent, ref } from "vue";
import FormInput from "../../../components./entities/user/components/FormInput.vue";

describe("FormInput", () => {
  it("test validation", async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
      <FormInput
      name="foo"
      type="input"
      v-model="formValue"
      :status="status"
      />
      `,
      setup(props, ctx) {
        const formValue = ref("foo");
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true,
            };
          } else {
            return {
              valid: false,
              message: "Incorrect Length",
              showError: true,
            };
          }
        });

        return {
          formValue,
          status,
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
        status: {
          valid: false,
          message: "error",
          showError: true,
        },
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
        status: {
          valid: true,
        },
        type: "input",
      },
    });

    expect(wrapper.find(".is-danger").exists()).toBe(false);
  });
});
