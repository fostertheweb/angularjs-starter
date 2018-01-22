import angular from 'angular';
import HeaderComponent from './header.component';
import './header.scss';
import 'angular-breadcrumb';
import '@uirouter/angularjs';

const HeaderModule = angular
  .module('globalHeader', [
    'ui.router',
    'ncy-angular-breadcrumb'
  ])
  .component('globalHeader', HeaderComponent)
  .name;

export default HeaderModule;
