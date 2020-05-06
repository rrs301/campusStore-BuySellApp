import { TestBed } from '@angular/core/testing';

import { MongoDBConnectService } from './mongo-dbconnect.service';

describe('MongoDBConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MongoDBConnectService = TestBed.get(MongoDBConnectService);
    expect(service).toBeTruthy();
  });
});
