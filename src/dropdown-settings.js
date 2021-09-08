function settings () {
  window.onclick = function (e) {
    let target = e.target
    let dropdown = document.getElementsByClassName('dropdown-list')
    for (let i = 0; i < dropdown.length; i++) {
      if (!target.closest('.is-not-hidden')) {
        if (dropdown[i].previousElementSibling === target) {
          target.nextElementSibling.classList.toggle('show')
        } else {
          dropdown[i].className = dropdown[i].className.replace(/\bshow\b/, '')
        }
      }
    }
  }
}

export {
  settings
}
