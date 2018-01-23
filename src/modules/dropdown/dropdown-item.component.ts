import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'sky-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDropdownItemComponent implements AfterViewInit {
  public isActive = false;
  public isDisabled = false;
  public buttonElement: HTMLButtonElement;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    public elementRef: ElementRef
  ) { }

  public ngAfterViewInit() {
    console.log('dropdown menu item, ngAfterViewInit()');
    this.buttonElement = this.elementRef.nativeElement.querySelector('button');

    if (this.buttonElement) {
      // this.buttonElement.tabIndex = -1;
      this.isDisabled = this.buttonElement.disabled;
      this.changeDetector.detectChanges();
    }
  }

  public focusElement(enableNativeFocus: boolean) {
    console.log('dropdown menu item, focusElement()');
    this.isActive = true;

    if (enableNativeFocus) {
      this.buttonElement.focus();
    }

    this.changeDetector.detectChanges();
  }

  public isFocusable(): boolean {
    console.log('dropdown menu item, isFocusable()');
    /*tslint:disable no-null-keyword */
    const isDisabled = (
      this.buttonElement &&
      this.buttonElement.getAttribute('disabled') !== null
    );
    /*tslint:enable */
    return !isDisabled;
  }

  public resetState() {
    console.log('dropdown menu item, resetState()');
    this.isActive = false;
    this.changeDetector.markForCheck();
  }
}
