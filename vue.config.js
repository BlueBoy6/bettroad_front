module.exports = {
	transpileDependencies: ["vuetify"],
	pwa: {
		name: "Bettroad App - Paris là !",
		themeColor: "#141414",
		msTileColor: "#ffffff",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "black",
		iconPaths: {
			favicon32: "img/icons/favicon.png",
			favicon16: "img/icons/favicon.png",
			appleTouchIcon: "img/icons/favicon.png",
			maskIcon: "img/icons/favicon.png",
			msTileImage: "img/icons/favicon.png"
		},
		// configure the workbox plugin
		workboxPluginMode: "GenerateSW"
		// workboxOptions: {
		// 	// swSrc is required in InjectManifest mode.
		// 	swSrc: "dev/sw.js"
		// 	// ...other Workbox options...
		// }
	}
};
