import "regenerator-runtime/runtime";
import React from "react";
import {
  AppGraphData,
  GraphLink,
  GraphNode,
  getNeighborhood,
  LinkDirections,
} from ".";

it("should be separate from DOM-oriented modules", () => {
  type mvm1 = AppGraphData;
  type mvm2 = GraphNode;
  type mvm3 = GraphLink;

  console.log(getNeighborhood);
  console.log(LinkDirections);

  expect(true).toBeTruthy();
});

it("should pass a fake test", () => {
  expect(true).toBeTruthy();
});
