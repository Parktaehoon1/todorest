<template>
  <div class="modal-wrap" @click="onClose">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="p-2 bg-dark d-flex">
          <div
            style="width: 6px; height: 6px; cursor: pointer"
            class="ml-2 bg-danger rounded-circle"
            @click="onClose"
          ></div>
          <div
            style="width: 6px; height: 6px; cursor: pointer"
            class="ml-2 bg-warning rounded-circle cursor-pointer"
            @click="sorry"
          ></div>
          <div
            style="width: 6px; height: 6px cursor: pointer"
            class="ml-2 bg-success rounded-circle"
            @click="sorry"
          ></div>
        </div>
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span @click="onClose">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onClose">
            Close
          </button>
          <button type="button" class="btn btn-danger" @click="onDelete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close-modal", "delete"],
  setup(props, { emit }) {
    const onClose = () => {
      emit("close-modal", {});
    };
    const sorry = () => {
      alert("죄송합니다. 구현예정입니다.");
    };
    const onDelete = () => {
      emit("delete", {});
    };
    return { sorry, onClose, onDelete };
  },
};
</script>

<style scoped>
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
}
</style>
