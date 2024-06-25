import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from '@/routes/root.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "@/components/error-page";
import Introduction from './routes/introduction'
import Examples from './routes/examples'
import { FfmpegProvider } from './components/ffmpeg-provider'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Introduction />,
      },
      {
        path: "docs",
        element: <div>Docs</div>,
      },
      {
        path: "examples",
        element: <Examples />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <FfmpegProvider>
        <RouterProvider router={router}/>
      </FfmpegProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
