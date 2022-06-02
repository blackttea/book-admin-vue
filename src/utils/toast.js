import {message} from 'ant-design-vue';

export default function toast(messages = '', type = 'error', duration = 1500) {
  message.info(messages).then(r => {
    console.log(messages)
  });
}