<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
const modalContent = ref('');
const isIframe = ref(false);

const openModal = (content, type) => {
  if (!content) return;
  modalContent.value = content;
  isIframe.value = type === 'url';
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

if (window.top === window.self) {
  window.openGlobalPopin = openModal;
}

onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-popin]');
    if (target) {
      event.preventDefault();
      const content = target.getAttribute('href');
      const type = target.getAttribute('data-popin');

      // If inside an iframe, call the function in `window.top`
      if (window.top !== window.self) {
        window.top.openGlobalPopin(content, type);
      } else {
        openModal(content, type);
      }
    }
  });
});
</script>
<template>
  <div v-if="isOpen" @click="closeModal"  style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1050; opacity: 1; visibility: visible; transition: opacity 0.3s, visibility 0.3s ease;">
    <div @click.stop style="background: rgb(255, 255, 255);border-radius: 8px; max-width: 600px;box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 10px;transform: translateY(0px);transition: transform 0.3s ease;padding: 10px;">
      <div style="display: flex;justify-content: flex-end;padding: 3px; position: absolute;top: -15px;right: -13px;">
        <button type="button"  @click="closeModal" style="border: none;background: #ffffff;font-size: 18px;cursor: pointer;border-radius: 20px;width: 25px;height: 25px;display: flex;align-items: center;justify-content: center;">x</button>
      </div>
      <div style="text-align: center;">
        <img  v-if="!isIframe" :src="modalContent" alt="Popup Image" style="max-width: 100%; height: auto; border-radius: 2px;">
        <iframe v-else :src="modalContent" style="width: 600px;height: 500px;border:none;"></iframe>
      </div> 
    </div>
  </div>
</template>
