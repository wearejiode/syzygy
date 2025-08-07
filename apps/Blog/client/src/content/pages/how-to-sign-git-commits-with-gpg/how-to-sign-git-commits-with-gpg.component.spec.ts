import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToSignGitCommitsWithGPGComponent } from './how-to-sign-git-commits-with-gpg.component';

describe('HowToSignGitCommitsWithGPGComponent', () => {
  let component: HowToSignGitCommitsWithGPGComponent;
  let fixture: ComponentFixture<HowToSignGitCommitsWithGPGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowToSignGitCommitsWithGPGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HowToSignGitCommitsWithGPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
