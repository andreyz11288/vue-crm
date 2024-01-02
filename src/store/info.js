import firebase from 'firebase/compat/app'
import localizeFilter from "@/filter/localize.filter";
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
                console.log(e)
                commit('setError', e)
                throw e
            }
        },
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (e) {
                console.log(e)
                commit('setError', e)
                throw e
            }
        },
        async updateEmail({commit, getters, dispatch}, data) {
            try {
                await firebase.auth().currentUser.reauthenticateWithCredential(
                    await firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, data.pass)
                ).then(()=>{
                    firebase.auth().currentUser.verifyBeforeUpdateEmail(data.email).then(()=>{
                        firebase.auth().signOut()
                        data.router.push('/login')
                        M.toast({html: localizeFilter.localizeFilter('To verify your mail, an email has been sent to the specified email.')})
                    })
                }).catch((e)=>{
                    console.log(e.code)
                    if (e.code === 'auth/missing-password') {
                        M.toast({html: localizeFilter.localizeFilter('Enter password')})
                    }
                    if (e.code === 'auth/invalid-credential') {
                        M.toast({html: localizeFilter.localizeFilter('Incorrect password')})
                    }
                })
            } catch (e) {
                console.log(e.code)
                commit('setError', e)
                throw e
            }
        },
        async fetchEmail({commit}) {
            try {
                const auth = await firebase.auth()
                if (auth.currentUser) {
                    return  auth.currentUser.email
                }
            } catch (e) {
                console.log(e.code)
                commit('setError', e)
                throw e
            }
        },
        async fetchAllUsers({commit}) {
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
