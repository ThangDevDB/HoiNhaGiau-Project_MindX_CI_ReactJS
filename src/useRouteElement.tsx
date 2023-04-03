import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './contants/path'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import PorductList from './pages/ProductList'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import UserLayout from './pages/User/layouts/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import PageNotFound from './pages/PageNotFound404'

// Neu dang nhap roi se vao dc cac trang profile,...Chua dang nhap thi se ve trang dang nhap
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

// Neu dang nhap or dang ki roi se khong dc phep vao lai trang login va register
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <PorductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '/',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/cart',
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        },
        {
          path: path.user,
          children: [
            {
              path: path.profile,
              element: (
                <MainLayout>
                  <UserLayout>
                    <Profile />
                  </UserLayout>
                </MainLayout>
              )
            },
            {
              path: path.profile,
              element: (
                <MainLayout>
                  <UserLayout>
                    <ChangePassword />
                  </UserLayout>
                </MainLayout>
              )
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])
  return routeElements
}
