import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  it('should render the chordbomb link', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('a'))).not.toBeNull();
  });
});
