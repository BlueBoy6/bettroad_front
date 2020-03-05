module.exports = {
	transpileDependencies: ["vuetify"],
	pwa: {
		name: "Bettroad App - Paris là !",
		themeColor: "#141414",
		msTileColor: "#ffffff",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "black",
		iconPaths: {
			favicon32: "/favicon.ico",
			favicon16: "/favicon.ico",
			appleTouchIcon: "/favicon.ico",
			maskIcon: "/favicon.ico",
			msTileImage: "/favicon.ico"
		},
		// configure the workbox plugin
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			// swSrc is required in InjectManifest mode.
			swSrc: "dev/sw.js"
			// ...other Workbox options...
		}
	}
};
