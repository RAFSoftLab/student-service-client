import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  //localStorage.setItem('jwt', 'token'); //  localStorage se pamti na nivou brauzera

  if (localStorage.getItem('jwt') === null){
    router.navigate(['login'])
    return false
  }
    

  return true;
};
