/**
 * An array of routes that are public
 * @type {string[]}
 */
export const publicRoutes = [
    '/'
]

/**
 * An array of routes used for auth
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * The prefix for API auth routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"