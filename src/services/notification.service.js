function loggedIn (self) {
  return self.$store.getters.get_loggedIn
}

function userNotifications (self) {
  return self.$store.getters.get_notifications
}

function count (self) {
  return self.$store.getters.get_count
}

function getNotifications (self) {
  self.$store.dispatch('getNotifications')
}

function getUnreadNotificationsCount (self) {
  self.$store.dispatch('getUnreadNotificationsCount')
  showNotificationCountOnTab(self)
}

function echo (self) {
  let userId = self.$store.getters.get_user.id
  window.Echo.private('App.Models.User.' + userId).notification((notification) => {
    self.$store.dispatch('echo', {notification: notification})
    showNotificationCountOnTab(self)
  })
}

function markAllAsRead (self) {
  self.$store.dispatch('markAllAsRead').then(() => {
    showNotificationCountOnTab(self)
  })
}

function markAsRead (notificationId, readAt, url, self) {
  if (readAt) {
    let path = self.$route.fullPath
    if (url !== path) {
      self.$router.push(url)
    }
  } else {
    self.$store.dispatch('markAsRead', {self: self, notificationId: notificationId, url: url}).then(() => {
      showNotificationCountOnTab(self)
    })
  }
}

function moreNotifications (self) {
  self.$store.dispatch('loadMore')
}

function showNotificationCountOnTab (self) {
  const pattern = /^\(\d+\)/
  let count = self.$store.getters.get_count
  if (count === 0 || pattern.test(document.title)) {
    document.title = document.title.replace(pattern, count === 0 ? '' : '(' + count + ')')
  } else {
    document.title = '(' + count + ') ' + document.title
  }
}

export {
  loggedIn,
  userNotifications,
  count,
  getNotifications,
  getUnreadNotificationsCount,
  echo,
  markAllAsRead,
  markAsRead,
  moreNotifications,
  showNotificationCountOnTab
}
