import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector:'page-princing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent { }
