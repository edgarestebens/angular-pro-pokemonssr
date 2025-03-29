import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector:'page-princing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit{

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    //para detectar si esta en el servidor o no
    if(isPlatformBrowser(this.platform)){

      document.title = 'Princing Page';

    }


    // this.title.setTitle("Princing Page");
    // this.meta.updateTag({name: 'description',content: 'Este es mi Princing page'});
    // this.meta.updateTag({name: 'og:title',content: 'Princing Page'});
    // this.meta.updateTag({name: 'keywords',content: 'Hola mundo Edgar Jaramillo,curso de angular Pro'});

  }
}
