<script setup>
  import { onUnmounted, ref } from 'vue'
  import useChat from '../composable/useChat'
  import useAuth from '../composable/useAuth'
  const { messages, unsubscribe, sendMessage } = useChat()
  const { user } = useAuth()
  const newMessage = ref('')
  const send = () => {
    sendMessage(newMessage.value)
    newMessage.value = ''
  }
  onUnmounted(() => {
    unsubscribe()
  })
</script>

<template>
  <h1 class="text-6xl font-thin tracking-tighter text-center mt-8">
    Charlie Chat
  </h1>
  <div
    class="
      min-h-[500px]
      w-full
      mt-8
      rounded-lg
      shadow-2xl
      flex flex-col
      justify-between
    "
  >
    <ul class="p-4 space-y-4">
      <li v-for="message in messages" :key="message.id">
        <div
          class="flex justify-between px-4 py-2 rounded-lg"
          :class="user === message.author ? 'bg-green-400' : 'bg-gray-200'"
        >
          <span>{{ message.text }}</span
          ><span>by {{ message.author }}</span>
        </div>
      </li>
    </ul>
    <div>
      <input
        class="w-full p-4 rounded-lg focus:outline-none focus:bg-green-400"
        type="text"
        placeholder="Type a message..."
        v-model="newMessage"
        @change="send"
      />
    </div>
  </div>
</template>