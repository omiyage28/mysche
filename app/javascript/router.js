import Vue from "vue"
import Router from "vue-router"
import Top from "./src/components/tops/Top.vue"
import Calendar from "./src/components/calendar/Calendar.vue"

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "top",
			component: Top,
		},
		{
			path: "/schedules",
			name: "calendar",
			component: Calendar,
		},
	],
})
