import { Test, TestingModule } from '@nestjs/testing';
import { ConnectorServiceService } from './connector-service.service';

describe('ConnectorServiceService', () => {
  let service: ConnectorServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectorServiceService],
    }).compile();

    service = module.get<ConnectorServiceService>(ConnectorServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
