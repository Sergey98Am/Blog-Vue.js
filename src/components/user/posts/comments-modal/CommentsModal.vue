<template>
  <transition name="fade">
    <div class="modal" style="display: block" v-show="modal" @click.self="closeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Comments ({{ postComments.title }})</h5>
            <button @click="closeModal" type="button" class="close">
              <span>&times;</span>
            </button>
          </div>
          <div class="form">
            <div class="modal-body">
              <div class="write-comment">
                <div class="form-group">
                <textarea v-model="comment" class="form-control" rows="3"
                          placeholder="Write a comment..."></textarea>
                  <button @click="addComment">Add Comment</button>
                </div>
              </div>
              <div class="comment-list">
                <div v-for="comment in postComments.comments" :key="comment.id" class="comment">
                  <span>{{ comment.user.name }}</span>
                  <span class="date"><timeago :datetime="comment.created_at" :auto-update="60"></timeago></span>
                  <div class="comment-container">
                    <div class="typing-mode" v-if="updateCommentId===comment.id">
                      <div class="form-group">
                        <textarea v-model="comment.comment" rows="2" class="form-control"
                                  placeholder="Edit a comment..."></textarea>
                        <button @click="updateComment(comment)">Update</button>
                        <button @click="closeComment(comment)">&times;</button>
                      </div>
                    </div>
                    <p v-else>{{ comment.comment }}</p>
                    <div class="items">
                      <button v-if="comment.user_id !== $store.getters.get_user.id"
                              @click="openReplyTypingMode(comment)">Reply
                      </button>
                      <div v-else>
                        <button @click="openUpdateCommentTypingMode(comment)" v-if="updateCommentId!==comment.id">Edit
                        </button>
                        <button @click="deleteComment(comment)">Delete</button>
                      </div>
                    </div>
                    <div class="typing-mode is-not-hidden" v-if="commentId===comment.id">
                      <div class="form-group">
                        <textarea v-model="comment_reply" rows="3" class="form-control"
                                  placeholder="Write a comment..."></textarea>
                        <button @click="addReply(comment)">Add</button>
                        <button @click="closeReply">&times;</button>
                      </div>
                    </div>
                  </div>
                  <div class="reply-list dropdown">
                    <button v-if="comment.limitedReplies && comment.limitedReplies.length"
                            class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Replies
                    </button>
                    <div class="replies dropdown-list is-not-hidden">
                      <div v-for="(reply, index) in comment.limitedReplies" :key="index" class="reply">
                        <span>{{ reply.user.name }}</span>
                        <span class="date"><timeago :datetime="reply.created_at" :auto-update="60"></timeago></span>
                        <div class="comment-container">
                          <div class="typing-mode" v-if="updateCommentId===reply.id">
                            <div class="form-group">
                            <textarea v-model="reply.comment" rows="2" class="form-control"
                                      placeholder="Edit a comment..."></textarea>
                              <button @click="updateComment(reply)">Update</button>
                              <button @click="closeComment(reply)" class="is-not-hidden">&times;</button>
                            </div>
                          </div>
                          <p v-else>{{ reply.comment }}</p>
                          <div class="items">
                            <button v-if="reply.user_id !== $store.getters.get_user.id"
                                    @click="openReplyTypingMode(reply)">Reply
                            </button>
                            <div v-else>
                              <button @click="openUpdateCommentTypingMode(reply)" v-if="updateCommentId!==reply.id"
                                      class="is-not-hidden">Edit
                              </button>
                              <button @click="deleteReply(reply, comment.limitedReplies)">Delete</button>
                            </div>
                          </div>
                          <div class="typing-mode" v-if="commentId===reply.id">
                            <div class="form-group">
                            <textarea v-model="comment_reply" rows="3" class="form-control"
                                      placeholder="Write a comment..."></textarea>
                              <button @click="addReplyOfReply(comment)">Add</button>
                              <button @click="closeReply" class="is-not-hidden">&times;</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="load-more-replies">
                        <button v-if="comment.limitedReplies.length >= 10" @click="loadMoreReplies(comment)" class="btn btn-dark">Load More Replies</button>
                      </div>
                    </div>
                    <div class="new-replies">
                      <div v-for="(reply, index) in comment.newReplies" :key="index" class="reply">
                        <span>{{ reply.user.name }}</span>
                        <span class="date"><timeago :datetime="reply.created_at" :auto-update="60"></timeago></span>
                        <div class="comment-container">
                          <div class="typing-mode" v-if="updateCommentId===reply.id">
                            <div class="form-group">
                            <textarea v-model="reply.comment" rows="2" class="form-control"
                                      placeholder="Edit a comment..."></textarea>
                              <button @click="updateComment(reply)">Update</button>
                              <button @click="closeComment(reply)" class="is-not-hidden">&times;</button>
                            </div>
                          </div>
                          <p v-else>{{ reply.comment }}</p>
                          <div class="items">
                            <button v-if="reply.user_id !== $store.getters.get_user.id"
                                    @click="openReplyTypingMode(reply)">Reply
                            </button>
                            <div v-else>
                              <button @click="openUpdateCommentTypingMode(reply)" v-if="updateCommentId!==reply.id"
                                      class="is-not-hidden">Edit
                              </button>
                              <button @click="deleteReplyInNewReplies(comment.newReplies, reply)">Delete</button>
                            </div>
                          </div>
                          <div class="typing-mode" v-if="commentId===reply.id">
                            <div class="form-group">
                            <textarea v-model="comment_reply" rows="3" class="form-control"
                                      placeholder="Write a comment..."></textarea>
                              <button @click="addReply(comment)">Add</button>
                              <button @click="closeReply" class="is-not-hidden">&times;</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="load-more-comments text-center">
                  <button v-if="postComments.comments && postComments.comments.length >= 10" @click="loadMoreComments" class="btn btn-dark">Load More Comments</button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="closeModal" type="button" class="close-button btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./comments-modal.js"></script>
<style src="./comments-modal.css" scoped></style>
