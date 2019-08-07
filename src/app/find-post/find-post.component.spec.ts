import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPostComponent } from './find-post.component';

describe('FindpostComponent', () => {
  let component: FindPostComponent;
  let fixture: ComponentFixture<FindPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
