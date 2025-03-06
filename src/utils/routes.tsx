import { WelcomePage } from '@pages/Welcome.page';
import { HomePage } from '@pages/Home.page'
import { OrderPage } from '@pages/Order.page';
import { ItemsPage } from '@pages/settings/Items.page';
import { CreateItemPage } from '@pages/settings/CreateItem.page';
import { IconHome2 } from '@tabler/icons-react';

export const ROUTES = [
  {
    path: '/',
    element: <WelcomePage />,
    
  },
  {
    path: '/home',
    element: <HomePage />,
    icon: IconHome2,
    name: 'Home page',
    show: true
  },
  {
    path: '/order',
    element: <OrderPage />,
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