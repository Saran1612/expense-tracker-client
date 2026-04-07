import { ElMessage } from 'element-plus'

// Standard message configuration
const MESSAGE_CONFIG = {
  duration: 4000,
  showClose: true,
};

// Create standardized message functions
export function createMessageHelpers() {
  return {
    success: (text, options = {}) => {
      return ElMessage.success({
        message: text,
        duration: options.duration || MESSAGE_CONFIG.duration,
        showClose: options.showClose !== undefined ? options.showClose : MESSAGE_CONFIG.showClose,
        ...options,
      });
    },
    
    error: (text, options = {}) => {
      return ElMessage.error({
        message: text,
        duration: options.duration || MESSAGE_CONFIG.duration,
        showClose: options.showClose !== undefined ? options.showClose : MESSAGE_CONFIG.showClose,
        ...options,
      });
    },
    
    warning: (text, options = {}) => {
      return ElMessage.warning({
        message: text,
        duration: options.duration || MESSAGE_CONFIG.duration,
        showClose: options.showClose !== undefined ? options.showClose : MESSAGE_CONFIG.showClose,
        ...options,
      });
    },
    
    info: (text, options = {}) => {
      return ElMessage.info({
        message: text,
        duration: options.duration || MESSAGE_CONFIG.duration,
        showClose: options.showClose !== undefined ? options.showClose : MESSAGE_CONFIG.showClose,
        ...options,
      });
    },
  };
}

