import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideloadComponent } from './sideload.component';

describe('SideloadComponent', () => {
  let component: SideloadComponent;
  let fixture: ComponentFixture<SideloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
