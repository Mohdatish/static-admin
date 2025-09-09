// import Home from './pages/home/Home';
import Users from './pages/user/Users';
import UserDetails from './pages/user/UserDetails';
import Profile from './pages/admin/Profile';
import ChangePassword from './pages/admin/ChangePassword';
import Product from './pages/product/Product';

export default [
    // { path: "/dashboard", Component: <Home /> },
    { path: "/users", Component: <Users /> },
    { path: "/users/:id", Component: <UserDetails /> },
    { path: "/my-profile", Component: <Profile /> },
    { path: "/change-password", Component: <ChangePassword /> },
    { path: "/change-password", Component: <ChangePassword /> },
    { path: "/change-password", Component: <ChangePassword /> },
    { path: "/products", Component: <Product /> },

    // { path: "/*", Component: <Home /> },
]
