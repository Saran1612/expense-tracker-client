<template>
  <div class="profile-page">
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="page-title">Settings</h1>
      <p class="page-subtitle">Manage your account and preferences</p>
    </div>

    <!-- Profile Information Section -->
    <SettingsSection title="Profile Information" :icon="User">
      <el-form :model="profileForm" class="settings-form">
        <div class="form-field">
          <label class="form-label">Name</label>
          <Input
            v-model="profileForm.name"
            placeholder="Enter your name"
            class="w-full"
          />
        </div>
        
        <div class="form-field">
          <label class="form-label">Email</label>
          <Input
            v-model="profileForm.email"
            type="email"
            placeholder="Enter your email"
            class="w-full"
          />
        </div>

        <div class="form-field">
          <label class="form-label">About</label>
          <Input
            v-model="profileForm.about"
            placeholder="Enter your about"
            class="w-full"
          />
        </div>
        
        <!-- <div class="form-field">
          <label class="form-label">New Password</label>
          <Input
            v-model="profileForm.newPassword"
            type="password"
            placeholder="Enter new password"
            class="w-full"
          />
        </div>
        
        <div class="form-field">
          <label class="form-label">Confirm Password</label>
          <Input
            v-model="profileForm.confirmPassword"
            type="password"
            placeholder="Confirm new password"
            class="w-full"
          />
        </div> -->
        
        <div class="form-actions">
          <Button type="primary" @click="handleUpdateChanges" :loading="isLoading">
            Update Changes
          </Button>
        </div>
      </el-form>
    </SettingsSection>

    <!-- Notifications Section -->
    <SettingsSection title="Notifications" :icon="Bell">
      <div class="notification-list">
        <div class="notification-item">
          <div class="notification-info">
            <div class="notification-title">Budget Alerts</div>
            <div class="notification-description">Get notified when approaching budget limit</div>
          </div>
          <el-switch
            v-model="notifications.budgetAlerts"
            style="--el-switch-on-color: var(--color-primary);"
          />
        </div>
        
        <div class="notification-item">
          <div class="notification-info">
            <div class="notification-title">Monthly Reports</div>
            <div class="notification-description">Receive monthly spending summary</div>
          </div>
          <el-switch
            v-model="notifications.monthlyReports"
            style="--el-switch-on-color: var(--color-primary);"
          />
        </div>
        
        <div class="notification-item">
          <div class="notification-info">
            <div class="notification-title">Transaction Notifications</div>
            <div class="notification-description">Get notified for each expense added</div>
          </div>
          <el-switch
            v-model="notifications.transactionNotifications"
            style="--el-switch-on-color: var(--color-primary);"
          />
        </div>
      </div>
    </SettingsSection>

    <!-- Billing Section -->
    <!-- <SettingsSection title="Billing" :icon="CreditCard">
      <div class="billing-content">
        <div class="billing-info">
          <div class="billing-label">Current Plan</div>
          <div class="billing-plan">Free Plan</div>
          <div class="billing-description">Upgrade to Premium for advanced features.</div>
        </div>
        <div class="billing-actions">
          <Button type="primary" @click="handleUpgrade">
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </SettingsSection> -->

    <!-- Danger Zone Section -->
    <SettingsSection title="Danger Zone" :icon="AlertTriangle" icon-color="#EF4444" :danger-zone="true">
      <div class="danger-zone-actions">
        <Button
          type="secondary"
          @click="handleSignOut"
          class="danger-btn signout-btn"
        >
          Sign Out
        </Button>
        <Button
          type="secondary"
          @click="handleDeleteAccount"
          class="danger-btn delete-btn"
        >
          Delete Account
        </Button>
      </div>
    </SettingsSection>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Bell,
  CreditCard,
  AlertTriangle
} from '@lucide/vue'
import { createMessageHelpers } from '../utils/element-plus-utils.js'
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import SettingsSection from '../components/SettingsSection.vue';
import { useAuthStore } from '../stores/auth-store.js';
import { authApi } from '../apis/auth-api.js';

const router = useRouter()
const message = createMessageHelpers()
const authStore = useAuthStore();
const isLoading = ref(false);
// const user = authStore.user;

console.log(authStore.user, "dsfdsfsdfsdf")

onMounted(async () => {
    getProfileData();
})

const getProfileData = async () => {
  const response = await authApi.getUserInfo();
  if (response.status === 200 && response.data) {
    const userData = response?.data?.user;
    authStore.setCurrentUser(userData);
    profileForm.value.name = userData?.name;
    profileForm.value.email = userData?.email;
    profileForm.value.about = userData?.about;
  }
}

const profileForm = ref({
  name: '',
  email: '',
  // newPassword: '',
  // confirmPassword: '',
  about: ''
})

const notifications = ref({
  budgetAlerts: true,
  monthlyReports: true,
  transactionNotifications: false
})

const handleUpdateChanges = async () => {
  // Validate name
  if (!profileForm.value.name || profileForm.value.name.trim() === '') {
    message.error('Please enter your name')
    return
  }

  // Validate email
  if (!profileForm.value.email || profileForm.value.email.trim() === '') {
    message.error('Please enter your email')
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(profileForm.value.email)) {
    message.error('Please enter a valid email address')
    return
  }

  isLoading.value = true;

  // Validate passwords if provided
  // if (profileForm.value.newPassword || profileForm.value.confirmPassword) {
  //   if (!profileForm.value.newPassword || profileForm.value.newPassword.trim() === '') {
  //     message.error('Please enter a new password')
  //     return
  //   }

  //   if (!profileForm.value.confirmPassword || profileForm.value.confirmPassword.trim() === '') {
  //     message.error('Please confirm your new password')
  //     return
  //   }

  //   if (profileForm.value.newPassword !== profileForm.value.confirmPassword) {
  //     message.error('Passwords do not match')
  //     return
  //   }

  //   if (profileForm.value.newPassword.length < 6) {
  //     message.error('Password must be at least 6 characters long')
  //     return
  //   }
  // }

  try {
    const response = await authApi.updateUser(profileForm.value);
    if (response.status === 200 && response.data) {
      message.success('Profile updated successfully!')
      getProfileData();
    }
  } catch (error) {
    message.error(error?.data?.message || 'Profile update failed. Please try again.')
  } finally {
    isLoading.value = false;
  }
}

const handleUpgrade = () => {
  message.info('Upgrade functionality coming soon')
}

const handleSignOut = () => {
  // message.warning('Signing out...')
  // Add sign out logic here
  // authStore.clearAuth();
  // router.push({ name: 'Login' })
}

const handleDeleteAccount = () => {
  message.error('Delete account functionality coming soon')
}
</script>

<style scoped lang="scss">
.profile-page {
  width: 100%;
  max-width: 800px;
}

.header-section {
  margin-bottom: 32px;
  text-align: left;
}

.page-title {
  font-size: var(--text-header);
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.page-subtitle {
  font-size: var(--text-content);
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
}

.settings-form {
  width: 100%;
}

.form-field {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: var(--text-content);
  font-weight: 500;
  color: #374151;
  text-align: left;
  margin-bottom: 8px;
}

.form-actions {
  margin-top: 32px;
  display: flex;
  justify-content: flex-start;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-primary);
}

.notification-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.notification-info {
  flex: 1;
  text-align: left;
}

.notification-title {
  font-size: var(--text-content);
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.notification-description {
  font-size: var(--text-description);
  color: #6B7280;
  line-height: 1.5;
}

:deep(.el-switch) {
  --el-switch-on-color: var(--color-primary);
}

.billing-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.billing-info {
  flex: 1;
}

.billing-label {
  font-size: var(--text-content);
  color: #6B7280;
  margin-bottom: 8px;
}

.billing-plan {
  font-size: var(--text-header);
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
}

.billing-description {
  font-size: var(--text-content);
  color: #6B7280;
  line-height: 1.5;
}

.billing-actions {
  display: flex;
  align-items: center;
}

.danger-zone-actions {
  display: flex;
  gap: 16px;
}

.danger-btn {
  min-width: 150px;
}

.signout-btn {
  border-color: #EF4444 !important;
  color: #EF4444 !important;
}

.signout-btn:hover {
  background-color: #FEE2E2 !important;
  border-color: #EF4444 !important;
}

.delete-btn {
  background-color: #EF4444 !important;
  border-color: #EF4444 !important;
  color: #FFFFFF !important;
}

.delete-btn:hover {
  background-color: #DC2626 !important;
  border-color: #DC2626 !important;
}
</style>
