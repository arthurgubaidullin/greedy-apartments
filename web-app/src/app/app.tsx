import RealtorManagement from '../realtor-space/realtor-space';
import RealtorRegistry from '../realtor-registry/realtor-registry';
import TenantSpace from '../tenant-space/tenant-space';

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
            <Link to="/realtor-space">Realtor Management</Link>
          </li>
          <li>
            <Link to="/tenant-space">Tenant Management</Link>
          </li>
          <li>
            <Link to="/realtor-registry">Realtor Registry</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/realtor-space" element={<RealtorManagement />} />
        <Route path="/tenant-space" element={<TenantSpace />} />
        <Route path="/realtor-registry" element={<RealtorRegistry />} />
      </Routes>
    </div>
  );
}

export default App;
