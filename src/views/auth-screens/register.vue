<template>
  <div class="flex justify-center items-center h-full">
    <el-card class="w-full max-w-md bg-white rounded-lg shadow-sm !border !border-[var(--color-primary)]">
      <div class="px-6 py-8">
        <h1 class="font-bold text-gray-900 mb-2 text-left" style="font-size: var(--text-header);">Create account</h1>
        <p class="text-gray-500 mb-8 text-left" style="font-size: var(--text-content);">Please enter your details to sign up</p>
        
        <el-form ref="formRef" :model="form" :rules="rules" class="w-full">
         <div class="w-full mb-6">
            <el-form-item prop="name" class="w-full mb-0">
              <Input 
                v-model="form.name" 
                class="w-full" 
                placeholder="Enter your name" 
                type="text" 
                size="large"
              />
            </el-form-item>
          </div>

          <div class="w-full mb-6">
            <el-form-item prop="email" class="w-full mb-0">
              <Input 
                v-model="form.email" 
                class="w-full" 
                placeholder="Enter your email" 
                type="email" 
                size="large"
              />
            </el-form-item>
          </div>
          
          <div class="w-full mb-6">
            <el-form-item prop="password" class="w-full mb-0">
              <Input 
                v-model="form.password" 
                class="w-full" 
                placeholder="Enter your password" 
                type="password" 
                size="large"
              />
            </el-form-item>
          </div>
          
          <div class="w-full mb-6">
            <el-form-item prop="confirmPassword" class="w-full mb-0">
              <Input 
                v-model="form.confirmPassword" 
                class="w-full" 
                placeholder="Confirm your password" 
                type="password" 
                size="large"
              />
            </el-form-item>
          </div>
        </el-form>
        
        <Button @click="handleSignup" :loading="isLoading" type="primary" class="w-full mt-4" size="large">
            REGISTER
        </Button>
        <div class="text-center mt-4">
          <span>Already have an account?</span>
          <RouterLink to="/login" class="text-primary">Login</RouterLink>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { ElForm, ElFormItem, ElCard } from 'element-plus';
import { createMessageHelpers } from '../../utils/element-plus-utils.js';
import { authApi } from '../../apis/auth-api.js';
import Button from '../../components/Button.vue';
import Input from '../../components/Input.vue';

const router = useRouter();
const message = createMessageHelpers();

const formRef = ref(null);
const isLoading = ref(false);
const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.value.password) {
    callback(new Error('Passwords do not match'));
  } else {
    callback();
  }
}

const rules = ref({
  email: [{ required: true, message: 'Please enter your email', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }]
})

const handleSignup = async () => {
  isLoading.value = true;
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
  } catch (error) {
      message.error('Please fill in all required fields correctly')
    return
  }
  
  // Check if all fields are filled
  // if (!form.value.username || !form.value.password || !form.value.confirmPassword || !form.value.name) {
  //   message.error('Please fill in all fields')
  //   return
  // }
  
  try {
    const response = await authApi.Authregister({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name
    });
  
    if (response) {
      message.success('Account created successfully!');
      router.push({ name: 'Login' });
    }
  } catch (error) {
    message.error(error?.message || 'Sign up failed. Please try again.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>

</style>
