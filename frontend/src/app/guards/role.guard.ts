import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const RoleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  let role;
  if(localStorage){
    role = localStorage.getItem('role');
  }

  if (role && role == 'admin') {
    return true;
  }
  router.navigate(['/admin-login'])
  return false;

};
