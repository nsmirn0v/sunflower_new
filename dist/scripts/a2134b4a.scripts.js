"use strict";var app=angular.module("sunflower",["ngRoute","ngAnimate"]);app.config(["$routeProvider",function(a){a.when("/",{title:"Home",templateUrl:"views/home.html",controller:"MainCtrl"}).when("/calendar",{title:"Calendar",templateUrl:"views/calendar.html",controller:"MainCtrl"}).when("/gallery",{title:"Gallery",templateUrl:"views/gallery.html",controller:"MainCtrl"}).when("/gallery/:picture",{title:"Gallery",templateUrl:"views/picture.html",controller:"MainCtrl"}).when("/contact",{title:"Contact",templateUrl:"views/contact.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]);var menuItems=[{name:"Home",icon:"fa-home",url:"/"},{name:"Calendar",icon:"fa-calendar-o",url:"/calendar"},{name:"Gallery",icon:"fa-picture-o",url:"/gallery"},{name:"Contact",icon:"fa-envelope-o",url:"/contact"}],carouselItems=[{url:"http://imageshack.com/a/img405/1989/z26i.jpg",h:"Sunflower Child Care",p:"Just what your child needs to learn through playing",active:!0},{url:"http://imageshack.com/a/img6/4425/wnnk.jpg",h:"Friendly Enviroment",p:"Let your child spend a day in a playful and friendly enviroment"},{url:"http://imageshack.com/a/img841/2199/e0y5.jpg",h:"Making new friends",p:"Great way to get used to communicating with other kids around and make friends"}],carouselItemsMobile=[{url:"http://imagizer.imageshack.us/v2/1024x768q90/405/z26i.jpg",url1:"http://imagizer.imageshack.us/v2/800x600q90/405/z26i.jpg",h:"Sunflower Child Care",p:"Just what your child needs to learn through playing",active:!0},{url:"http://imagizer.imageshack.us/v2/800x600q90/6/wnnk.jpg",h:"Friendly Enviroment",p:"Let your child spend a day in a playful and friendly enviroment"},{url:"http://imagizer.imageshack.us/v2/800x600q90/841/e0y5.jpg",h:"Making new friends",p:"Great way to get used to communicating with other kids around and make friends"}],morningSchedule=[{time:"8:00AM - 9:00AM",description:"Arrival time, Free Play"},{time:"9:00AM - 9:30AM",description:"Breakfast"},{time:"9:30AM - 10:00AM",description:"Clean up, Free Play"},{time:"10:00AM - 10:30AM",description:"Academics (Letters, Numbers, Science, Art, etc)"},{time:"10:30AM - 11:00AM",description:"Snack Time"},{time:"11:00AM - 12:00PM",description:"Outside Play"}],afternoonSchedule=[{time:"12:00 PM - 12:40PM",description:"Lunch"},{time:"12:40PM - 1:00PM",description:"Clean up, Preparing for Nap"},{time:"1:00PM - 3:00PM",description:"Nap Time"},{time:"3:00PM - 3:30PM",description:"Wake up time"},{time:"3:30PM - 4:00PM",description:"Snack Time"},{time:"4:00PM - 4:30PM",description:"Story time"},{time:"4:30PM - 5:30PM",description:"Outside/Inside Free Play"},{time:"5:30PM - 6:00PM",description:"Prepare for pick-up"},{time:"6:00PM",description:"Childcare closes"}],pictures=[{name:"p1",fullsize:"http://imageshack.com/a/img43/8645/kv56.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/43/kv56.jpg"},{name:"p2",fullsize:"http://imageshack.com/a/img209/1721/gyy6.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/209/gyy6.jpg"},{name:"p3",fullsize:"http://imageshack.com/a/img585/4802/8cea.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/585/8cea.jpg"},{name:"p4",fullsize:"http://imageshack.com/a/img407/1734/ef0k.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/407/ef0k.jpg"},{name:"p5",fullsize:"http://imageshack.com/a/img825/1971/pp7d.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/825/pp7d.jpg"},{name:"p6",fullsize:"http://imageshack.com/a/img692/9776/awkh.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/692/awkh.jpg"},{name:"p7",fullsize:"http://imageshack.com/a/img41/9346/qbtt.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/41/qbtt.jpg"},{name:"p8",fullsize:"http://imageshack.com/a/img689/5892/qfab.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/689/qfab.jpg"},{name:"p2",fullsize:"http://imageshack.com/a/img209/1721/gyy6.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/209/gyy6.jpg"},{name:"p3",fullsize:"http://imageshack.com/a/img585/4802/8cea.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/585/8cea.jpg"},{name:"p4",fullsize:"http://imageshack.com/a/img407/1734/ef0k.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/407/ef0k.jpg"},{name:"p5",fullsize:"http://imageshack.com/a/img825/1971/pp7d.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/825/pp7d.jpg"},{name:"p6",fullsize:"http://imageshack.com/a/img692/9776/awkh.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/692/awkh.jpg"},{name:"p7",fullsize:"http://imageshack.com/a/img41/9346/qbtt.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/41/qbtt.jpg"},{name:"p8",fullsize:"http://imageshack.com/a/img689/5892/qfab.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/689/qfab.jpg"},{name:"p2",fullsize:"http://imageshack.com/a/img209/1721/gyy6.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/209/gyy6.jpg"},{name:"p3",fullsize:"http://imageshack.com/a/img585/4802/8cea.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/585/8cea.jpg"},{name:"p4",fullsize:"http://imageshack.com/a/img407/1734/ef0k.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/407/ef0k.jpg"},{name:"p5",fullsize:"http://imageshack.com/a/img825/1971/pp7d.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/825/pp7d.jpg"},{name:"p6",fullsize:"http://imageshack.com/a/img692/9776/awkh.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/692/awkh.jpg"},{name:"p7",fullsize:"http://imageshack.com/a/img41/9346/qbtt.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/41/qbtt.jpg"},{name:"p8",fullsize:"http://imageshack.com/a/img689/5892/qfab.jpg",thumb:"http://imagizer.imageshack.us/v2/320x240q90/c/689/qfab.jpg"}],app=angular.module("sunflower");app.controller("MainCtrl",["$scope","$routeParams","$location",function(a,b){var c;a.carouselItems=carouselItems,a.carouselItemsMobile=carouselItemsMobile,a.morningSchedule=morningSchedule,a.afternoonSchedule=afternoonSchedule,a.pictures=pictures,a.findPicture=function(b){for(var c=a.pictures,d=c.length,e=0;d>e;e++)if(c[e].name===b)return{curr:c[e],prev:0>e-1?c[d-1]:c[e-1],next:e+1>=d?c[0]:c[e+1]};return null},b.picture&&(c=a.findPicture(b.picture),a.curr=c.curr,a.prev=c.prev,a.next=c.next)}]),app.controller("NavCtrl",["$scope","$location","$rootScope",function(a,b,c){a.menuItems=menuItems,a.show=!0,a.$on("$routeChangeSuccess",function(d,e){c.title=e.$$route.title,a.menuItems.forEach(function(a){var c=new RegExp(a.url),d=b.path();a.isActive=!1,a.isActive="/"===a.url&&"/"===d?!0:"/"===a.url?!1:c.test(d)}),a.show=!/gallery\/.+/.test(b.path()),a.scalable=a.show?"no":"yes"})}]);