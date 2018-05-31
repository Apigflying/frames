import user from './user.js';
import test from './test.js';
export default (app) => {
  app.use('/user', user);
  app.use('/test', test);
}
