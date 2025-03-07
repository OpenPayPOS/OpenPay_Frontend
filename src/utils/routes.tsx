import { WelcomePage } from '@pages/Welcome.page';
import { HomePage } from '@pages/Home.page'
import { OrderPage } from '@pages/Order.page';
import { ItemsPage } from '@pages/settings/Items.page';
import { CreateItemPage } from '@pages/settings/CreateItem.page';
import { IconHome2, IconSettings } from '@tabler/icons-react';
import SettingsPage from '@pages/settings/Settings.page';

export const ROUTES = [
  {
    path: '/',
    element: <WelcomePage />,
    
  },
  {
    path: '/home',
    element: <HomePage />,
    icon: IconHome2,
    name: 'Home',
    show: true
  },
  {
    path: '/order',
    element: <OrderPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    show: true,
    name: 'Settings',
    icon: IconSettings
  },
  {
    path: '/settings/items',
    element: <ItemsPage />,
  },
  {
    path: '/settings/items/create',
    element: <CreateItemPage />,
  },
  {
    show: false
  }
]