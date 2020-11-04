import { routes } from "./app-routing.module";
import { PinsComponent } from "./components/pins/pins.component";

fdescribe("App Routing", () => {
  beforeAll(() => {
    console.log("beforeAll");
  });

  beforeEach(() => {
    console.log("beforeEach");
  });

  afterAll(() => {
    console.log("alterAll");
  });

  afterEach(() => {
    console.log("afterEach");
  });

  it("Should have app as path", () => {
    expect(routes[0].path).toBe("app");
  });

  it("Should have the childrens", () => {
    expect(routes[0].children).toContain({
      path: "pins",
      component: PinsComponent,
    });
  });
});
