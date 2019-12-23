import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

// import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    form: FormGroup;

    fuseConfig: any;

    // Private
    private unsubscribeAll: Subject<any>;

    constructor(
        private formBuilder: FormBuilder,
        private fuseConfigService: FuseConfigService,
    ) {
      // Set the private defaults
      this.unsubscribeAll = new Subject();
    }

    ngOnInit() {
      this.form = this.formBuilder.group({
        colorTheme: new FormControl(),
      });

      // Subscribe to the config changes
      this.fuseConfigService.config
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((config) => {
          // Update the stored config
          this.fuseConfig = config;

          // Set the config form values without emitting an event
          // so that we don't end up with an infinite loop
          this.form.setValue(config, { emitEvent: false });
        });


      // Subscribe to the form value changes
      this.form.valueChanges
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((config) => {
          // Update the config
          this.fuseConfigService.config = config;
        });
    }
}
