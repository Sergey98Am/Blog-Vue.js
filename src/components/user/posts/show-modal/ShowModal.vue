<template>
  <transition name="fade">
    <div class="modal" style="display: block" v-show="modal" @click.self="closeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Show Post</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="post text-center">
              <div class="image-area">
                <div class="image">
                  <img v-if="image" :src="'http://blog.loc/images/' + image">
                </div>
              </div>
              <h2>{{ title }}</h2>
              <p>{{ description }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./show-modal.component.js"></script>
<style src="./show-modal.css" scoped></style>
