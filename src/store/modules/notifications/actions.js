import authAxios from '../../../../config/authAxios'

export default {
  getNotifications ({commit}) {
    authAxios.get('/user-notifications').then(response => {
      commit('SET_notifications', response.data.notifications)
    }).catch(error => error)
  },
  renderNotifications ({commit}) {
    commit('SET_renderNotifications', true)
  },
  removeNotifications ({commit}) {
    commit('SET_renderNotifications', false)
  },
  getUnreadNotificationsCount ({commit}) {
    authAxios.get('/unread-notifications-count').then(response => {
      commit('SET_count', response.data.count)
    }).catch(error => error)
  },
  echo ({commit}, payload) {
    let notification = payload.notification
    let unread = {
      uuid: notification.id,
      read_at: null,
      data: {url: notification.url, text: notification.text},
      post_id: notification.post_id,
      created_at: Date.now()
    }
    commit('SET_notification', unread)
    commit('increment_count')
  },
  markAllAsRead ({commit, state}) {
    return new Promise((resolve, reject) => {
      if (state.count) {
        authAxios.get('/mark-all-as-read').then(() => {
          commit('allAsRead')
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  markAsRead ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      let self = payload.self
      let notificationId = payload.notificationId
      let url = payload.url
      authAxios.get('/mark-as-read/' + notificationId).then(() => {
        commit('asRead', notificationId)
        self.$router.push(url)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadMore ({commit, state}) {
    let formData = new FormData()
    formData.append('id', state.lastId)
    authAxios.post('/load-more-notifications', formData).then(response => {
      commit('SET_moreData', response.data.notifications)
    }).catch(error => error)
  },
  notificationsLastId ({commit}) {
    commit('SET_notificationsLastId')
  },
  postNotifications ({commit}, payload) {
    let postId = payload.postId
    commit('postNotifications', postId)
  }
}
