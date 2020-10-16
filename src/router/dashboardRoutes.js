import React from 'react';
import { Route } from 'react-router-dom';
import DashboardRoute from '../components/protectedRoute/dashboardRoute';
import MainBoard from '../components/dashboard/mainBoard';
import Data from '../components/dashboard/data';
import Requests from '../components/dashboard/requests';
import AddUser from '../components/dashboard/addUser';
import { AllRoles } from '../utils/constants';

const DashboardRouting = () => {
  return (
    <>
      <Route path="/dashboard" exact component={MainBoard} />
      {/* Admin Routes */}
      <Route path="/dashboard/data" component={Data} />
      <Route path="/dashboard/requests" component={Requests} />
      <Route path="/dashboard/add-user" component={AddUser} />
    </>
  );
};

export default DashboardRouting;
