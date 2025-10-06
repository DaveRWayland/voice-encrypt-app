import { TestBed } from '@angular/core/testing';
import { VoiceRecognitionService } from './voice-recognition.service';

describe('VoiceRecognitionService', () => {
  let service: VoiceRecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceRecognitionService);
  });

  it('Start', () => {
    expect(service).toBeTruthy();
  });

  it('Browser Validation', () => {
    const isSupported = service.isSupported();
    expect(typeof isSupported).toBe('boolean');
  });

  it('Text Reset', () => {
    service.reset();
    service.text$.subscribe((text) => {
      expect(text).toBe('');
    });
  });
});
