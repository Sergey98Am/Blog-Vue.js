import * as CheckToken from '../../services/check-token.service'
import * as DropdownSettings from '../../dropdown-settings'

export default {
  name: 'App',
  mounted () {
    CheckToken.checkToken(this)
    DropdownSettings.settings()
  }
}
