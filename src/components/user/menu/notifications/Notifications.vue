<template>
  <li class="nav-item dropdown">
    <a class="nav-link px-2 dropdown-toggle" id="navbarDropdown" role="button"
       data-toggle="dropdown" aria-haspopup="true" :aria-expanded="false">
     <span class="icon">
        <font-awesome-icon :icon="['fas', 'bell']"/>
        <span>({{ count }})</span>
     </span>
    </a>
    <div v-if="notifications.length" class="dropdown-menu dropdown-menu-right in-not-hidden" aria-labelledby="navbarDropdown">
      <button @click="notificationsMarkAllAsRead" class="dropdown-item in-not-hidden">Mark all as
        read
      </button>
      <button :to="notification.data.url"
              :style="notification.read_at ? 'background: white' : 'background: skyblue'"
              @click="notificationsMarkAsRead(notification.uuid, notification.read_at, notification.data.url)"
              v-for="notification in notifications"
              :key="notification.uuid" class="dropdown-item">
        {{ notification.data.text }}
      </button>
      <button @click="loadMoreNotifications" class="dropdown-item text-center in-not-hidden">Load more data</button>
    </div>
  </li>
</template>

<script src="./notifications.component.js"></script>
