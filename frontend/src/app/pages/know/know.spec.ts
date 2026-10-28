import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Know } from './know';

describe('Know', () => {
  let component: Know;
  let fixture: ComponentFixture<Know>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Know],
    }).compileComponents();

    fixture = TestBed.createComponent(Know);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
