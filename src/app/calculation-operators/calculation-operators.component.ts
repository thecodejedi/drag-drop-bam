import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode, TreeNodeCls } from 'src/data';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-calculation-operators',
  templateUrl: './calculation-operators.component.html',
  styleUrls: ['./calculation-operators.component.css']
})
export class CalculationOperatorsComponent implements OnInit, OnChanges {

  private operatorRoot: TreeNode;

  get operators(): TreeNode[] {
    return this.operators;
  }

  @Input()
  set operators(value: TreeNode[]) {

    this.operatorRoot = new TreeNodeCls({
      allowChildren: true,
      children: value,
      isSelected: false,
      text: "Operators",
      isExpanded: true,
      readOnly: true,
      isHighlighted: false,
    });

    this.nodeService.registerRoot(this.operatorRoot);
  }



  constructor(private nodeService: NodeService) {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
  }

  startDragging(event) {

  }

  drop(event) {

  }

}
