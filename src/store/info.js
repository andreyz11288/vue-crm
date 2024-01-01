import firebase from 'firebase/compat/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async updateInfo({dispatch, commit, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdate}
                const info = await firebase.database().ref(`/users/${uid}/info`).update(toUpdate)
                commit('setInfo', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateEmail({dispatch, commit}, data) {
            try {
                const auth = firebase.auth()
                await auth.currentUser.verifyBeforeUpdateEmail(data.email).then(()=>{
                    firebase.auth().signOut()
                    data.router.push('/login')
                    M.toast({html: 'To verify your mail, an email has been sent to the specified email.'})
                }).catch((e)=>{
                    console.log(e)
                })
            } catch (e) {
                console.log(e)
                commit('setError', e)
                throw e
            }
        },
        async fetchEmail() {
            try {
                const auth = await firebase.auth()
                return auth.currentUser.email
            } catch (e) {
                throw e
            }
        },
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchAllUsers({dispatch, commit}) {
            try {
                let allUsers = [];
                    (await firebase.database().ref(`/users/`).once('value'))
                    .forEach(cur => {
                        allUsers.push(cur.val())
                    })
                return allUsers
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        info: s => s.info
    }
}
