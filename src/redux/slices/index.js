import appSlice from './app';

const rootReducers = Object.assign(
  {},
  {
    app: appSlice.reducer,
  },
);

module.exports = {
  rootReducers,
  app: appSlice.actions,
};
