// const status = require('../src/health/routes');
// const users = require('../src/users/routes');
// const validateAuth = require('../middlewares/validateAuth');
// const getData = require('../middlewares/getData');
import status from '../src/health/routes';
// import users from '../src/users/routes';

export = (app: any) => {
  app.use('/status', status);
  // app.use('/users', users);
  // app.use('/users', validateAuth.checkIfAuthenticated, getData.getGeoip, users);
  app.use('*', (req: any, res: any) => {
    res.send('Not found!!!');
  });
};
