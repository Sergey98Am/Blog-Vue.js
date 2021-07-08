<template>
  <div class="register align-middle">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2">
          <div class="register-form">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="name">Name</label>
                <input type="text" class="form-control"
                       id="name"
                       name="name"
                       v-model="user.name"
                       v-validate="registerValidation().name"
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
                       v-model="user.email"
                       v-validate="registerValidation().email"
                       :class="{ 'is-invalid':errors.has('email') }">
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
                       v-validate="registerValidation().password"
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
                       v-validate="registerValidation().password_confirmation"
                       :class="{ 'is-invalid':errors.has('password_confirmation') }">
                <div class="invalid-feedback">
                  <span v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
                </div>
              </div>
              <div class="form-group col-md-12 form-rememberMe">
                <input type="checkbox" class="form-rememberMe-input" id="exampleRememberMe1" v-model="user.remember_me">
                <label class="form-check-label" for="exampleRememberMe1">Remember Me</label>
              </div>
            </div>
            <button type="submit" class="submit-register" @click="registerRequest">Register</button>
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

<script src="./register.view.js"></script>
<style src="./register.css" scoped></style>
