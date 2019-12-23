import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} fuseConfigService
     * @param {FormBuilder} formBuilder
     */
    constructor(
        private fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
    ) {
      // Configure the layout
      this.fuseConfigService.config = {
        layout: {
          navbar: {
            hidden: true,
          },
          toolbar: {
            hidden: true,
          },
          footer: {
            hidden: true,
          },
          sidepanel: {
            hidden: true,
          },
        },
      };
    }

    // --------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // --------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
      this.forgotPasswordForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }
}
