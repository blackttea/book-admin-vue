<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    layout="inline"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import {getTable} from "@/api/test";
import {login} from "@/api/login";

export default defineComponent({
  props: ['dataCenter'],
  setup(props, {emit, attrs}) {
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
    const onFinish = (values) => {
      console.log('Success:', values)
    };

    const onFinishFailed = (errorInfo) => {
      login({username:'admin', password: '123456'}).then((res) => {
        console.log(JSON.stringify(res.data.token))
        getTable({ keywords: 'huawei'}).then((res) => {
          props.dataCenter['_grid'].data = res.data?.commodityList
        })
      })
      console.log('Failed:', errorInfo);
      console.log(attrs)
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

