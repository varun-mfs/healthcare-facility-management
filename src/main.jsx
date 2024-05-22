import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.js'   // creating materialUI theme
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthProvider } from './features/authentication/provider/AuthProvider.jsx'


console.log('router', router);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline: resetting the default html styling  */}
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
