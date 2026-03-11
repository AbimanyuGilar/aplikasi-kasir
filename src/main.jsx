import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import Layout from '@/Layout.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from "@/components/app-sidebar"
import Home from '@/pages/Home.jsx'
import History from './pages/History';
import Products from './pages/Products';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SidebarProvider>
        <AppSidebar />
        <main className='flex-1 min-w-0'>
          <SidebarTrigger />
          <Layout />
        </main>
      </SidebarProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "history",
        element: <History />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
