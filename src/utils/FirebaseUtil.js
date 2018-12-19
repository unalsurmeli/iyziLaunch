export const API_KEY = 'API_KEY';
export const AUTH_DOMAIN = 'AUTH_DOMAIN';
export const DATABASE_URL = 'DATABASE_URL';
export const PROJECT_ID = 'PROJECT_ID';
export const STORAGE_BUCKET = 'STORAGE_BUCKET';
export const MESSAGING_SENDER_ID = 'MESSAGING_SENDER_ID';

const FirebaseUtil = {
  getApiKey() {
    return API_KEY;
  },
  getAuthDomain() {
    return AUTH_DOMAIN;
  },
  getDatabaseURL() {
    return DATABASE_URL;
  },
  getProjectId() {
    return PROJECT_ID;
  },
  getStorageBucket() {
    return STORAGE_BUCKET;
  },
  getMessagingSenderId() {
    return MESSAGING_SENDER_ID;
  },
};
export default FirebaseUtil;
