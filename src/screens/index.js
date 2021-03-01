import auth from './auth';
import order from './order';
import shop from './shop';
import user from './user';

export default {
  ...auth,
  ...order,
  ...shop,
  ...user,
};
