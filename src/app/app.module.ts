import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgMaterialMultilevelMenuModule,
  MultilevelMenuService,
} from 'ng-material-multilevel-menu';
//import { MaterialsModule } from './modules/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import {
  DxDataGridModule,
  DxFormModule,
  DxSelectBoxModule,
  DevExtremeModule,
  DxChartModule,
  DxPieChartModule,
  DxTextAreaModule,
  DxTabPanelModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';
import { DxButtonModule } from 'devextreme-angular/ui/button';

import { TopNavComponent } from './top-nav/top-nav.component';
import { LoginComponent } from './login/login.component';

import { MomentPipe } from './Config/MomentPipe';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './alert/confirm.component';
import { EdulevelComponent } from './EduLevel/EduLevel.component';
import { EduEditComponent } from './EduLevel/edu-edit/edu-edit.component';
import { DrugsEditComponent } from './Drugs/drugs-edit/drugs-edit.component';
import { DrugsComponent } from './Drugs/drugs.component';
import { ManageplaceComponent } from './manageplace/manageplace.component';

import { PlaceEditComponent } from './manageplace/obj-edit/place-edit.component';
import { AddictComponent } from './addict/addict.component';
import { DetailViewComponent } from './addict/detail-view/detail-view.component';
import { DetailDrugsComponent } from './addict/detail-drugs/detail-drugs.component';
//import { DevGridComponent } from './dev-grid/dev-grid.component';
import { UserComponent } from './user/user.component';
import { userEditComponent } from './user/user-edit/user-edit.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { LoadingComponent } from './Shared/loading/loading.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';

import { AuthGuard } from './Helpers/canActivateAuthGuard';
import { Helpers } from './Helpers/helpers';
import { AppConfig } from './Config/config';
import { NavService } from './Shared/Services/nav.service';
import { ManagePlaceService } from './Shared/Services/manageplace.service';
import { ConfirmService } from './Shared/Services/confirm.service';
import { baseService } from './Shared/Services/base.service';
import { EmployeeService } from './Shared/Services/employee.service';
import { UserService } from './Shared/Services/user.service';
import { UsesService } from './Shared/Services/uses.service';
import { AlertService } from './Shared/Services/alert.service';
import { EduLevelService } from './Shared/Services/eduLevel.service';
import { DrugsService } from './Shared/Services/drugs.service';
import { TokenService } from './Shared/Services/token.service';
import { AddictDrugsService } from './Shared/Services/addictdrug.service';
import { AddictPlaceService } from './Shared/Services/addictplace.service';
import { addictService } from './Shared/Services/addict.service';
import { DashBoardService } from './Shared/Services/Dash.service';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginlayoutComponent } from './loginlayout/loginlayout.component';
import { DatagridTestComponent } from './datagrid-test/datagrid-test.component';
import { AddictPlaceComponent } from './addictPlace/addictplace.component';
import { AddictDrugComponent } from './addictDrug/addictdrug.component';
import { AddictDrugEditComponent } from './addictDrug/obj-edit/addictdrug-edit.component';
import { AddictPlaceEditComponent } from './addictPlace/obj-edit/addictplace-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddictSearchComponent } from './addict-search/addict-search.component';
import { ClassifyComponent } from './classify/classify.component';
import { ClassifyEditComponent } from './classify/classify-edit/classify-edit.component';
import { ClassifyService } from './Shared/Services/classify.service';
import { AddictclassifyComponent } from './addictclassify/addictclassify.component';
import { AddictClassifyService } from './Shared/Services/addictclassify.service';
import { AddictClassifyEditComponent } from './addictclassify/obj-edit/addictclassify-edit.component';
import { MoveHistoryComponent } from './moveHistory/moveHistory.component';
import { AddictVehicleComponent } from './addictVehicle/addictVehicle.component';
import { AddictVehicleEditComponent } from './addictVehicle/obj-edit/addictVehicle-edit.component';
import { AddictVehicleService } from './Shared/Services/addictVehicle.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import vi from '@angular/common/locales/vi';

import en from '@angular/common/locales/en';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { RelationsComponent } from './relations/relations.component';
import { RelationsEditComponent } from './relations/relations-edit/relations-edit.component';
import { RelationsService } from './Shared/Services/relations.service';
import { AddictRelationsService } from './Shared/Services/addictrelations.service';
import { ConfigService } from './Shared/Services/config.service';
// import { ImportExcelComponent } from './addict/import-excel/import-excel.component';
import { ImportExcelComponent } from './manageplace/import-excel/import-excel.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
registerLocaleData(en);

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LoginComponent,
    AlertComponent,
    ConfirmComponent,
    MomentPipe,
    EdulevelComponent,
    EduEditComponent,
    DrugsComponent,
    DrugsEditComponent,
    ManageplaceComponent,
    PlaceEditComponent,
    AddictComponent,
    AddictPlaceComponent,
    AddictPlaceEditComponent,
    AddictDrugComponent,
    AddictDrugEditComponent,
    DetailViewComponent,
    DetailDrugsComponent,
    UserComponent,
    userEditComponent,
    Dashboard1Component,
    LoadingComponent,
    Dashboard2Component,
    HomeComponent,
    NavigationComponent,
    LoginlayoutComponent,
    DatagridTestComponent,
    ChangePasswordComponent,
    AddictSearchComponent,
    ClassifyComponent,
    ClassifyEditComponent,
    AddictclassifyComponent,
    AddictClassifyEditComponent,
    MoveHistoryComponent,
    AddictVehicleComponent,
    AddictVehicleEditComponent,
    RelationsComponent,
    RelationsEditComponent,
    ImportExcelComponent,
  ],
  imports: [
    CommonModule,
    NzAlertModule,
    NzUploadModule,
    BrowserModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialMultilevelMenuModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSelectFilterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    DxChartModule,
    DxPieChartModule,
    DxDataGridModule,
    DxFormModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxTabPanelModule,
    DxFileUploaderModule,
    DxButtonModule,
    FlexLayoutModule,
    NzTableModule,
    NzPaginationModule,
    NzMenuModule,
    NzPopoverModule,
    NzTabsModule,
    NzAutocompleteModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
    MultilevelMenuService,
    NzMessageService,
    NavService,
    Helpers,
    AuthGuard,
    AppConfig,
    EduLevelService,
    DrugsService,
    EmployeeService,
    ManagePlaceService,
    baseService,
    TokenService,
    ConfirmService,
    AlertService,
    AddictDrugsService,
    AddictPlaceService,
    addictService,
    UserService,
    UsesService,
    DashBoardService,
    ClassifyService,
    AddictClassifyService,
    AddictVehicleService,
    RelationsService,
    AddictRelationsService,
    { provide: MAT_DATE_LOCALE, useValue: 'vi_VN' },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
