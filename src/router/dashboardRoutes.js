import React from 'react';
import { Route } from 'react-router-dom';
import DashboardRoute from '../components/protectedRoute/dashboardRoute';
import MainBoard from '../components/dashboard/mainBoard';
import Data from '../components/dashboard/data';
import Requests from '../components/dashboard/requests';
import { AllRoles } from '../utils/constants';

const DashboardRouting = () => {
  return (
    <>
      <Route path="/dashboard" exact component={MainBoard} />
      {/* Admin Routes */}
      <Route path="/dashboard/data" component={Data} />
      <Route path="/dashboard/requests" component={Requests} />
      {/* <DashboardRoute
        path="/dashboard/users"
        component={StudentsComponent}
        allowedRole={AllRoles.admin}
      />
      <DashboardRoute
        path="/dashboard/quizes"
        component={AllQuizesComponent}
        allowedRole={AllRoles.admin}
      />
      <DashboardRoute
        path="/dashboard/levels"
        component={Levels}
        allowedRole={AllRoles.admin}
      />
      <DashboardRoute
        path="/dashboard/take-quiz"
        component={TakeQuizComponent}
        allowedRole={AllRoles.students}
      /> */}
    </>
  );
};

export default DashboardRouting;
