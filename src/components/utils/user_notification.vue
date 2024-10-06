<template>
  <transition name="fade"
    enter-active-class="transition ease-out duration-300 transform"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="isVisible"
      :class="notificationClass"
      role="alert"
    >
      <div class="p-4 pr-10">
        <p class="font-bold">{{ title }}</p>
        <p>{{ message }}</p>
      </div>
      <button
        @click="close"
        class="absolute top-3 right-3 text-black hover:scale-110 text-xl"
        aria-label="Close"
      >
      <FontAwesomeIcon :icon="faXmark" class="white"></FontAwesomeIcon>
      </button>
      <div
        class="absolute bottom-0 left-0 h-1"
        :class="progressBarClass"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </transition>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'FloatingNotification',
  components: {
      FontAwesomeIcon,
  },
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 1500
    },
    show: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'error' 
    }
  },
  data() {
    return {
      faXmark: faXmark,
      isVisible: this.show,
      progress: 100,
      timer: null,
      progressTimer: null
    }
  },
  computed: {
    notificationClass() {
      switch (this.type) {
        case 'error':
          return 'fixed w-11/12 top-4 right-4 max-w-sm bg-red-500 text-white rounded-lg shadow-lg overflow-hidden z-[9999]';
        case 'warning':
          return 'fixed w-11/12 top-4 right-4 max-w-sm bg-yellow-300 text-black rounded-lg shadow-lg overflow-hidden z-[9999]';
        case 'success':
          return 'fixed w-11/12 top-4 right-4 max-w-sm bg-green-500 text-white rounded-lg shadow-lg overflow-hidden z-[9999]';
        default:
          return 'fixed w-11/12 top-4 right-4 max-w-sm bg-blue-500 text-white rounded-lg shadow-lg overflow-hidden z-[9999]';
      }
    },
    progressBarClass() {
      switch (this.type) {
        case 'error':
          return 'bg-red-600';
        case 'warning':
          return 'bg-yellow-600';
        case 'success':
          return 'bg-green-600';
        default:
          return 'bg-blue-600';
      }
    },
    title() {
      switch (this.type) {
        case 'error':
          return 'Error';
        case 'warning':
          return 'Warning';
        case 'success':
          return 'Success';
        default:
          return 'Notification';
      }
    }
  },
  watch: {
    show(newValue) {
      this.isVisible = newValue
      if (newValue) {
        this.startTimer()
      } else {
        this.clearTimers()
      }
    }
  },
  methods: {
    close() {
      this.isVisible = false
      this.$emit('update:show', false)
    },
    startTimer() {
      const startTime = Date.now()
      const endTime = startTime + this.duration

      this.progressTimer = setInterval(() => {
        const now = Date.now()
        const remaining = endTime - now
        this.progress = (remaining / this.duration) * 100

        if (remaining <= 0) {
          clearInterval(this.progressTimer)
        }
      }, 16) // ~60fps

      this.timer = setTimeout(() => {
        this.close()
      }, this.duration)
    },
    clearTimers() {
      clearTimeout(this.timer)
      clearInterval(this.progressTimer)
    }
  },
  mounted() {
    if (this.show) {
      this.startTimer()
    }
  },
  beforeUnmount() {
    this.clearTimers()
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>