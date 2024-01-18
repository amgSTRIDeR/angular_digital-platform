import { AuthorizationService } from './authorization.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('AuthorizationService', () => {
  let authorizationService: AuthorizationService;
  let httpMock: HttpTestingController;
  const ApiKey = environment.apiKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorizationService],
    });

    authorizationService = TestBed.inject(AuthorizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Shoul be initialized', () => {
    expect(authorizationService).toBeTruthy();
  });

  it('Should be able to sign up', () => {
    const dummyResponse = {
      kind: 'identitytoolkit#SignupNewUserResponse',
      idToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZjdmODcyNzA5MWU0Yz…xykDQb-SBmpYr0G8cLgC01igQiib80wTe8dweDjjvrY9k0nvQ',
      email: '2@gmail.com',
      refreshToken:
        'AMf-vBzP05Z65XuCQkFMf5Zf_Dfb4U4j9Z_HSBF6JTvxxfipZ6…CiXZjsRZNWXV3RtrdSewGiWIoYp_iDmmf1dhsIP_dccyzQv3w',
      expiresIn: '3600',
      localId: 'RtCCfg8tnIgCM862STqWhKGuQmm2',
    };

    authorizationService.signUp('2@gmail.com', 'Password123!').subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const request = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKey}`);

    expect(request.request.method).toBe('POST');

    request.flush(dummyResponse);
  });
});
