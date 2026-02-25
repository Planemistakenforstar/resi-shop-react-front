import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import {Toaster} from 'sonner';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { useAuthStore } from './auth/store/auth.store';


export const TesloShopApp = () => {
  const queryClient = new QueryClient();



  const CheckAuthProvider = ({children} : PropsWithChildren) =>{
    const {checkAuthStatus} = useAuthStore();

    const { isLoading } = useQuery({
      queryKey: ['auth'],
      queryFn: checkAuthStatus,
      retry: false,
      refetchInterval: 1000*60*1.5,
      refetchOnWindowFocus: true,
    });
    if( isLoading ) {
      return <CustomFullScreenLoading/>
    }  

    return children;
  }




    return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      { /* Custom Provider */}
      <CheckAuthProvider>
            <RouterProvider router={appRouter}></RouterProvider>
      </CheckAuthProvider>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
};