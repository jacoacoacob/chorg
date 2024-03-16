
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router"
import Home from "@/views/home.vue";
import NotFound from "@/views/not-found.vue";
import SignIn from "@/views/sign-in.vue";
import SignUp from "@/views/sign-up.vue";
import Dashboard from "@/views/dashboard.vue";
import DashboardGroup from "@/views/dashboard-group.vue";

import { useAuth } from "@/stores/auth.store";
import { assertAuthenticated } from "./utils/assert-authenticated";
import type { ComputedRef } from "vue";

function requireAuthenticated(
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    try {
        assertAuthenticated();
        next();
    } catch (_error) {
        next({ name: "home" })
    }
}

interface Breadcrumb {
    to?: ((route: RouteLocationNormalized) => RouteLocationNormalized) | RouteLocationNormalized;
    text: ComputedRef<(route: RouteLocationNormalized) => string> | string;
}

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
            name: "dashboard",
            component: Dashboard,
            beforeEnter: requireAuthenticated,
            children: [
                {
                    path: ":groupId",
                    name: "group",
                    component: DashboardGroup
                }
            ]
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFound,
        },
    ],
});

export default router;
export type { Breadcrumb };
