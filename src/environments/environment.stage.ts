// can remove
// TODO
console.log(`environment.prod.ts - url = ${localStorage.getItem('backend_url')}`);

const environment = {
  production: true,
  envName: 'stage',
  API_URL: 'https://hagenfoundationbackend.herokuapp.com//',
  hmr: false,
};

export { environment };

// OLD
// console.log("url = " + localStorage.getItem('backend_url'));

// const environment = {
//   production: true,
//   envName: 'prod',
//   API_URL: 'https://thff-be-production.herokuapp.com/'
// };

// export { environment };
