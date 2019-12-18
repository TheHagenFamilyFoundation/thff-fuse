// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

console.log(
    "environment.ts environment = " + localStorage.getItem("backend_url")
);

const environment = {
    production: false,
    envName: "dev",
    API_URL: "http://localhost:1337",
    hmr: false
};

console.log("environment.ts environment = " + environment);

export { environment };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

//TODO can remove
//old
// console.log("url = " + localStorage.getItem('backend_url'));

// const environment = {
//   production: false,
//   envName: 'dev',
//   API_URL: 'http://localhost:1337'
// };

// console.log("environment = " + environment);

// export { environment };
