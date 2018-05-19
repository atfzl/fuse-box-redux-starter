import getRootReducer from '~/ui/reducers';

const configureStore = () => {
  console.error('creating a new store');

  const obj = {
    replaceReducer(newRootReducer: { [k: string]: any }) {
      obj.rootReducer = newRootReducer;
    },
    rootReducer: getRootReducer(),
  };

  return obj;
};

export default configureStore();
