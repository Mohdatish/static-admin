// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'register1',
      title: 'Create New User',
      type: 'item',
      url: '/create-user',
      icon: icons.ProfileOutlined,
      // target: true
    }
  ]
};

export default pages;
