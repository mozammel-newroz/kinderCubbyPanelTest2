import React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import IntlMessages from '../../../../utils/IntlMessages';
import { Home, PostAdd } from '@material-ui/icons';
import SchoolIcon from '@material-ui/icons/School';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BugReportIcon from '@material-ui/icons/BugReport';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PersonIcon from '@material-ui/icons/Person';
import GrainIcon from '@material-ui/icons/Grain';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const useStyles = makeStyles(() => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
    },
  },
}));

const navigationMenus = [
  {
    name: 'Dashboard',
    type: 'item',
    icon: <EqualizerIcon />,
    link: '/home',
  },
  {
    name: 'Hobby',
    type: 'item',
    icon: <FavoriteBorder />,
    link: '/hobby',
  },
  {
    name: 'Skill',
    type: 'item',
    icon: <TrendingUpIcon />,
    link: '/skill',
  },
  {
    name: 'Degree',
    type: 'item',
    icon: <SchoolIcon />,
    link: '/degree',
  },
  {
    name: 'Allergy',
    type: 'item',
    icon: <BugReportIcon />,
    link: '/allergy',
  },
  {
    name: 'Book',
    type: 'collapse',
    icon: <MenuBookIcon />,
    children: [
      {
        name: 'Genre',
        type: 'item',
        icon: <GrainIcon />,
        link: '/genre',
      },
      {
        name: 'Publication',
        type: 'item',
        icon: <AccountBalanceIcon />,
        link: '/publication',
      },
      {
        name: 'Author',
        type: 'item',
        icon: <PersonIcon />,
        link: '/author',
      },
    ],
  },
];

const SideBar = () => {
  const classes = useStyles();

  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      <CmtVertical menuItems={navigationMenus} />
    </PerfectScrollbar>
  );
};

export default SideBar;
