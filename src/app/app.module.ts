import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    HTTP_INTERCEPTORS,
    HttpClientModule
} from '@angular/common/http';
import { ApplicationModule } from './modules/application.module';
import { AppRoutingModule } from './appRouting.module';
import { AppComponent } from './app.component';
import {
    LayoutModule
} from './layout';
import { environment } from '../environments/environment';
import {
    AuthErrorInterceptor,
    JwtInterceptor
} from './modules/authentication/interceptors';
import {
    CashInterceptor,
    HttpRequestInterceptor
} from './common/interceptors';
import { FakeBackendInterceptor } from 'src/testing';
import { developmentFakeBackendProvider } from './common/interceptors/developmentFakeBackend.interceptor';

export const isMock = environment.mock;

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LayoutModule,
        ApplicationModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CashInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: isMock ? FakeBackendInterceptor : HttpRequestInterceptor,
            multi: true
        },
        // TODO:SM: after will be implemented all api need to remove
        developmentFakeBackendProvider,
        {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
