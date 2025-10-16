import { AdminLayout } from "../layouts/AdminLayout/AdminLayout"
import { HomeAdmin} from "../pages"

const routesAdmin = [

    {
        path: "/",
        layout: AdminLayout,
        component: HomeAdmin,
    }
]

export default routesAdmin