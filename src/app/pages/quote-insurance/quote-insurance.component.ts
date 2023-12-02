import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { PlatformConfig } from '@angular/platform-server';
import { Observable } from 'rxjs';
import { IBrand } from 'src/app/models/IBrand';
import { IModel } from 'src/app/models/IModel';
import { IModelCollection } from 'src/app/models/IModelCollection';
import { CarParamsService } from 'src/app/services/car-params.service';

@Component({
  selector: 'app-quote-insurance',
  templateUrl: './quote-insurance.component.html',
  styleUrls: ['./quote-insurance.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class QuoteInsuranceComponent {

  title = 'Cotizador de seguros, Banorte';
  image = 'assets/images/logo.png'
  quoteForm!: FormGroup
  public innerWidth?: any;
  brands: IBrand[] = [];
  models: IModel[] = [];
  submitted = false;
  years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  constructor(private fb: FormBuilder, private titleService: Title, private metaTagService: Meta, private propsVehicle: CarParamsService, @Inject(PLATFORM_ID) private platformId: PlatformConfig, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.quoteForm = this.fb.group({
      carBrand: ['', [Validators.required]],
      carModel: ['', [Validators.required]],
      carYear: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.quoteForm.get('carBrand')?.disable();
    this.quoteForm.get('carModel')?.disable();
    this.quoteForm.get('carYear')?.disable();

    this.getPropertiesVehicle()

    const fullUrl = this.document.location.href; 
    console.log(fullUrl)
    this.titleService.setTitle(this.title);
    this.metaTagService.addTags(
      [
        { name: 'description', content: 'Cotizador de crédito de seguros automotriz, banorte' },
        { name: 'keywords', content: 'crédito automotriz, comparador crédito automotriz' },
        { property: 'og:title', content: this.title },
        { property: 'og:site_name', content: 'Banorte' },
        { property: 'og:url', content: fullUrl },
        { property: 'og:description', content: 'crédito automotriz, comparador crédito automotriz' },
        { property: 'og:type', content: 'business.business' },
        { property: 'og:image', content: this.image }
      ]
    );
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }

  }

  getPropertiesVehicle(idVehicleType?: string) {

    this.propsVehicle.getPropertyCars(idVehicleType).subscribe((next) => {

      if (idVehicleType === undefined) {
        this.brands = Object.values(next);
        this.quoteForm.get('carBrand')?.enable();
      } else {
        const data = next as IModelCollection;
        this.models = data.models;
        this.quoteForm.get('carModel')?.enable();
      }

    })
  }

  selectedProperty(id: string) {
    this.getPropertiesVehicle(id)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.quoteForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.quoteForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.quoteForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.quoteForm.reset();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }
    //console.log(this.innerWidth)
  }

}
