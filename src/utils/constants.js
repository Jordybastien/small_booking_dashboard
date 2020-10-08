import {
  faCog,
  faUsers,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCalendarAlt,
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';

export const AllRoles = Object.freeze({
  admin: 'admin',
});

export const AllRoutes = [
  {
    activeRoute: 'dashboard',
    icon: faCog,
    label: 'Dashboard',
    goTo: '/dashboard',
  },
  {
    activeRoute: 'requests',
    icon: faLayerGroup,
    label: 'Requests',
    goTo: '/dashboard/requests',
  },
];
