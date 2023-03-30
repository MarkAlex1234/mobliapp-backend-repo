import { Test, TestingModule } from '@nestjs/testing';
import { BusController } from 'src/bus/bus.controller';
import { BusService } from 'src/bus/bus.service';

describe('AppController', () => {
  let appController: BusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BusController],
      providers: [BusService],
    }).compile();

    appController = app.get<BusController>(BusController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
