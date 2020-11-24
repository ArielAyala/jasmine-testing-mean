import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NavigationService } from "./navigation.service";

import { RepositoryService } from "./repository.service";

fdescribe("RepositoryService", () => {
  let service: NavigationService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [NavigationService],
      imports: [RouterTestingModule],
    })
  );

  beforeEach(() => {
    service = TestBed.get(NavigationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should navigate to pins", () => {
    const navigate = spyOn((<any>service).router, "navigate");

    service.goToPins();

    expect(navigate).toHaveBeenCalledWith(["/app/pins"]);
  });

  it("should navigate to edit mode", () => {
    const navigate = spyOn((<any>service).router, "navigate");

    service.goToEditMode();

    expect(navigate).toHaveBeenCalledWith(["/app/add"]);
  });

});
