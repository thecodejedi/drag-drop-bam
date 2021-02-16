import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { demoData, TreeNode, TreeNodeCls } from 'src/data';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-calculation-strip',
  templateUrl: './calculation-strip.component.html',
  styleUrls: ['./calculation-strip.component.scss']
})
export class CalculationStripComponent implements OnInit {

  @Output()
  highlightNodeChanged: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  @Output()
  selectedNodeChanged: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  rootNode: TreeNode = new TreeNodeCls({
    allowChildren: true,
    children: demoData,
    isSelected: false,
    text: "main",
    isExpanded: true,
    isHighlighted: false
  })

  constructor(private nodeService: NodeService, private _elemRef: ElementRef) {
    this.nodeService.registerRoot(this.rootNode);
  }

  ngOnInit(): void {
  }

  private get dropTargetIds(): string[] {
    return this.nodeService.dropTargetIds;
  }

  private dragMoved(event: CdkDragMove<string>) {
    this.nodeService.dragMoved(event);
  }

  private drop(event: CdkDragDrop<string>) {
    this.nodeService.drop(event);
  }

  private toggleNode(node: TreeNode) {
    node.isExpanded = !node.isExpanded;
  }

  private highlightNode(node: TreeNode) {
    this.clearSelections(this.rootNode);
    console.log("HIGHLIGHT: " + node);
    node.isHighlighted = true;
    this.highlightNodeChanged.emit(node);
  }

  private selectNode(node: TreeNode) {
    this.clearSelections(this.rootNode);
    console.log("SELECT: " + node);
    node.isSelected = true;
    this.selectedNodeChanged.emit(node);
  }

  private clearSelections(...nodes: TreeNode[]) {
    nodes.forEach(node => {
      node.isSelected = false;
      node.isHighlighted = false;
      this.clearSelections(...node.children);
    });
  }

}
