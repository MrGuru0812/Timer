
import "fetch-polyfill";
import "es6-promise";
import "formdata-polyfill";
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import dreamTeam from './modules/dreamTeam';
import sendForm from './modules/sendForm';

//Timer
countTimer('20 julay 2020');

//Menu
toggleMenu();

//popap
togglePopUp();

//tabs
tabs();
//slider
slider();
//calc
calc();
//command
dreamTeam();
//send-ajax-form
sendForm();
