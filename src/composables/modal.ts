import { ref, shallowRef } from "vue";
import { default as SignupForm } from "../components/SignupForm.vue";
import { default as SigninForm } from "../components/SigninForm.vue";

const show = ref(false);
const component = shallowRef();

export function useModal() {
  return {
    component,
    show,
    showModal: (type: "sign-in" | "sign-up") => {
      show.value = true;
      if (type === "sign-in") {
        component.value = SigninForm;
      } else {
        component.value = SignupForm;
      }
    },
    hideModal: () => (show.value = false),
  };
}
