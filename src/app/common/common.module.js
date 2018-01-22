import angular from 'angular';
import HTTPModule from './http/http.module';

const CommonModule = angular
  .module('smartx.common', [
    HTTPModule
  ])
  .name;

export default CommonModule;
