"use strict";var app=angular.module("sunflower",["ngRoute","ngAnimate"]);app.config(["$routeProvider",function(a){a.when("/",{title:"Home",templateUrl:"views/home.html",controller:"MainCtrl"}).when("/calendar",{title:"Calendar",templateUrl:"views/calendar.html",controller:"MainCtrl"}).when("/gallery",{title:"Gallery",templateUrl:"views/gallery.html",controller:"MainCtrl"}).when("/gallery/:picture",{title:"Gallery",templateUrl:"views/picture.html",controller:"MainCtrl"}).when("/contact",{title:"Contact",templateUrl:"views/contact.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]);var menuItems=[{name:"Home",icon:"fa-home",url:"/"},{name:"Calendar",icon:"fa-calendar-o",url:"/calendar"},{name:"Gallery",icon:"fa-camera",url:"/gallery"}],aboutPics={mission:"http://imageshack.com/a/img921/4271/KKN28c.jpg",owner:"http://imageshack.com/a/img923/6964/c0SpyJ.jpg"},aboutItems=[{thumb:"http://imagizer.imageshack.us/v2/640x480q90/921/m6XAad.jpg",title:"Learn/Play Room",text:"Blah blah blah"},{thumb:"http://imagizer.imageshack.us/v2/640x480q90/922/MFGSFt.jpg",title:"Nap Room",text:"Blah blah blah"},{thumb:"http://imagizer.imageshack.us/v2/640x480q90/921/i4R4GB.jpg",title:"Play Ground",text:"Blah blah blah"}],carouselItems=[{url:"http://imageshack.com/a/img924/360/lCrKns.jpg",h:"Sunflower Child Care",p:"Just what your child needs to learn through playing",active:!0}],carouselItemsMobile=[{url:"http://imagizer.imageshack.us/v2/1024x768q90/405/z26i.jpg",h:"Sunflower Child Care",p:"Just what your child needs to learn through playing",active:!0}],morningSchedule=[{time:"8:00AM - 9:00AM",description:"Arrival time, Free Play"},{time:"9:00AM - 9:30AM",description:"Breakfast"},{time:"9:30AM - 10:00AM",description:"Clean up, Free Play"},{time:"10:00AM - 10:30AM",description:"Academics (Letters, Numbers, Science, Art, etc)"},{time:"10:30AM - 11:00AM",description:"Snack Time"},{time:"11:00AM - 12:00PM",description:"Outside Play"}],afternoonSchedule=[{time:"12:00 PM - 12:40PM",description:"Lunch"},{time:"12:40PM - 1:00PM",description:"Clean up, Preparing for Nap"},{time:"1:00PM - 3:00PM",description:"Nap Time"},{time:"3:00PM - 3:30PM",description:"Wake up time"},{time:"3:30PM - 4:00PM",description:"Snack Time"},{time:"4:00PM - 4:30PM",description:"Story time"},{time:"4:30PM - 5:30PM",description:"Outside/Inside Free Play"},{time:"5:30PM - 6:00PM",description:"Prepare for pick-up"},{time:"6:00PM",description:"Childcare closes"}],_thumbs=["http://imagizer.imageshack.us/v2/280x200q90/921/KKN28c.jpg","http://imagizer.imageshack.us/v2/280x200q90/922/MFGSFt.jpg","http://imagizer.imageshack.us/v2/280x200q90/921/m6XAad.jpg","http://imagizer.imageshack.us/v2/280x200q90/921/UmOAot.jpg","http://imagizer.imageshack.us/v2/280x200q90/921/i4R4GB.jpg","http://imagizer.imageshack.us/v2/280x200q90/922/foHZn7.jpg","http://imagizer.imageshack.us/v2/280x200q90/921/S1PcHW.jpg","http://imagizer.imageshack.us/v2/280x200q90/922/pS984i.jpg","http://imagizer.imageshack.us/v2/280x200q90/922/aOnyyR.jpg","http://imagizer.imageshack.us/v2/280x200q90/923/ZxD6Pr.jpg","http://imagizer.imageshack.us/v2/280x200q90/922/4pbsrd.jpg","http://imagizer.imageshack.us/v2/280x200q90/921/NLF4wL.jpg","http://imagizer.imageshack.us/v2/280x200q90/924/jErclA.jpg","http://imagizer.imageshack.us/v2/280x200q90/923/n9ch9A.jpg","http://imagizer.imageshack.us/v2/280x200q90/923/KFLyLv.jpg","http://imagizer.imageshack.us/v2/280x200q90/924/uYmSvf.jpg","http://imagizer.imageshack.us/v2/280x200q90/922/bcMkm2.jpg","http://imagizer.imageshack.us/v2/280x200q90/921/uG2OeC.jpg","http://imagizer.imageshack.us/v2/280x200q90/922/9H3wRL.jpg","http://imagizer.imageshack.us/v2/280x200q90/921/CjjXRQ.jpg"],_fullSizes=["http://imagizer.imageshack.us/v2/1024x768q90/921/KKN28c.jpg","http://imagizer.imageshack.us/v2/1024x768q90/922/MFGSFt.jpg","http://imagizer.imageshack.us/v2/1024x768q90/921/m6XAad.jpg","http://imagizer.imageshack.us/v2/1024x768q90/921/UmOAot.jpg","http://imagizer.imageshack.us/v2/1024x768q90/921/i4R4GB.jpg","http://imagizer.imageshack.us/v2/1024x768q90/922/foHZn7.jpg","http://imagizer.imageshack.us/v2/1024x768q90/921/S1PcHW.jpg","http://imagizer.imageshack.us/v2/1024x768q90/922/pS984i.jpg","http://imagizer.imageshack.us/v2/1024x768q90/922/aOnyyR.jpg","http://imagizer.imageshack.us/v2/1024x768q90/923/ZxD6Pr.jpg","http://imagizer.imageshack.us/v2/1024x768q90/922/4pbsrd.jpg","http://imagizer.imageshack.us/v2/1024x768q90/921/NLF4wL.jpg","http://imagizer.imageshack.us/v2/1024x768q90/924/jErclA.jpg","http://imagizer.imageshack.us/v2/1024x768q90/923/n9ch9A.jpg","http://imagizer.imageshack.us/v2/1024x768q90/923/KFLyLv.jpg","http://imagizer.imageshack.us/v2/1024x768q90/924/uYmSvf.jpg","http://imagizer.imageshack.us/v2/1024x768q90/922/bcMkm2.jpg","http://imagizer.imageshack.us/v2/1024x768q90/921/uG2OeC.jpg","http://imagizer.imageshack.us/v2/1024x768q90/922/9H3wRL.jpg","http://imagizer.imageshack.us/v2/1024x768q90/921/CjjXRQ.jpg"],pictures=_thumbs.map(function(a,b){return{name:"p"+(b+1),thumb:a,fullsize:_fullSizes[b]}});_thumbs.forEach(function(a,b){pictures[b].thumb=a});var app=angular.module("sunflower");app.controller("MainCtrl",["$scope","$routeParams","$location",function(a,b){var c;a.carouselItems=carouselItems,a.carouselItemsMobile=carouselItemsMobile,a.morningSchedule=morningSchedule,a.afternoonSchedule=afternoonSchedule,a.pictures=pictures,a.aboutPics=aboutPics,a.aboutItems=aboutItems,a.findPicture=function(b){for(var c=a.pictures,d=c.length,e=0;d>e;e++)if(c[e].name===b)return{curr:c[e],prev:0>e-1?c[d-1]:c[e-1],next:e+1>=d?c[0]:c[e+1]};return null},b.picture&&(c=a.findPicture(b.picture),a.curr=c.curr,a.prev=c.prev,a.next=c.next)}]),app.controller("NavCtrl",["$scope","$location","$rootScope",function(a,b,c){a.menuItems=menuItems,a.show=!0,a.$on("$routeChangeSuccess",function(d,e){c.title=e.$$route.title,a.menuItems.forEach(function(a){var c=new RegExp(a.url),d=b.path();a.isActive=!1,a.isActive="/"===a.url&&"/"===d?!0:"/"===a.url?!1:c.test(d)}),a.show=!/gallery\/.+/.test(b.path()),a.scalable=a.show?"no":"yes"})}]);