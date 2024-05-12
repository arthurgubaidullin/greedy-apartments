import { RealtorList } from './realtor-list';
import { RealtorRegisterForm } from './realtor-register-form';

export function RealtorRegistry() {
  return (
    <div>
      <h1>Realtor Registry</h1>

      <RealtorRegisterForm />

      <RealtorList />
    </div>
  );
}

export default RealtorRegistry;
