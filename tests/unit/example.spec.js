import { shallowMount } from "@vue/test-utils";
import Error from "@/components/Error.vue";

describe("Error.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Error, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
    expect(wrapper.classes).toContain("alert-danger");
  });
});
