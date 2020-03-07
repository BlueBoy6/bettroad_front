module.exports = {
	transpileDependencies: ['vuetify'],
	pwa: {
		name: 'Bettroad App - Paris là !',
		themeColor: '#141414',
		msTileColor: '#ffffff',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
		iconPaths: {
			favicon32: 'img/icons/icon-72x72.png',
			favicon16: 'img/icons/icon-72x72.png',
			appleTouchIcon: 'img/icons/icon-384x384.png',
			maskIcon: 'img/icons/icon-152x152.png',
			msTileImage: 'img/icons/icon-384x384.png'
		},
		// configure the workbox plugin
		workboxPluginMode: 'GenerateSW'
		// workboxOptions: {
		// 	// swSrc is required in InjectManifest mode.
		// 	swSrc: "dev/sw.js"
		// 	// ...other Workbox options...
		// }
	}
};
