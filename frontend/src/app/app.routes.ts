import { RoleGuard } from './guards/role.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "login",
        loadComponent: 
            ()=> import("./components/auth/components/login/login.component")
            .then(c=> c.LoginComponent)
    },
    {
        path: "register",
        loadComponent: 
            ()=> import("./components/auth/components/register/register.component")
            .then(c=> c.RegisterComponent)
    }, 
    {
        path: "admin-login",
        loadComponent: 
            ()=> import("./components/auth/components/admin-login/admin-login.component")
            .then(c=> c.AdminLoginComponent)
    },
    {
        path: "admin",
        canActivate: [RoleGuard],
        loadComponent: 
        ()=> import("./components/admin-layouts/admin-layouts.component")
        .then(c=> c.AdminLayoutsComponent),
        children: [
            {
                path: "",
                loadComponent: 
                ()=> import("./components/users/components/user/user.component")
                .then(c=> c.UserComponent)
            },
            {
                path: "user",
                loadComponent: 
                    ()=> import("./components/users/components/user/user.component")
                    .then(c=> c.UserComponent)
            },
            {
                path: "training-program/:id",
                loadComponent: 
                    ()=> import("./components/training-programs/components/training-program/training-program.component")
                    .then(c=> c.TrainingProgramComponent)
            },
            {
                path: "training-programs",
                loadComponent: 
                    ()=> import("./components/training-programs/components/list-training-program/list-training-program.component")
                    .then(c=> c.ListTrainingProgramComponent)
            },
            {
                path: "category",
                loadComponent: 
                    ()=> import("./components/categories/components/category/category.component")
                    .then(c=> c.CategoryComponent)
            },
            {
                path: "movement",
                loadComponent: 
                    ()=> import("./components/movements/components/movement/movement.component")
                    .then(c=> c.MovementComponent)
            },
        ]
        
    },
    {
        path: "",
        loadComponent: 
            ()=> import("./components/home/home.component")
            .then(c=> c.HomeComponent)
    },
    
    {
        path: "",
        loadComponent: 
        ()=> import("./components/layouts/layouts.component")
        .then(c=> c.LayoutsComponent),
        children: [
            {
                path: "home",
                loadComponent: 
                    ()=> import("./components/home/home.component")
                    .then(c=> c.HomeComponent)
            },
            {
                path: "training-program",
                loadComponent: 
                    ()=> import("./components/training-programs/components/training-program/training-program.component")
                    .then(c=> c.TrainingProgramComponent)
            },
          
       
        
        ]
    },

    
];
