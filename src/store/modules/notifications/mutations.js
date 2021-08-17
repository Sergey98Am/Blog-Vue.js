export default {
  SET_notifications (state, payload) {
    state.notifications = payload
    payload.forEach(notification => {
      state.lastId = notification.uuid
    })
  },
  SET_renderNotifications (state, payload) {
    state.renderNotifications = payload
  },
  SET_moreData (state, payload) {
    payload.forEach(notification => {
      state.notifications.push(notification)
      state.lastId = notification.uuid
    })
  },
  SET_notification (state, payload) {
    state.notifications.unshift(payload)
  },
  SET_count (state, payload) {
    state.count = payload
  },
  increment_count (state) {
    state.count++
  },
  allAsRead (state) {
    let notification
    for (notification of state.notifications) {
      if (!notification.read_at) {
        notification.read_at = true
      }
    }
    state.count = 0
  },
  asRead (state, notificationId) {
    let notification
    for (notification of state.notifications) {
      if (notification.uuid === notificationId) {
        notification.read_at = true
      }
    }
    state.count = state.count - 1
  },
  SET_notificationsLastId (state) {
    state.notifications.forEach(notification => {
      state.lastId = notification.uuid
    })
  },
  postNotifications (state, postId) {
    state.notifications = state.notifications.filter((notification) => {
      return postId !== notification.post_id
    })
  }
}
