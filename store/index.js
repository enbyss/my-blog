export const state = () => ({
  darkmode: true
});

export const mutations = {
  toggleDarkmode(state) {
    state.darkmode = !state.darkmode;
  }
}
