function settings () {
  window.onclick = function (e) {
    let target = e.target
    let dropdown = document.getElementsByClassName('dropdown-menu')
    for (let i = 0; i < dropdown.length; i++) {
      if (!target.classList.contains('in-not-hidden')) {
        if (dropdown[i].previousElementSibling === target) {
          // target.nextElementSibling.classList.toggle('active')
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
