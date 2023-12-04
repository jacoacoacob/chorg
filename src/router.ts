import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router"
import Home from "@/views/home.vue";
import NotFound from "@/views/not-found.vue";
import SignIn from "@/views/sign-in.vue";
import SignUp from "@/views/sign-up.vue";
import Dashboard from "@/views/dashboard.vue";
import DashboardNotFond from "@/views/dashboard/not-found.vue";
import GroupList from "@/views/dashboard/group-list.vue";
import ChoreList from "@/views/dashboard/chore-list.vue";
import ChoreSetList from "@/views/dashboard/chore-set-list.vue";
import ChoreTaskList from "@/views/dashboard/chore-task-list.vue";
import Account from "@/views/dashboard/account.vue";

import { useAuth } from "@/stores/auth.store";

function requireAuthenticated(
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const auth = useAuth();
    if (!auth.user) {
        return next({ name: "home" });
    }
    return next();
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
            component: Dashboard,
            children: [
                {
                    path: "groups",
                    name: "group-list",
                    component: GroupList,
                    beforeEnter: requireAuthenticated,
                },
                {
                    path: "chores",
                    name: "chore-list",
                    component: ChoreList,
                    beforeEnter: requireAuthenticated,
                },
                {
                    path: "chore-sets",
                    name: "chore-set-list",
                    component: ChoreSetList,
                    beforeEnter: requireAuthenticated,
                },
                {
                    path: "chore-tasks",
                    name: "chore-task-list",
                    component: ChoreTaskList,
                    beforeEnter: requireAuthenticated,
                },
                {
                    path: "account",
                    name: "account",
                    component: Account,
                    beforeEnter: requireAuthenticated,
                },
                {
                    path: ":pathMatch(.*)*",
                    name: "dashboard-not-found",
                    component: DashboardNotFond,
                },
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
