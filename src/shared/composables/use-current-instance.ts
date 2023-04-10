import { getCurrentInstance } from "vue";

export function useCurrentInstance() {
  const vm = getCurrentInstance()?.proxy;

  if (!vm) {
    throw new Error(
      "useCurrentInstance hook can only be used inside setup() function"
    );
  }

  return {
    vm,
  };
}
