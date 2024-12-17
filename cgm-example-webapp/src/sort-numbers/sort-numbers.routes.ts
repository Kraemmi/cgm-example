import { Routes } from "@angular/router";

export const sortNumbersRoutes: Routes = [
  {
    path: "sort-numbers",
    loadComponent: () =>
      import("./sort-numbers.component").then((m) => m.SortNumbersComponent),
  },
];
