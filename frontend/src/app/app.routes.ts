import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { UserList } from './pages/user-list/user-list';
import { Profile } from './pages/profile/profile';
import { Catalog } from './pages/catalog/catalog';
import { Know } from './pages/know/know';
import { GameDetail } from './pages/game-detail/game-detail';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'user-list', component: UserList, canActivate: [adminGuard]},
    {path: 'profile', component: Profile, canActivate: [authGuard]},
    {path: 'catalog', component: Catalog},
    {path: 'game/:id', component: GameDetail},
    {path: 'about', component: Know},
    { path: '**', redirectTo: '' }
];
