import { createRouter, createWebHistory } from "vue-router"
import HomePage from "@/views/HomePage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import DashboardRoot from "@/views/DashboardRoot.vue";
import DashboardPage from "@/views/DashboardPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: HomePage
        },
        {
            path: "/register",
            component: RegistrationPage
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardRoot,
            children: [
                {
                    path: "",
                    component: DashboardPage
                }
            ]
        },
    ],
});

export default router;
