import { createRouter, createWebHistory, useRoute, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router"
import Home from "@/views/home.vue";
import NotFound from "@/views/not-found.vue";
import SignIn from "@/views/sign-in.vue";
import SignUp from "@/views/sign-up.vue";
import Dashboard from "@/views/dashboard.vue";
import DashboardNotFond from "@/views/dashboard/not-found.vue";
import GroupList from "@/views/dashboard/group-list.vue";
import GroupDetail from "@/views/dashboard/group-detail.vue";
import ChoreList from "@/views/dashboard/chore-list.vue";
import ChoreSetList from "@/views/dashboard/chore-set-list.vue";
import ChoreTaskList from "@/views/dashboard/chore-task-list.vue";
import Account from "@/views/dashboard/account.vue";

import { useAuth } from "@/stores/auth.store";
import { assertAuthenticated } from "./utils/assert-authenticated";
import { useGroups } from "./stores/groups.store";

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
    text: ((route: RouteLocationNormalized) => string) | string;
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
                    meta: {
                        breadcrumbs: [
                            {
                                text: "Groups"
                            }
                        ] as Breadcrumb[],
                    },
                },
                {
                    path: "groups/:id",
                    name: "group-detail",
                    component: GroupDetail,
                    beforeEnter: requireAuthenticated,
                    meta: {
                        breadcrumbs: [
                            {
                                text: "Groups",
                                to: { name: "group-list" },
                            },
                            {
                                text: (route) => {
                                    const groups = useGroups();
                                    const group = groups.groupList.find((group) => group.id === route.params.id);
                                    return group?.display_name ?? "";
                                },
                            }
                        ] as Breadcrumb[],
                    },
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
export type { Breadcrumb };
