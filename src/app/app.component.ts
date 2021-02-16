import { debounce } from "@agentepsilon/decko";
import { CdkDragStart } from "@angular/cdk/drag-drop";
import { DOCUMENT } from "@angular/common";
import { Component, Inject, ViewChild, ViewEncapsulation } from "@angular/core";
import { SelectContainerComponent } from "ngx-drag-to-select";
import { demoData, DropInfo, operators, TreeNode, TreeNodeCls } from "../data";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    blockMode: boolean;

    @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;

    selectedDocuments: TreeNode[] = [];

    disableSelection: boolean;

    nodes: TreeNode[] = demoData;

    operators: TreeNode[] = operators;

    // ids for connected drop lists
    dropTargetIds = [];
    nodeLookup = {};
    dropActionTodo: DropInfo = null;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.prepareDragDrops(this.nodes);
        this.prepareDragDrops(this.operators);
    }

    prepareDragDrops(nodes: TreeNode[]) {
        nodes.forEach(node => this.prepareDragDrop(node));
    }

    prepareDragDrop(node: TreeNode) {
        this.dropTargetIds.push(node.id);
        this.nodeLookup[node.id] = node;
        this.prepareDragDrops(node.children);
    }

    clearSelection(node: TreeNode) {
        node.isSelected = false;
        this.clearSelections(node.children);
    }

    clearSelections(nodes: TreeNode[]) {
        nodes.forEach(node =>
            this.clearSelection(node));
    }

    getSelectedNodes(nodes: TreeNode[]): TreeNode[] {

        if (!nodes) {
            return [];
        }

        var selected = nodes.filter(item => item ?? item.isSelected);

        var recursiveSelected = nodes.reduce((acc, item) => acc.concat(this.getSelectedNodes(item.children)), []);

        return selected.concat(recursiveSelected);
    }

    startDragging(event) {
        this.stopBlock();
        this.disableSelection = true;
        this.selectContainer.clearSelection();
        this.selectContainer.update();
    }

    copyDragStart(event: CdkDragStart) {
        const tempTodo = event.source.dropContainer.data.slice();
        const indexValue = tempTodo.indexOf(event.source.element.nativeElement.innerText);
        const movableValue = tempTodo.splice(indexValue, 1).join();
        event.source.dropContainer.data.splice(indexValue, 0, movableValue);
    }

    @debounce(50)
    dragMoved(event) {
        let e = this.document.elementFromPoint(event.pointerPosition.x, event.pointerPosition.y);

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
        const targetRect = container.getBoundingClientRect();
        const oneThird = targetRect.width / 3;

        if (event.pointerPosition.x - targetRect.left < oneThird) {
            // before
            this.dropActionTodo["action"] = "before";
        } else if (event.pointerPosition.x - targetRect.left > 2 * oneThird) {
            // after
            this.dropActionTodo["action"] = "after";
        } else {
            if (blox && !item) {
                this.dropActionTodo["action"] = "inside";
            } else {
                this.clearDragInfo();
            }
        }
        this.showDragInfo();
    }

    drop(event) {
        if (!this.dropActionTodo) return;

        const draggedItemId = event.item.data;
        const parentItemId = event.previousContainer.id;
        const targetListId = this.getParentNodeId(this.dropActionTodo.targetId, this.nodes, 'main');

        console.log(
            '\nmoving\n[' + draggedItemId + '] from list [' + parentItemId + ']',
            '\n[' + this.dropActionTodo.action + ']\n[' + this.dropActionTodo.targetId + '] from list [' + targetListId + ']');

        let draggedItem = this.nodeLookup[draggedItemId];

        var oldItemContainer;
        if (parentItemId == 'main') {
            oldItemContainer = this.nodes;
        } else if (parentItemId != 'operatorList') {
            oldItemContainer = this.nodeLookup[parentItemId].children;
        }

        const newContainer = targetListId != 'main' ? this.nodeLookup[targetListId].children : this.nodes;

        if (parentItemId != 'operatorList') {
            let i = oldItemContainer.findIndex(c => c.id === draggedItemId);
            oldItemContainer.splice(i, 1);
        } else {
            draggedItem = new TreeNodeCls(draggedItem);
            this.prepareDragDrop(draggedItem);
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
            this.disableSelection = false;
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
    }

    startBlock() {
        this.blockMode = true;
        this.selectContainer.clearSelection();
        this.clearSelections(this.nodes);
    }

    stopBlock() {
        this.blockMode = false;
        this.selectedDocuments = [];
        this.selectContainer.clearSelection();
        this.clearSelections(this.nodes);
    }

    itemSelected(event: TreeNode) {
        event.isSelected = true;
    }

    itemDeselected(event: TreeNode) {
        if (!event) {
            return;
        }
        event.isSelected = false;
    }

    selectionEnded(event: TreeNode[]) {

        if (!this.blockMode) {
            return;
        }

        console.log(event);

        console.log("SELECTED:")
        console.log(this.selectedDocuments);

        const selected: TreeNode[] = [];
        this.selectedDocuments.forEach(val => selected.push(Object.assign({}, val)));
        this.selectedDocuments.forEach(item => {
            item.isSelected = true
            console.log(item);
        });

        this.selectedDocuments = [];

        this.selectContainer.clearSelection();
        this.stopBlock();
        alert("This would be a block now");
    }

    selectedCalc(event: any) {
        console.log("SelectedCla");
    }

    toggleNode(node: TreeNode) {
        node.isExpanded = !node.isExpanded;
        if (!node.isExpanded) {
            this.clearSelection(node);
        }

    }

    get selectedTreeNodes(): TreeNode[] {
        return this.getSelectedNodes(this.nodes);
    }
}
