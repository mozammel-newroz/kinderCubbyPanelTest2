import React from 'react';
import { PostAdd } from '@material-ui/icons';
import CmtHorizontal from '../../../../../../@coremat/CmtNavigation/Horizontal';
import IntlMessages from '../../../../../utils/IntlMessages';

const navigationMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];

const HeaderNavigations = () => {
  return <CmtHorizontal menuItems={navigationMenus} />;
};

export default HeaderNavigations;
