let coverList = [];

const lockSwitch = () => {
  document.body.style.overflowY = coverList.length ? "hidden" : "auto";
};

export default {
  bind: function (el, binding) {
    if (el && binding.value !== false) coverList = [...coverList, el];
    lockSwitch();
  },
  update: function (el, binding) {
    if (binding.value === undefined) return;
    if (el && binding.value) coverList = [...coverList, el];
    else coverList = coverList.filter((element) => element !== el);
    lockSwitch();
  },
  unbind: function (el) {
    if (el) coverList = coverList.filter((element) => element !== el);
    lockSwitch();
  }
};
