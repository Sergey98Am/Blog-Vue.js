<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8 offset-lg-2">
          <div class="card personal-information">
            <div class="card-header"><h2>My Profile</h2></div>
            <div class="card-body">
              <div v-if="userDetails" class="form">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="name">Name</label>
                    <input type="text" class="form-control"
                           id="name"
                           name="name"
                           v-model="userDetails.name"
                           v-validate="userValidation().name"
                           :class="{ 'is-invalid':errors.has('name') }">
                    <div class="invalid-feedback">
                      <span v-if="errors.has('name')">{{ errors.first('name') }}</span>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="email">Email</label>
                    <input type="text" class="form-control"
                           id="email"
                           name="email"
                           v-model="userDetails.email"
                           :class="{ 'is-invalid':errors.has('email') }"
                           readonly>
                    <div class="invalid-feedback">
                      <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="password">Password</label>
                    <input type="password" class="form-control"
                           id="password"
                           name="password"
                           v-model="user.password"
                           v-validate="userValidation().password"
                           ref="password"
                           :class="{ 'is-invalid':errors.has('password') }">
                    <div class="invalid-feedback">
                      <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="password_confirmation">Password Confirmation</label>
                    <input type="password" class="form-control"
                           id="password_confirmation"
                           name="password_confirmation"
                           v-model="user.password_confirmation"
                           :class="{ 'is-invalid':errors.has('password_confirmation') }">
                    <div class="invalid-feedback">
                      <span v-if="errors.has('password_confirmation')">{{
                          errors.first('password_confirmation')
                        }}</span>
                    </div>
                  </div>
                </div>
                <button @click="changeUserDetails(userDetails)">Update Profile</button>
                <span class="message"><font-awesome-icon :icon="['fas', 'check']"/> {{ message }}</span>
              </div>
            </div>
          </div>
         <div v-if="isLoading" class="loader">
           <div class="spinner-border text-light" role="status">
             <span class="sr-only">Loading...</span>
           </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as userService from '../../services/userService'

export default {
  data () {
    return {
      isLoading: false,
      message: '',
      user: {
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    userDetails () {
      return this.$store.getters.get_user
    }
  },
  methods: {
    userValidation () {
      return userService.userValidation()
    },
    changeUserDetails (user) {
      userService.changeDetails(this, user)
    }
  }
}
</script>

<style scoped>
.loader {
  margin: 10px 0;
  text-align: center;
}

.profile {
  overflow: auto;
  padding: 50px 0;
  margin-top: 55px;
}

.card {
  overflow: hidden;
  padding: 20px;
  border-radius: 5px;
  background: #ffffff;
}

.card-header {
  background: #393939;
  color: #ffffff;
}

.card-header h2 {
  margin: 0;
}

label {
  color: #000000;
}

input {
  border: none;
  border-bottom: 3px solid #000000;
  background: none;
  color: #000000;
}

input:focus {
  color: #000000;
}
input:read-only {
  background-color: gray;
}

.personal-information button {
  border: none;
  border-radius: 5px;
  padding: 10px;
  background: #000000;
  color: #ffffff;
}

.message {
  display: none;
  color: #000000;
}
</style>
