const angular = require('angular');

const HomeController = () => {
    this.welcome = "Hello World! We're using Angular!";
};

angular.module("app").controller('HomeController', HomeController);

