import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/home.vue";
import SignIn from "@/views/auth/sign-in.vue";
import SignUp from "@/views/auth/sign-up.vue";
import Dashboard from "@/views/dashboard.vue";
import DashboardHome from "@/views/dashboard/index.vue";

import { useAuth } from "@/stores/auth.store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/sign-in",
            name: "sign-in",
            component: SignIn,
            beforeEnter(_to, _from, next) {
                const auth = useAuth();
                if (auth.user) {
                    next({ name: "dashboard" });
                }
                next();
            }
        },
        {
            path: "/sign-up",
            name: "sign-up",
            component: SignUp,
            beforeEnter(_to, _from, next) {
                const auth = useAuth();
                if (auth.user) {
                    next({ name: "dashboard" });
                }
                next();
            }
        },
        {
            path: "/dashboard",
            component: Dashboard,
            beforeEnter(_to, _from, next) {
                const auth = useAuth();
                if (!auth.user) {
                    return next({ name: "sign-in" });
                }
                return next();
            },
            children: [
                {
                    path: "",
                    name: "dashboard",
                    component: DashboardHome
                },
            ]
        },
    ],
});

export default router;
