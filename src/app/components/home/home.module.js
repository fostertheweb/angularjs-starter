import angular from 'angular';
import HomeComponent from './home.component';
import './home.scss';

const HomeModule = angular
  .module('home', [])
  .component('home', HomeComponent)
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('home', {
        url: '/',
        component: 'home'
      });
  })
  .name;

export default HomeModule;
