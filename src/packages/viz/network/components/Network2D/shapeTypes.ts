// styling of node, including basic shape
export type NodeStyle = {
  shape?: "triangle" | "square" | (() => "triangle" | "square");
  color?: string | (() => string);
};

// position of node in space
export type NodePos = { x?: number; y?: number; z?: number };
