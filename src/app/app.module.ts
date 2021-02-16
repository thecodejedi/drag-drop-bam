import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalculationMainDisplayComponent } from './calculation-main-display/calculation-main-display.component';
import { CalculationOperatorsComponent } from './calculation-operators/calculation-operators.component';
import { CalculationStripComponent } from './calculation-strip/calculation-strip.component';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';



@NgModule({
  imports: [BrowserModule, FormsModule, DragDropModule, OverlayModule, MatIconModule],
  declarations: [AppComponent, CalculationMainDisplayComponent, CalculationOperatorsComponent, CalculationStripComponent, ClickStopPropagationDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
