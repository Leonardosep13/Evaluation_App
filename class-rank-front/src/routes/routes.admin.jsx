import { AdminLayout } from "../layouts/AdminLayout/AdminLayout"
import { HomeAdmin, LoginAdmin} from "../pages/Admin"

const routesAdmin = [

    {
        path: "/admin",
        layout: AdminLayout,
        component: HomeAdmin,
    }
]

export default routesAdmin