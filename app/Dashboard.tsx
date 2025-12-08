import React from 'react';

interface DashboardProps {
  email: string;
}

const Dashboard: React.FC<DashboardProps> = ({ email }) => {
  return (
    <div>
      <h1>Hoş geldin {email}</h1>
    </div>
  );
};

export default Dashboard;