import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "login",
        loadComponent: 
            ()=> import("./components/auth/components/login/login.component")
            .then(c=> c.LoginComponent)
    },
    {
        path: "admin-login",
        loadComponent: 
            ()=> import("./components/auth/components/admin-login/admin-login.component")
            .then(c=> c.AdminLoginComponent)
    },
    {
        path: "register",
        loadComponent: 
            ()=> import("./components/auth/components/register/register.component")
            .then(c=> c.RegisterComponent)
    }, 

    {
        path: "admin",
        loadComponent: 
        ()=> import("./components/admin-layouts/admin-layouts.component")
        .then(c=> c.AdminLayoutsComponent),
        children: [
            {
                path: "",
                loadComponent: 
                    ()=> import("./components/home/home.component")
                    .then(c=> c.HomeComponent)
            },
        ]
    },
    
    {
        path: "",
        loadComponent: 
        ()=> import("./components/layouts/layouts.component")
        .then(c=> c.LayoutsComponent),
        children: [
            {
                path: "",
                loadComponent: 
                    ()=> import("./components/home/home.component")
                    .then(c=> c.HomeComponent)
            },
        ]
    }

    
];
