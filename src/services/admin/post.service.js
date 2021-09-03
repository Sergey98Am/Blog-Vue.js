import authAxios from '../../../config/authAxios'

function check (target, post) {
  let checked = post.checked ? 1 : 0
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', post.id)
  formData.append('checked', checked)
  authAxios.post('/admin/check-post/' + post.id, formData).then(response => {
    post.checked = response.data.checkPost.checked
    let checked = target.closest('.form-check').querySelector('.checked')
    checked.style.display = 'inline-block'
    setTimeout(function () {
      checked.style.display = 'none'
    }, 2000)
  }).catch(error => error)
}

export {
  check
}
