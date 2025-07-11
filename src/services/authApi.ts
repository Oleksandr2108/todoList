// services/authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./customBaseQuery";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: number;
    email: string;
  };
  token: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}
interface VerifyEmailRequest {
  code: string;
  email: string;
}

interface VerifyEmailResponse {
  message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        data: newUser,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (verify) => ({
        url: "/auth/verify-email",
        method: "POST",
        data: verify,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyEmailMutation } = authApi;
