import { createApp } from 'vue';
import PopupModal from './components/PopupModal.vue';
const modalContainer = document.createElement('div');
document.body.appendChild(modalContainer);
createApp(PopupModal).mount(modalContainer);