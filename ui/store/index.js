export const state = () => ({
  profile: {},
})

export const getters = {
  profile: (state) => state.profile,
}

export const actions = {
  async getUsers(){
    const users = await this.$axios.$get('/users')
    this.commit('setUsers', users)
    return users
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  }
}
