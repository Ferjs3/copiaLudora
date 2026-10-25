import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { UserList } from './pages/user-list/user-list';
import { Profile } from './pages/profile/profile';
import { Catalog } from './pages/catalog/catalog';
import { Know } from './pages/know/know';
import { GameDetail } from './pages/game-detail/game-detail';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'user-list', component: UserList},
    {path: 'profile', component: Profile},
    {path: 'catalog', component: Catalog},
    {path: 'game/:id', component: GameDetail},
    {path: 'about', component: Know},
    { path: '**', redirectTo: '' }
];
