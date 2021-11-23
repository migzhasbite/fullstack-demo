import './Dashboard.scss';

// Reminder: this is a private page, and this is wrapped by ProtectedRoute in App.js
const Dashboard = () => (
  <main className="dashboard">
    <h1 className="dashboard__title">Dashboard page</h1>
    <p>Should be ONLY be visible when logged in.</p>
  </main>
);

export default Dashboard;
