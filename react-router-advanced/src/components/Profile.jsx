import { Routes, Route, Link } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <nav className="my-4 space-x-4">
        <Link to="details" className="text-blue-500">Details</Link>
        <Link to="settings" className="text-blue-500">Settings</Link>
      </nav>
      <div className="border p-4">
        <Routes>
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
