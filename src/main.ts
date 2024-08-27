import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.postcss";
import App from "./App.vue";

import Home from "./routes/Home.vue";
import Help from "./routes/Help.vue";
import Security from "./routes/Security.vue";
import Error from "./routes/Error.vue";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: Home },
		{ path: "/help", component: Help },
		{ path: "/security", component: Security }
	]
});

createApp(App).use(router).mount("#app");
