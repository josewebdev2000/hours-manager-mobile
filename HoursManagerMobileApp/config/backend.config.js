/*
Back-End Object to deliver API endpoints
to the mobile app
*/

import axios from "axios";

export const backendApiRoutes = {
    baseUrl: "http://10.0.0.132:8082"
};

backendApiRoutes.springUserRoutes = {
    register: "/user/register",
    login: "/user/login",
    logout: "/user/logout"
}

backendApiRoutes.passwordResetTokenRoutes = {
    requestToken: "/token/requestToken",
    checkTokenValidState: "/token/checkTokenValidState",
    resetPassword: "/token/resetUserPassword"
};

// Import axios api client
export const apiClient = axios.create({
    baseURL: backendApiRoutes.baseUrl,
    withCredentials: true
});