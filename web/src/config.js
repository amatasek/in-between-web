// These MUST be defined in .env.development or .env.production
const API_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export {
  API_URL,
  SOCKET_URL
};
