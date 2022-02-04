import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeDataUrl' })
export class SafeDataUrlPipe {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(dataUrl: string): any {
    return dataUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl) : '';
  }
}