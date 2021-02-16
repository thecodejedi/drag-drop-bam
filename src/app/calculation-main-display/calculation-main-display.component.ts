import { Component, OnInit } from '@angular/core';
import { operators, TreeNode } from 'src/data';

@Component({
  selector: 'app-calculation-main-display',
  templateUrl: './calculation-main-display.component.html',
  styleUrls: ['./calculation-main-display.component.css']
})
export class CalculationMainDisplayComponent implements OnInit {

  constructor() { }

  operators: TreeNode[] = operators;

  ngOnInit(): void {
  }

  nodeSelected(node: TreeNode) {

  }
}
