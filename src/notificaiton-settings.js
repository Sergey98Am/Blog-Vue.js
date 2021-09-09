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
  showNotificationCountOnTab
}
