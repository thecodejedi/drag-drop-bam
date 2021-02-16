import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CalculationDatapointListComponent } from './calculation-datapoint-list/calculation-datapoint-list.component';
import { CalculationMainDisplayComponent } from './calculation-main-display/calculation-main-display.component';
import { CalculationOperatorsComponent } from './calculation-operators/calculation-operators.component';
import { CalculationStripComponent } from './calculation-strip/calculation-strip.component';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';


@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, DragDropModule, OverlayModule, MatIconModule, MatSidenavModule],
  declarations: [AppComponent, CalculationMainDisplayComponent, CalculationOperatorsComponent, CalculationStripComponent, ClickStopPropagationDirective, CalculationDatapointListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
