import { Guid } from "./guid";

export class TreeNodeCls implements TreeNode {
  /**
   *
   */
  constructor(node: TreeNodeData) {
    this.id = Guid.newGuid().toString();
    this.text = node.text;
    this.children = node.children;
    this.isExpanded = node.isExpanded;
    this.allowChildren = node.allowChildren;
    this.isSelected = node.isSelected;
  }

  id: string;
  text: string;
  children: TreeNode[];
  isExpanded?: boolean;
  allowChildren: boolean;
  isSelected: boolean;
}

export interface TreeNodeData {
  text: string;
  children: TreeNode[];
  isExpanded?: boolean;
  allowChildren: boolean;
  isSelected: boolean;
}

export interface TreeNode extends TreeNodeData {
  id: string;
}

export interface DropInfo {
  targetId: string;
  action?: string;
}

export var operators: TreeNode[] = [
  new TreeNodeCls({
    text: "+",
    allowChildren: false,
    children: [],
    isSelected: false
  }),
  new TreeNodeCls({
    text: "-",
    allowChildren: false,
    children: [],
    isSelected: false
  }),
  new TreeNodeCls({
    text: "*",
    allowChildren: false,
    children: [],
    isSelected: false
  }),
  new TreeNodeCls({
    text: "/",
    allowChildren: false,
    children: [],
    isSelected: false
  })
];

export var demoData: TreeNode[] = [
  new TreeNodeCls({
    text: "14",
    allowChildren: false,
    children: [],
    isSelected: false
  }),
  new TreeNodeCls({
    text: "X",
    allowChildren: false,
    children: [],
    isSelected: false
  }),
  new TreeNodeCls({
    text: "SUMME",
    allowChildren: true,
    isSelected: false,
    isExpanded: true,
    children: [
      new TreeNodeCls({
        text: "BLOX",
        allowChildren: true,
        children: [
          new TreeNodeCls({
            text: "Datenpunkt A1",
            allowChildren: false,
            children: [],
            isSelected: false
          }),
          new TreeNodeCls({
            text: "Datenpunkt A2",
            allowChildren: false,
            children: [],
            isSelected: false
          }),
          new TreeNodeCls({
            text: "Datenpunkt A3",
            allowChildren: false,
            children: [],
            isSelected: false
          })
        ],
        isSelected: false
      }),
      new TreeNodeCls({
        text: "Datenpunkt A2",
        allowChildren: false,
        children: [],
        isSelected: false
      }),
      new TreeNodeCls({
        text: "Datenpunkt A3",
        allowChildren: false,
        children: [],
        isSelected: false
      })
    ]
  }),
  new TreeNodeCls({
    text: "/",
    allowChildren: false,
    children: [],
    isSelected: false
  }),
  new TreeNodeCls({
    text: "CO2",
    allowChildren: false,
    children: [],
    isSelected: false
  })
];