import { debounce } from '@agentepsilon/decko';
import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { DropInfo, TreeNode, TreeNodeCls } from '../data';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  dragInfoClearedEvent: EventEmitter<void> = new EventEmitter();
  droppedEvent: EventEmitter<void> = new EventEmitter();

  // ids for connected drop lists
  dropTargetIds: string[] = [];
  private nodeLookup: { [name: string]: TreeNode } = {};
  private dropActionTodo: DropInfo = null;

  rootNodes: TreeNode[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) { }

  registerRoot(node: TreeNode) {
    this.rootNodes.push(node);
    this.prepareDragDrop(node);
  }

  private prepareDragDrops(nodes: TreeNode[]) {
    nodes.forEach(node => this.prepareDragDrop(node));
  }

  private prepareDragDrop(node: TreeNode) {
    this.dropTargetIds.push(node.id);
    this.nodeLookup[node.id] = node;
    this.prepareDragDrops(node.children);
  }

  @debounce(50)
  dragMoved(event: CdkDragMove<string>) {
    let mainContainer = this.document.getElementById(this.rootNodes.find(item => item.text == "main").id);
    let rects = mainContainer.getBoundingClientRect();
    var y = rects.y + rects.height - 30;
    console.log(y);

    let e = this.document.elementFromPoint(event.pointerPosition.x, y);



    if (!e) {
      this.clearDragInfo();
      return;
    }

    let blox = e.classList.contains("node-blox") ? e : e.closest(".node-blox");
    let item = e.classList.contains("node-item") ? e : e.closest(".node-item");

    if (!blox && !item) {
      this.clearDragInfo();
      return;
    }
    let container;
    if (blox) {
      container = blox;
    }
    if (item) {
      container = item;
    }

    this.dropActionTodo = {
      targetId: container.getAttribute("data-id")
    };

    if (blox && !item) {
      this.setBloxAction(event, blox);
    } else if (item) {
      this.setItemAction(event, item);
    } else {
      this.clearDragInfo(false);
    }

    this.showDragInfo();
  }

  setItemAction(event, container) {

    const targetRect = container.getBoundingClientRect();
    const breakPosition = targetRect.width / 2;

    if (event.pointerPosition.x - targetRect.left < breakPosition) {
      this.dropActionTodo["action"] = "before";
    } else if (event.pointerPosition.x - targetRect.left > breakPosition) {
      this.dropActionTodo["action"] = "after";
    }
  }

  setBloxAction(event, container) {

    const targetRect = container.getBoundingClientRect();
    const breakPosition = targetRect.width / 5;

    if (event.pointerPosition.x - targetRect.left < breakPosition) {
      this.dropActionTodo["action"] = "before";
    } else if (event.pointerPosition.x - targetRect.left > 4 * breakPosition) {
      this.dropActionTodo["action"] = "after";
    } else {
      this.dropActionTodo["action"] = "inside";
    }
  }

  drop(event: CdkDragDrop<string>) {
    if (!this.dropActionTodo) return;

    const draggedItemId: string = event.item.data;
    const parentItemId = event.previousContainer.id;
    let targetListId;
    for (const parent in this.rootNodes) {
      var node = this.rootNodes[parent];
      targetListId = this.getParentNodeId(this.dropActionTodo.targetId, [node], node.id);
      if (targetListId) {
        break;
      }
    }

    console.log(
      '\nmoving\n[' + draggedItemId + '] from list [' + parentItemId + ']',
      '\n[' + this.dropActionTodo.action + ']\n[' + this.dropActionTodo.targetId + '] from list [' + targetListId + ']');

    let draggedItem = this.nodeLookup[draggedItemId];

    const parentItem = this.nodeLookup[parentItemId];
    const oldItemContainer = parentItem.children;
    const targetItem = this.nodeLookup[targetListId];
    const newContainer = targetItem.children;

    console.log(parentItem);
    console.log(targetItem);
    if (targetItem.readOnly) {
      this.clearDragInfo(false);
      return;
    }

    if (parentItem.readOnly) {
      draggedItem = new TreeNodeCls(draggedItem);
      this.prepareDragDrop(draggedItem);
    } else {
      let i = oldItemContainer.findIndex(c => c.id === draggedItemId);
      oldItemContainer.splice(i, 1);
    }


    switch (this.dropActionTodo.action) {
      case 'before':
      case 'after':
        const targetIndex = newContainer.findIndex(c => c.id === this.dropActionTodo.targetId);
        if (this.dropActionTodo.action == 'before') {
          newContainer.splice(targetIndex, 0, draggedItem);
        } else {
          newContainer.splice(targetIndex + 1, 0, draggedItem);
        }
        break;

      case 'inside':
        this.nodeLookup[this.dropActionTodo.targetId].children.push(draggedItem)
        this.nodeLookup[this.dropActionTodo.targetId].isExpanded = true;
        break;
    }

    this.clearDragInfo(true)
  }

  getParentNodeId(id: string, nodesToSearch: TreeNode[], parentId: string): string {
    for (let node of nodesToSearch) {
      if (node.id == id) return parentId;
      let ret = this.getParentNodeId(id, node.children, node.id);
      if (ret) return ret;
    }
    return null;
  }

  showDragInfo() {
    this.clearDragInfo();
    if (this.dropActionTodo) {
      this.document.getElementById("node-" + this.dropActionTodo.targetId).classList.add("drop-" + this.dropActionTodo.action);
    }
  }

  clearDragInfo(dropped = false) {
    if (dropped) {
      this.dropActionTodo = null;
      this.droppedEvent.emit(null);
    }

    this.document
      .querySelectorAll(".drop-before")
      .forEach(element => element.classList.remove("drop-before"));
    this.document
      .querySelectorAll(".drop-after")
      .forEach(element => element.classList.remove("drop-after"));
    this.document
      .querySelectorAll(".drop-inside")
      .forEach(element => element.classList.remove("drop-inside"));

    this.dragInfoClearedEvent.emit(null);
  }
}
