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

    authorizationService
      .signUp('2@gmail.com', 'Password123!')
      .subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

    const request = httpMock.expectOne(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKey}`
    );

    expect(request.request.method).toBe('POST');

    request.flush(dummyResponse);
  });

  it('should throw an error if the email already exists', () => {
    const dummyErrorResponse = {
      error: {
        message: 'EMAIL_EXISTS',
      },
    };

    const mockErrorStatus = { status: 400, statusText: 'Bad Request' };

    authorizationService.signUp('2@gmail.com', 'Password123!').subscribe({
      error: (error) => {
        expect(error).toEqual('This email exists already');
      },
    });
    const request = httpMock.expectOne(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKey}`
    );

    request.flush(dummyErrorResponse, mockErrorStatus);
  });

  it('Should throw an unknown error if error message not in the list', () => {
    const dummyErrorResponse = {
      error: {
        message: 'NOT_IN_THE_LIST',
      },
    };

    const mockErrorStatus = { status: 400, statusText: 'Bad Request' };

    authorizationService.signUp('2@gmail.com', 'Password123!').subscribe({
      error: (error) => {
        expect(error).toEqual('An unknown error occurred!');
      },
    });

    const request = httpMock.expectOne(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKey}`
    );

    request.flush(dummyErrorResponse, mockErrorStatus);
  });

  it('should twrow an unknow error if errorRes.error or errorRes.error.error is undefined', () => {
    const dummyResponse = {
      error: undefined,
    }

    const mockErrorStatus = { status: 400, statusText: 'Bad Request' };

    authorizationService.signUp('email', 'password').subscribe({
      error: (error) => {
        expect(error).toEqual('An unknown error occurred!');
      }
    })

    const request = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKey}`);

    request.flush(dummyResponse, mockErrorStatus);
  });

  it('Should twrow an "Too many attempts, try again later" error if errorRes.error.error.message is "TOO_MANY_ATTEMPTS_TRY_LATER"', () => {
    const dummyResponse = {
        error: {
          message: 'TOO_MANY_ATTEMPTS_TRY_LATER'
      }
    }

    const mockErrorStatus = { status: 400, statusText: 'Bad Request' };

    authorizationService.signUp('email', 'password').subscribe({
      error: (error) => {
        expect(error).toEqual('Too many attempts, try again later');
      }
    })

    const request = httpMock.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKey}`);

    request.flush(dummyResponse, mockErrorStatus);
  });
});
