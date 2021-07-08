<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div class="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control"
                     id="email"
                     name="email"
                     v-model="email"
                     v-validate="loginValidation().email"
                     :class="{ 'is-invalid':errors.has('email') }">
              <div class="invalid-feedback">
                <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control"
                     id="password"
                     name="password"
                     v-model="password"
                     v-validate="loginValidation().password"
                     ref="password"
                     :class="{ 'is-invalid':errors.has('password') }">
              <div class="invalid-feedback">
                <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="form-group form-rememberMe">
              <input type="checkbox" class="form-rememberMe-input" id="exampleRememberMe1" v-model="remember_me">
              <label class="form-check-label" for="exampleRememberMe1">Remember Me</label>
            </div>
            <button type="submit" class="submit-login" @click="loginRequest">Login</button>
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

<script src="./login.view.js"></script>
<style src="./login.css" scoped></style>
