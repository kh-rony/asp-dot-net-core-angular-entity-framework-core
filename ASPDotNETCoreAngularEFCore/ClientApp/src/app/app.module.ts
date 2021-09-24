import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { GetTestComponent } from "./get-test/get-test.component";
import { AddTestComponent } from "./add-test/add-test.component";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./state/reducers/test.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TestEffect } from "./state/effects/test.effect";
import { TestService } from "./services/test.service";
import { HighchartsChartComponent } from 'highcharts-angular';
import { ReadingService } from "./services/reading.service";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        CounterComponent,
        FetchDataComponent,
        // newly added portion start
        GetTestComponent,
        AddTestComponent,
        HighchartsChartComponent
        // newly added portion end
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        // newly added portion start
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
            test: reducer,
            reading: reducer
        }),
        EffectsModule.forRoot([TestEffect]),
        // newly added portion end
        RouterModule.forRoot([
            {path: '', component: HomeComponent, pathMatch: 'full'},
            {path: 'counter', component: CounterComponent},
            {path: 'fetch-data', component: FetchDataComponent},
            // newly added portion start
            {path: 'get-test', component: GetTestComponent},
            {path: 'register-test', component: AddTestComponent},
            {path: 'test/update/:id', component: AddTestComponent},
            {path: '**', redirectTo: 'home'}
            // newly added portion end
        ])
    ],
    providers: [/* newly added portion start */TestService, ReadingService/* newly added portion end */],
    bootstrap: [AppComponent]
})
export class AppModule
{
}
