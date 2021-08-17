export default {
  computed: {
    loggedIn () {
      return this.$store.getters.get_loggedIn
    },
    notifications () {
      return this.$store.getters.get_notifications
    },
    count () {
      return this.$store.getters.get_count
    }
  },
  mounted () {
    if (this.loggedIn) {
      this.$store.dispatch('getNotifications')
      this.$store.dispatch('getUnreadNotificationsCount')
      this.$store.dispatch('echo')
    }
  },
  methods: {
    notificationsMarkAllAsRead () {
      this.$store.dispatch('markAllAsRead')
    },
    notificationsMarkAsRead (notificationId, readAt, url) {
      if (readAt) {
        let path = this.$route.fullPath
        if (url !== path) {
          this.$router.push(url)
        }
      } else {
        this.$store.dispatch('markAsRead', {self: this, notificationId: notificationId, url: url})
      }
    },
    loadMoreNotifications () {
      this.$store.dispatch('loadMore')
    }
  }
}
