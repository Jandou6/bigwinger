declare const  __DEV__:boolean;
export default {
  host: __DEV__ ? 'localhost' : 'backend-dev.bigwinger.com',
  port: __DEV__ ? 7001 : 80,
};