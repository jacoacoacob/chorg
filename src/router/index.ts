import { createRouter, createWebHistory } from "vue-router"
import HomeContainer from "@/views/home.vue";
import HomeBase from "@/views/home/index.vue";
import Register from "@/views/home/register.vue";
import DashboardContainer from "@/views/dashboard.vue";
import DashboardBase from "@/views/dashboard/index.vue";

import { useAuth } from "@/stores/auth.store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: HomeContainer,
            children: [
                {
                    path: "",
                    name: "home",
                    component: HomeBase,
                },
                {
                    path: "register",
                    name: "register",
                    component: Register
                }
            ],
        },
        {
            path: "/dashboard",
            component: DashboardContainer,
            beforeEnter() {
                const auth = useAuth();

                if (!auth.user) {
                    return "/"
                }
                console.log(auth.user)
            },
            children: [
                {
                    path: "",
                    name: "dashboard",
                    component: DashboardBase
                }
            ]
        },
    ],
});

export default router;
