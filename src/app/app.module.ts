import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatSnackBar, MatSnackBarModule, MatDialogModule, MatToolbarModule, MAT_DATE_LOCALE, MatProgressSpinnerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { NotificationSnackBarComponent } from './notifications/notification-snack-bar/notification-snack-bar.component';
import { DatePipe } from '@angular/common';
import { NotificationDialogComponent } from './notifications/notification-dialog/notification-dialog.component';
import { WINDOW_PROVIDERS } from './window.providers';
import { ExcelService } from './services/excel.service';
import { AttachmentViewDialogComponent } from './notifications/attachment-view-dialog/attachment-view-dialog.component';
import { AttachmentDialogComponent } from './notifications/attachment-dialog/attachment-dialog.component';
import { RatingModule } from 'ng-starrating';
import { NgxUploaderModule } from 'ngx-uploader';
const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './allModules/authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'pages',
        loadChildren: './allModules/pages/pages.module#PagesModule'
    },
    {
        path: 'master',
        loadChildren: './allModules/master/master.module#MasterModule'
    },
    {
        path: 'reports',
        loadChildren: './allModules/reports/reports.module#ReportsModule'
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NotificationSnackBarComponent,
        NotificationDialogComponent,
        AttachmentViewDialogComponent,
        AttachmentDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, useHash: true }),
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        RatingModule,
        NgxUploaderModule
    ],
    providers: [
        DatePipe,
        ExcelService,
        WINDOW_PROVIDERS,
        {provide: MAT_DATE_LOCALE, useValue: 'en-IN'}
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        NotificationDialogComponent,
        AttachmentViewDialogComponent,
        AttachmentDialogComponent
    ]
})
export class AppModule {
}
