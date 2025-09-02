// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  BellOutlined,
  UserOutlined,
  ProductOutlined,
  BankOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  BankOutlined,
  LoadingOutlined,
  UserOutlined,
  BellOutlined,
  ProductOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'management',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.UserOutlined
    },
     {
      id: 'util-typography',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.ProductOutlined
    },
     {
      id: 'util-typography',
      title: 'Loans',
      type: 'item',
      url: '/loans',
      icon: icons.BankOutlined
    },
    {
      id: 'util-typography',
      title: 'Notifications',
      type: 'item',
      url: '/notification',
      icon: icons.BellOutlined
    }
  ]
};

export default utilities;
