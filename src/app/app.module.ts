import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {NgModule, ApplicationRef} from '@angular/core';
import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import {RouterModule, PreloadAllModules} from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import {Angular2FontAwesomeModule} from 'angular2-font-awesome';
import {EmojiModule} from 'angular2-emoji';
//import {MdListModule} from "@angular2-material/list/list";

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { requestOptionsProvider }   from './default-request-options.service';

// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import '../styles/styles.scss';
import '../styles/headings.css';
//import {RegisterComponent} from './register/register.component';
import {UserService} from './shared/services/index';
import {MdListModule} from "@angular/material";
import {SplitviewComponent} from "./shared/splitview/splitview.component";
import { ConnectionComponent } from './GIN/connection/connection.component';
import {ContactComponent} from "./contact/contact.component";
import {ModalComponent} from "./shared/modal/modal.component";
import { RegisterComponent } from './GIN/register/register.component';
import { WorkbenchComponent } from "./shared/workbench/workbench.component";
import {ResetPasswordComponent} from "./GIN/resetPassword/resetPassword.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./shared/services/authentication.service";
import {HomeComponent} from "./home/home.component";
import {LogoutComponent} from "./GIN/logout/logout.component";
import {ResetGuard} from "./_guards/reset.guard";
import {StatusComponent} from "./GIN/status/status.component";
import {StatusService} from "./shared/services/status.service";
import {GroupComponent} from './group/group.component';
import {GroupService} from './shared/services/group.service';
import {Service} from './shared/services/service';
import {ProfileComponent} from "./GIN/profile/profile.component";
import {AvatarComponent} from "./_avatar/avatar.component";
import {AvatarOverlayComponent} from "./_avatar/overlay/avatar-overlay.component";
import {RecordComponent} from "./chattManager/record/record.component";
import {VideoComponent} from "./chattManager/video/video.component";

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import {SenderComponent} from "./+message/_sender/sender.component";
import {ReceiverComponent} from "./+message/_receiver/receiver.component";
import {MessageComponent} from "./+message/message.component";
import {CommonModule} from "@angular/common";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    FileSelectDirective,
    FileDropDirective,
    ConnectionComponent,
    NoContentComponent,
    RegisterComponent,
    WorkbenchComponent,
    HomeComponent,
    SplitviewComponent,
    ContactComponent,
    ModalComponent,
    AvatarComponent,
    AvatarOverlayComponent,
    LogoutComponent,
    ResetPasswordComponent,
    StatusComponent,
    GroupComponent,
    ProfileComponent,
    RecordComponent,
    VideoComponent,
    SenderComponent,
    ReceiverComponent,
    MessageComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterializeModule,
    Angular2FontAwesomeModule,
    CommonModule,
    EmojiModule,
    //MdListModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    requestOptionsProvider,
    UserService,
    AuthGuard,
    ResetGuard,
    AuthenticationService,
    StatusService,
    GroupService,
    Service
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
