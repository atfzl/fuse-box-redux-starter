import { foo } from './foo';

console.log('reducers fie run');

export default (): { [k: string]: any } => {
  console.log('inside reduce');
  console.log(foo());
  return { originalReducer: foo() };
};
