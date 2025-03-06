import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './App.css'

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { Navbar } from '@components/Navbar/Navbar';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <div style={{
        display: 'flex',
        height: '100%'
      }}>
        <nav style={{
          width: '200px',
          height: '100%'
        }}>
          <Navbar />
        </nav>
        <main style={{
          width: 'calc(100% - 200px)'
        }}>
        <Router />
        </main>
      </div>
    </MantineProvider>
  );
}
