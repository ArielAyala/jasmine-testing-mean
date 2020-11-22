import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { of, Subject } from "rxjs";
import { PINS } from "src/app/services/mocks/pins";
import { RepositoryService } from "src/app/services/repository.service";

import { PinsComponent } from "./pins.component";
import { PinsService } from "./pins.service";

class RepositoryServiceStub {
  observer = new Subject();
  getPins() {
    return this.observer;
  }

  resolvePins() {
    this.observer.next(JSON.parse(JSON.stringify(PINS)));
  }

  updatePin() {
    return of(true);
  }
}

class MatSnackBarStub {
  open() {}
}

class PinsServiceStub {
  observer = new Subject();
  $actionObserver = this.observer.asObservable();
  resolve(action) {
    return this.observer.next(action);
  }
}

fdescribe("PinsComponent", () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinsComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: PinsService, useClass: PinsServiceStub },
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("When new page is open", () => {
    const open = spyOn(window, "open");
    component.openUrl("https://platzi.com");

    expect(open).toHaveBeenCalledWith("https://platzi.com", "_blank");
  });

  it("When update progress", () => {
    component.pins = PINS;
    const pind = PINS[0];
    const updatePin = spyOn(
      (<any>component).repository,
      "updatePin"
    ).and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, "open");
    const pinService = TestBed.get(PinsService);

    pinService.resolve("save");

    expect(open).toHaveBeenCalled();
  });
});
