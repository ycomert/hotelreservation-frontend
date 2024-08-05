import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EventComponent } from './components/event/event.component';
import { RedirectComponent } from './components/redirect/redirect.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "event",
        component: EventComponent
    },
    {
        path: "redirect",
        component: RedirectComponent
    }

];
