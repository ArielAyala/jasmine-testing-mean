import { getTestBed, TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ApiService } from "./api.service";
import { environment } from "src/environments/environment";

fdescribe("ApiService", () => {
  let service: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    injector = getTestBed();
    service = TestBed.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterAll(() => {
    injector = null;
    service = null;
    httpMock = null;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("GET", () => {
    it("Should execute GET", () => {
      const result = "testing";
      service.get("/test").subscribe((response) => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + "/test");
      expect(req.request.method).toBe("GET");
      req.flush(result);
    });
  });
});
