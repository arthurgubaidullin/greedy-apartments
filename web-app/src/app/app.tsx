import RealtorManagement from '../realtor-management/realtor-management';
import RealtorRegistry from '../realtor-registry/realtor-registry';
import TenantManagement from '../tenant-management/tenant-management';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  return (
    <div>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/realtor-management">Realtor Management</Link>
          </li>
          <li>
            <Link to="/tenant-management">Tenant Management</Link>
          </li>
          <li>
            <Link to="/realtor-registry">Realtor Registry</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/realtor-management" element={<RealtorManagement />} />
        <Route path="/tenant-management" element={<TenantManagement />} />
        <Route path="/realtor-registry" element={<RealtorRegistry />} />
      </Routes>
    </div>
  );
}

export default App;
