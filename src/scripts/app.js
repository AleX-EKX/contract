import { inputs } from "./modules/inputs.js";
import { imask } from "./libraries/imask/imask.js";
import { header } from "./modules/header.js";
import { cookie } from "./modules/cookie.js";
import { callback } from "./modules/callback.js";
import { mobileMenu } from "./modules/mobileMenu.js";

inputs();
imask();
callback();
cookie();
header();
mobileMenu();
