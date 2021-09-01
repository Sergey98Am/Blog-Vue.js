import * as NotificationService from '@/services/notification.service'

export default {
  computed: {
    loggedIn () {
      return NotificationService.loggedIn(this)
    },
    notifications () {
      return NotificationService.userNotifications(this)
    },
    count () {
      return NotificationService.count(this)
    }
  },
  mounted () {
    if (this.loggedIn) {
      NotificationService.getNotifications(this)
      NotificationService.getUnreadNotificationsCount(this)
      NotificationService.echo(this)
    }
  },
  methods: {
    notificationsMarkAllAsRead () {
      NotificationService.markAllAsRead(this)
    },
    notificationsMarkAsRead (notificationId, readAt, url) {
      NotificationService.markAsRead(notificationId, readAt, url, this)
    },
    loadMoreNotifications () {
      NotificationService.moreNotifications(this)
    }
  }
}
