import angular from 'angular';
import HomeModule from './home/home.module';

const ComponentsModule = angular
  .module('app.components', [
    HomeModule
  ])
  .name;

export default ComponentsModule;
