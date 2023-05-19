import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root/Root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import VideoDetail from './pages/VideoDetail/VideoDetail';
import { DarkModeProvider } from './Context/DarkModeContext';
import { YoutubeApiProvider } from './Context/YoutubeApiContext';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'videos', element: <Home /> },
      { path: 'videos/:keyword', element: <Home /> },
      { path: 'videos/detail/:detailId', element: <VideoDetail /> },
    ],
  },
]);

function App() {
  return (
    <YoutubeApiProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </DarkModeProvider>
    </YoutubeApiProvider>
  );
}

export default App;
