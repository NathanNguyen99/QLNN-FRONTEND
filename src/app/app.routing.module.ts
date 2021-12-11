import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EdulevelComponent } from './EduLevel/EduLevel.component';
import { AuthGuard } from './Helpers/canActivateAuthGuard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { DrugsComponent } from './Drugs/drugs.component';
import { ManageplaceComponent } from './manageplace/manageplace.component';
import { AddictComponent } from './addict/addict.component';
import { UserComponent } from './user/user.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { HomeComponent } from './home/home.component';
import { LoginlayoutComponent } from './loginlayout/loginlayout.component';
import { DatagridTestComponent } from './datagrid-test/datagrid-test.component';
import { AddictPlaceComponent } from './addictPlace/addictplace.component';
import { AddictDrugComponent } from './addictDrug/addictdrug.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddictSearchComponent } from './addict-search/addict-search.component';
import { ClassifyComponent } from './classify/classify.component';
import { AddictclassifyComponent } from './addictclassify/addictclassify.component';
import { MoveHistoryComponent } from './moveHistory/moveHistory.component';
import { AddictVehicleComponent } from './addictVehicle/addictVehicle.component';
import { RelationsComponent } from './relations/relations.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/dashboard',
    data: { title: 'First Component' },
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginlayoutComponent,
    data: { title: 'First Component' },
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: Dashboard1Component },
      // { path: 'login', component: LoginComponent},
      {
        path: 'addict',
        children: [
          {
            path: 'addict',
            component: AddictComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'addict-place',
            component: AddictPlaceComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'addict-drug',
            component: AddictDrugComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'addict-search',
            component: AddictSearchComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'addict-classify',
            component: AddictclassifyComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'addict-vehicle',
            component: AddictVehicleComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'addict-move',
            component: MoveHistoryComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'category',
        children: [
          {
            path: 'drugs',
            component: DrugsComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'relations',
            component: RelationsComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'manageplace',
            component: ManageplaceComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'classify',
            component: ClassifyComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edulevel',
            component: EdulevelComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'system',
        children: [
          {
            path: 'user-account',
            component: UserComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'changepassword',
            component: ChangePasswordComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ],
  },

  // { path: 'dashboard', component: Dashboard2Component},
  //   {path: 'addict', children: [
  //        {path: 'addict', component: AddictComponent},
  //     ]},
  //   {path: 'category', children: [
  //       {path: 'drugs', component: DrugsComponent },
  //       {path: 'manageplace', component: ManageplaceComponent},
  //       {path: 'edulevel', component: EdulevelComponent}
  //   ]},
  //   {path: 'system', children: [
  //     {path: 'user-account', component: UserComponent}
  // ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

//RouterModule.forRoot(routes, { useHash: true })
