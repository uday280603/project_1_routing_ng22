import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { roleBAseAccessControlGuard } from './role-base-access-control-guard';

describe('roleBAseAccessControlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roleBAseAccessControlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
