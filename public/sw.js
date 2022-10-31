// const CACHE_NAME = "version-1"


// const self = this;

// self.addEventListener('install',(e)=>{
// e.waitUntil(

//     caches.open(CACHE_NAME)
//     .then((cache)=>{
// return cache.addAll([
//     '/static/js/bundle.js',
//     '/index.html',
//     '/'
// ]);
//     })
// )
// })

// self.addEventListener('fetch',(e)=>{
// e.respondWith(
//     caches.match(e.request)
//     .then(()=>{
//         return fetch(e.request)
//         .catch(()=>(caches.match(e.request).then((res)=>{
//             if(res){
//                 return res
//             }
//         })  ))
//     })
// )
// })

// // self.addEventListener('activate',(e)=>{
// // const cacheWhiteList=[]
// // cacheWhiteList.push(CACHE_NAME)

// // e.waitUntil(
// //     caches.keys()
// //     .then((cacheNames)=>{Promise.all(cacheNames.map)})
// // )
// // })
