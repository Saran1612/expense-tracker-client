<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Home as HomeIcon,
  DollarSign as ExpensesIcon,
  LayoutGrid as CategoryIcon,
  User as ProfileIcon,
  Menu as MenuIcon,
  X as CloseIcon,
  TrendingUp as AnalyticsIcon,
  Settings as SettingsIcon,
  LogOut as LogoutIcon,
  CirclePoundSterling as BudgetIcon
} from '@lucide/vue'
import Tooltip from './Tooltip.vue'
import { clearLocalStorage } from '../utils/auth.utils'
import { useAuthStore } from '../stores/auth-store'
import LLMChat from '../views/ask-ai/index.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const collapsed = ref(true)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

// Menu items configuration
const menuOptions = [
  {
    label: 'Home',
    index: 'Home',
    icon: HomeIcon,
    path: '/home'
  },
  {
    label: 'Expenses',
    index: 'Expenses',
    icon: ExpensesIcon,
    path: '/expenses'
  },
  {
    label: 'Category',
    index: 'Category',
    icon: CategoryIcon,
    path: '/category'
  },
  {
    label: 'Budget',
    index: 'Budget',
    icon: BudgetIcon,
    path: '/budget'
  },
  {
    label: 'Analytics',
    index: 'Analytics',
    icon: AnalyticsIcon,
    path: '/analytics'
  },
  {
    label: 'Profile',
    index: 'Profile',
    icon: ProfileIcon,
    path: '/profile'
  }
]

// Get active menu key based on current route
const activeKey = computed(() => {
  const currentRoute = route.name
  return currentRoute || 'Home'
})

// Handle menu item click
const handleMenuSelect = (key) => {
  const selectedItem = menuOptions.find(menu => menu.index === key)
  if (selectedItem) {
    router.push(selectedItem.path)
  }
}

// Handle settings click
const handleSettings = () => {
  router.push({ name: 'Profile' })
}

// Handle logout click
const handleLogout = () => {
  authStore.clearAuth();
  router.push({ name: 'Login' })
}
</script>

<template>
  <el-container class="min-h-screen">
    <!-- Sidebar -->
    <el-aside :width="collapsed ? '70px' : '240px'" class="bg-[var(--color-sidebar)] transition-all duration-300"
      style="height: 100vh; position: sticky; top: 0;">
      <!-- Hamburger / Close Button -->
      <div class="flex items-center justify-center h-16">
        <el-button text @click="toggleCollapse" class="hamburger-btn">
          <component :is="collapsed ? MenuIcon : CloseIcon" :size="28" />
        </el-button>
      </div>

      <!-- Navigation Menu -->
      <div class="menu-container">
        <el-menu :default-active="activeKey" :collapse="collapsed" :collapse-transition="false"
          @select="handleMenuSelect" class="mt-4 text-text-primary custom-menu !w-auto !mt-4"
          background-color="transparent" text-color="#DFD0B8" active-text-color="#222831">
          <Tooltip v-for="item in menuOptions" :key="item.index" :content="item.label" :placement="'right'"
            :disabled="!collapsed">
            <el-menu-item :index="item.index" class="custom-menu-item"
              :style="{ justifyContent: collapsed ? 'center' : 'flex-start', gap: collapsed ? '0' : '12px' }">
              <component :is="item.icon" :size="18" />
              <span>{{ item.label }}</span>
            </el-menu-item>
          </Tooltip>
        </el-menu>

        <!-- Bottom Actions -->
        <div class="bottom-actions">
          <el-menu :collapse="collapsed" :collapse-transition="false" class="custom-menu bottom-menu"
            background-color="transparent" text-color="#DFD0B8">
            <!-- <Tooltip
              content="Settings"
              :placement="'right'"
              :disabled="!collapsed"
            >
              <el-menu-item 
                index="settings"
                class="custom-menu-item"
                :style="{ justifyContent: collapsed ? 'center' : 'flex-start', gap: collapsed ? '0' : '12px' }"
                @click="handleSettings"
              >
                <component :is="SettingsIcon" :size="18" />
                <span>Settings</span>
              </el-menu-item>
            </Tooltip> -->
            <Tooltip content="Logout" :placement="'right'" :disabled="!collapsed">
              <el-menu-item index="logout" class="custom-menu-item"
                :style="{ justifyContent: collapsed ? 'center' : 'flex-start', gap: collapsed ? '0' : '12px' }"
                @click="handleLogout">
                <component :is="LogoutIcon" :size="18" />
                <span>Logout</span>
              </el-menu-item>
            </Tooltip>
          </el-menu>
        </div>
      </div>
    </el-aside>

    <!-- Main Layout -->
    <el-container>
      <!-- Content -->
      <el-main class="p-0">
        <!-- <div class="w-full h-16 bg-primary">
        <div class=" w-full">
          <h1 class="tfont-bold">Expense Tracker</h1>
        </div>
      </div> -->
        <div class="mx-auto w-full">
          <router-view></router-view>
        </div>

        <div class="z-20 fixed bottom-4 right-4">
          <LLMChat />
        </div>
      </el-main>

      <!-- Footer -->
      <!-- <el-footer class="p-4 bg-et-primary text-center text-subheader text-et-text-light">
        Expense Tracker © {{ new Date().getFullYear() }}
      </el-footer> -->
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.hamburger-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  svg {
    color: var(--color-primary) !important;
  }

}

.hamburger-btn:hover {
  background-color: transparent !important;
}

:deep(.custom-menu) {
  border: none !important;
}

:deep(.custom-menu-item) {
  display: flex;
  align-items: center;
  // padding: 0 !important;
}

:deep(.custom-menu-item .el-menu-item__icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

:deep(.custom-menu-item .lucide-icon) {
  width: 20px;
  height: 20px;
  display: block;
}

:deep(.custom-menu-item span) {
  font-size: var(--text-content);
}

:deep(.el-menu-item) {
  margin: 4px 6px;
  border-radius: 10px;
  color: #404040;

  &:hover {
    background-color: var(--color-primary) !important;
    color: var(--color-secondary) !important;
  }
}

:deep(.el-menu-item.is-active) {
  background-color: var(--color-primary) !important;
  color: var(--color-secondary);
}

:deep(.el-menu--collapse .el-menu-item__icon) {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.menu-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: space-between;
}

.bottom-actions {
  margin-top: auto;
  padding-bottom: 16px;
}

:deep(.bottom-menu) {
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  padding-top: 8px !important;
  width: auto !important;
}

// Ensure tooltip wrapper doesn't interfere with menu item layout
:deep(.el-tooltip__trigger) {
  // width: 100%;
  // display: flex;
}
</style>
