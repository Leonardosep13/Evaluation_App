import { AdminLayout } from "../layouts/AdminLayout/AdminLayout"
import { HomeAdmin } from "../pages/Admin/HomeAdmin"

const routesAdmin = [

    {
        path: "/admin",
        layout: AdminLayout,
        component: HomeAdmin,
    }
]

export default routesAdmin