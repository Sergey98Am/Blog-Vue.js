<template>
  <li class="nav-item dropdown">
    <a class="nav-link px-2" id="navbarDropdown" role="button"
       data-toggle="dropdown" aria-haspopup="true" :aria-expanded="false">
     <span class="icon">
        <font-awesome-icon :icon="['fas', 'bell']"/>
       <span v-if="count" class="notification-badge">{{ count.length > 99 ? 99 + '+' : count }}</span>
     </span>
    </a>
    <div v-if="notifications.length" class="dropdown-menu dropdown-list dropdown-menu-right" aria-labelledby="navbarDropdown">
      <button @click="notificationsMarkAllAsRead" class="dropdown-item is-not-hidden">Mark all as
        read
      </button>
      <button :to="notification.data.url"
              :style="notification.read_at ? 'background: white' : 'background: skyblue'"
              @click="notificationsMarkAsRead(notification.uuid, notification.read_at, notification.data.url)"
              v-for="notification in notifications"
              :key="notification.uuid" class="dropdown-item">
        <span>{{ notification.data.text }}</span>
        <span class="created_at"><timeago :datetime="notification.created_at" :auto-update="60"></timeago></span>
      </button>
      <button v-if="notifications && notifications.length >= 10" @click="loadMoreNotifications" class="dropdown-item text-center is-not-hidden">Load more data</button>
    </div>
  </li>
</template>

<script src="./notifications.component.js"></script>
<style>
.notification-badge {
  min-width: 20px;
  height: 20px;
  text-align: center;
  border-radius: 50%;
  background: red;
  top: 0;
  right: -2px;
  position: absolute;
  font-size: 14px;
}
</style>
