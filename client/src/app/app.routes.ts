import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShowRoomComponent } from './pages/show-room/show-room.component';
import { KnowMoreComponent } from './pages/know-more/know-more.component';
import { Error404ViewsComponent } from './pages/error404-views/error404-views.component';
import { LatestNewsComponent } from './pages/latest-news/latest-news.component';
import { NewCarsComponent } from './pages/new-cars/new-cars.component';
import { UsedCarsComponent } from './pages/used-cars/used-cars.component';
import { MotorsComponent } from './pages/motors/motors.component';
import { BoatsComponent } from './pages/boats/boats.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'show-room', component: ShowRoomComponent },
    { path: 'know-more', component: KnowMoreComponent },
    { path: 'latest-news', component: LatestNewsComponent },
    { path: 'new-cars', component: NewCarsComponent },
    { path: 'used-cars', component: UsedCarsComponent },
    { path: 'motors', component: MotorsComponent },
    { path: 'boats', component: BoatsComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'thank-you', component: ThankYouComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', component: Error404ViewsComponent } // Catch-all route for invalid URLs
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } // Added the class declaration for the routing module