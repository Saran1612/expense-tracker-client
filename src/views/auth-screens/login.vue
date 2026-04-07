<template>
  <div class="flex justify-center items-center h-full">
    <el-card class="w-full max-w-md bg-white rounded-lg shadow-sm !border !border-[var(--color-primary)]">
      <div class="px-6 py-8">
        <h1 class="font-bold text-gray-900 mb-2 text-left" style="font-size: var(--text-header);">Welcome back</h1>
        <p class="text-gray-500 mb-8 text-left" style="font-size: var(--text-content);">Please enter your details</p>

        <el-form :model="form" :rules="rules" class="w-full">
          <div class="w-full mb-6">
            <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Email address</label> -->
            <el-form-item prop="email" class="w-full mb-0">
              <Input v-model="form.email" class="w-full" placeholder="Enter your email" type="text" size="large" />
            </el-form-item>
          </div>

          <div class="w-full mb-6">
            <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Password</label> -->
            <el-form-item prop="password" class="w-full mb-0">
              <Input v-model="form.password" class="w-full" placeholder="Enter your password" type="password"
                size="large" />
            </el-form-item>
          </div>
        </el-form>

        <Button @click="handleClick" :loading="isLoading" type="primary" class="w-full mt-4" size="large">
          LOGIN
        </Button>
        <div class="text-center mt-4">
          <span>Don't have an account?</span>
          <RouterLink to="/register" class="text-primary">Register</RouterLink>
        </div>

        <div class="my-4">
          <!-- <GoogleLogin :callback="callback" /> -->
        </div>
      </div>
    </el-card>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { ElForm, ElFormItem, ElCard } from 'element-plus';
import { GoogleLogin } from 'vue3-google-login'
import { createMessageHelpers } from '../../utils/element-plus-utils.js';
import { authApi } from '../../apis/auth-api.js';
import { useAuthStore } from '../../stores/auth-store.js';
import Button from '../../components/Button.vue';
import Input from '../../components/Input.vue';

const message = createMessageHelpers();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);

const form = ref({
  email: '',
  password: ''
})

const rules = ref({
  email: [{ required: true, message: 'Please enter your email', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter your password', trigger: 'blur' }],
})

const handleClick = async () => {
  console.log("clickedddd")
  isLoading.value = true;
  try {
    const response = await authApi.Authlogin({
      email: form.value.email,
      password: form.value.password
    });
    console.log(response, "respsonseofffff")
    if (response) {
      authStore.setToken(response?.token);
      authStore.setCurrentUser(response?.user);
      message.success('Login successful!');
      router.push({ name: 'Home' });
    }
  } catch (error) {
    message.error(error?.message || 'Login failed. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

// const handleGoogleLogin = () => {
//   google.accounts.id.prompt(); // opens popup
// }

// const handleCredentialResponse = (response) => {
//   console.log("JWT Token:", response.credential);

//   const payload = JSON.parse(
//     atob(response.credential.split(".")[1])
//   );

//   console.log("User Info:", payload);

// }

onMounted(() => {
})
</script>

<style scoped></style>
