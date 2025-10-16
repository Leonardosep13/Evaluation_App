import { AdminLayout } from "../layouts/AdminLayout/AdminLayout"
import { HomeAdmin, Profesores, Materias, Secciones, SubjectAssigments, Students } from "../pages"

const routesAdmin = [
    {
        path: "/",
        layout: AdminLayout,
        component: HomeAdmin,
    },
    {
        path: "/admin/teachers",
        layout: AdminLayout,
        component: Profesores,
    },
    {
        path: "/admin/subjects",
        layout: AdminLayout,
        component: Materias,
    },
    {
        path: "/admin/sections",
        layout: AdminLayout,
        component: Secciones,
    },
    {
        path: "/admin/students",
        layout: AdminLayout,
        component: Students,
    },
    {
        path: "/admin/subject-assignments",
        layout: AdminLayout,
        component: SubjectAssigments,
    },
]

export default routesAdmin