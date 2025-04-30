'use client';
import { createContext, useContext } from 'react';
import { toast as sonnerToast } from 'sonner';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const toast = (props) => {
    const { title, description, ...rest } = props;

    if (description) {
      return sonnerToast(title, {
        description,
        ...rest,
      });
    }

    return sonnerToast(title, rest);
  };

  toast.success = (title, description, options = {}) => {
    if (typeof description === 'object') {
      options = description;
      description = undefined;
    }

    return sonnerToast.success(title, {
      description,
      ...options,
    });
  };

  toast.error = (title, description, options = {}) => {
    if (typeof description === 'object') {
      options = description;
      description = undefined;
    }

    return sonnerToast.error(title, {
      description,
      ...options,
    });
  };

  toast.warning = (title, description, options = {}) => {
    if (typeof description === 'object') {
      options = description;
      description = undefined;
    }

    return sonnerToast.warning(title, {
      description,
      ...options,
    });
  };

  toast.info = (title, description, options = {}) => {
    if (typeof description === 'object') {
      options = description;
      description = undefined;
    }

    return sonnerToast.info(title, {
      description,
      ...options,
    });
  };

  toast.dismiss = sonnerToast.dismiss;
  toast.promise = sonnerToast.promise;

  return (
    <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>
  );
};
