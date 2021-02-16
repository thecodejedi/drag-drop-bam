import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { TreeNode, TreeNodeCls } from '../../data';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-calculation-datapoint-list',
  templateUrl: './calculation-datapoint-list.component.html',
  styleUrls: ['./calculation-datapoint-list.component.scss']
})
export class CalculationDatapointListComponent implements OnInit {


  private datapointRoot: TreeNode;

  get datapoints(): TreeNode[] {
    return this.datapoints;
  }

  @Input()
  set datapoints(value: TreeNode[]) {

    this.datapointRoot = new TreeNodeCls({
      allowChildren: true,
      children: value,
      isSelected: false,
      text: "datapoints",
      isExpanded: true,
      readOnly: true,
      isHighlighted: false,
    });

    this.nodeService.registerRoot(this.datapointRoot);
  }

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
  }


  private dragMoved(event: CdkDragMove<string>) {
    this.nodeService.dragMoved(event);
  }

  private drop(event: CdkDragDrop<string>) {
    this.nodeService.drop(event);
  }

}
