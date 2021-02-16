import { Component, OnInit } from '@angular/core';
import { dataPoints, operators, TreeNode } from '../../data';

@Component({
  selector: 'app-calculation-main-display',
  templateUrl: './calculation-main-display.component.html',
  styleUrls: ['./calculation-main-display.component.scss']
})
export class CalculationMainDisplayComponent implements OnInit {

  constructor() { }

  operators: TreeNode[] = operators;

  datapoints: TreeNode[] = dataPoints;

  ngOnInit(): void {
  }

  nodeSelected(node: TreeNode) {

  }
}
