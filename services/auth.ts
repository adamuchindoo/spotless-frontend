// src/services/auth.ts

import { api } from "@/lib/api";

export const registerUser = async (payload: {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  address: string;
  phone_number: string;
  referral_code?: string;
}) => {
  return api("/api/auth/new-account", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const verifyOtp = async (payload: { otp: string }) => {
  return api("/api/auth/email-validate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const logoutUser = async () => {
  return api("/api/auth/logout", {
    method: "POST",
  });
};

export const reSendOTP = async (payload: { email: string }) => {
  return api("/api/auth/resend_otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
export const getReferralProfile = async () => {
  return api("/api/referral/referral-profile", {
    method: "GET",
  });
};

// services/referral.ts

export const requestWithdrawal = async (payload: {
  bank_name: string;
  account_number: string;
}) => {
  return api("/api/referral/withdrawal-request", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// GET ORDERS (PAGINATED)
export const getLaundryOrders = async (page: number, page_size: number) => {
  return api(`/api/laundry/get-order/${page}/${page_size}/`, {
    method: "GET",
  });
};

// UPDATE ORDER
export const updateLaundryOrder = async (order_id: number) => {
  return api(`/api/laundry/update-order/${order_id}`, {
    method: "GET",
  });
};

export const getRecentWithdrawals = async (page: number, page_size: number) => {
  return api(`/api/referral/recent-withdraw-client/${page}/${page_size}/`, {
    method: "GET",
  });
};

export const getLeaderboard = async () => {
  return api("/api/laundry/leaderboard", {
    method: "GET",
  });
};

export const getGarments = async (page: number = 1, pageSize: number = 10) => {
  return api(`/api/laundry/get-garment/${page}/${pageSize}`, {
    method: "GET",
  });
};

export const resetPassword = async (email: string) => {
  return api(`/api/auth/reset-password/${email}`, {
    method: "GET",
  });
};

export const changePassword = async (data: {
  otp: number;
  password: string;
  confirm_password: string;
}) => {
  return api("/api/auth/change_password", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
