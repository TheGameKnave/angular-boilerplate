import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface CardFormattingOptions {
  mpcBleed?: boolean;
  borderColor?: string|number;
  roundedCorners?: boolean;
  highRes?: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('textarea') textRef: ElementRef = new ElementRef(null);
  loading = false;
  cardsTooMany = false;
  
  Object = Object;
  Array = Array;
  title = 'angular-boilerplate';
  
  cardField: UntypedFormControl = new UntypedFormControl();
  cardFormatting: UntypedFormGroup = new UntypedFormGroup({
    'mpcBleed': new UntypedFormControl(true),
    'borderColor': new UntypedFormControl('111'),
    'roundedCorners': new UntypedFormControl(false),
    'highRes': new UntypedFormControl(false),
  });
  cardFormattingOptions: CardFormattingOptions = {}
  cardFieldSub: Subscription | undefined;
  cardFormattingSub: Subscription | undefined;
  cardList: string[] = [];
  cardData: any[] = [];
  missingCards: string[] = [];

  constructor(
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.cardFieldSub = this.cardField.valueChanges.subscribe((value: string) => {
      this.cardList = value.split(/\r?\n/)
      // remove any leading numbers and spaces, and any trailing spaces
      this.cardList = this.cardList
        .map(card => card.replace(/^\d+|\s+$/g, '').trim())
        .filter(card => card)
      // dedup the list
      this.cardList = this.cardList.filter(
        (card, index) =>
          this.cardList.indexOf(card) === index
          && !card.toLowerCase().includes('sideboard')
          && card !== 'Deck' && card !== 'Deck:'
      );
      this.cardsTooMany = this.cardList.length > 100;
    });

    Object.keys(this.cardFormatting.controls).forEach(cookieName => {
      const cookieValue = this.cookieService.get(cookieName);
      if (cookieValue) {
        let formValue;
        if(cookieValue === 'false') formValue = false;
        else if(cookieValue === 'true') formValue = true;
        else formValue = cookieValue;
        this.cardFormatting.get(cookieName)?.setValue(formValue);
      }
    });

    this.cardFormattingOptions = this.cardFormatting.value;
    this.cardFormattingSub = this.cardFormatting.valueChanges.subscribe((value) => {
      Object.keys(value).forEach((key) => {
        this.cookieService.set(key, value[key], 365, '/');
      });
      this.cardFormattingOptions = value;
    });
  }

  ngAfterViewInit() {            
    this.textRef.nativeElement.focus();
    this.adjustTextboxSize()
  }

  adjustTextboxSize() {
    let textarea = document.getElementsByTagName('textarea')[0];
    if (textarea) {
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      })

      // Initialize the textarea height
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }



  // method to fetch cards based on form contents
  async fetchCards() {
    this.loading = true;
    this.cardData = [];
    this.cardField.setValue(this.cardList.join('\n'));
    if(this.cardList.length <= 100){
      fetch('/api/cards', {
        method: 'POST', // Update the method to 'POST'
        headers: {
          'Content-Type': 'application/json', // Set the content type header if sending JSON payload
        },
        body: JSON.stringify({ cardList: this.cardList }), // Include your payload data here
      })
        .then(response => response.json())
        .then((cards: any[]) => {
          this.loading = false;
          this.cardData = cards;
          this.missingCards = Object.entries(cards)
            .filter(([key, value]) => key !== 'cardList' && !Object.keys(value).length)
            .map(([key, value]) => key)
        })
        .catch(error => {
          this.loading = false;
          console.error('Fetch error:', error)
        })
    }
  }
}

