import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'cobo-chip-autocomplete',
  templateUrl: './chip-autocomplete.html',
  styleUrls: ['./chip-autocomplete.scss'],
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
  ],
})
export class ChipAutocomplete implements OnInit {
  @Input() startValues: string[] = [];
  @Input() options: string[] = [];
  @Input() label: string;

  @Output() changed: EventEmitter<string[]> = new EventEmitter();

  @ViewChild('optionInput', { static: false }) optionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  filteredOptions: string[] = [];
  currentOptions: string[] = [];
  optionControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit() {
    this.currentOptions = this.startValues;
    this.filteredOptions = this.options;
    this.filterOptions(null);
    this.optionControl.valueChanges.subscribe((value: string | null) => {
      this.filterOptions(value);
    });
  }

  add(event: MatChipInputEvent) {
    // Add option only when MatAutocomplete is not open
    // to make sure this does not conflict with OptionSelected Event.
    if (!this.matAutocomplete.isOpen) {
      const input = event.chipInput;
      const value = event.value;

      if ((value || '').trim()) {
        this.addToCurrentOptions(value.trim());
      }

      // Reset the input value.
      if (input) {
        input.clear();
      }

      this.optionControl.setValue(null);
    }
  }

  remove(category: string) {
    const index = this.currentOptions.indexOf(category);

    if (index >= 0) {
      this.currentOptions.splice(index, 1);
    }
    this.changed.emit(this.currentOptions);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.addToCurrentOptions(event.option.viewValue);
    this.optionInput.nativeElement.value = '';
    this.optionControl.setValue(null);
  }

  private addToCurrentOptions(value: string) {
    // If the option is an option we know of,
    // and we don't already have it in the current options. then we can add it.
    if (this.options.includes(value) && !this.currentOptions.includes(value)) {
      this.currentOptions.push(value);
      this.changed.emit(this.currentOptions);
    }
  }

  private filterOptions(value: string) {
    const remainingOptions = this.options.filter((item) => !this.currentOptions.includes(item));
    if (value) {
      this.filteredOptions = remainingOptions.filter(
        (option) => option.toLowerCase().indexOf(value?.toLowerCase()) === 0
      );
    } else {
      this.filteredOptions = remainingOptions;
    }
  }
}
