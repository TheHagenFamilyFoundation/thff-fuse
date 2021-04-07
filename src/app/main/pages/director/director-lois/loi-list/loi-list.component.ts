/* eslint-disable new-cap */
import { Component, OnInit, Input } from '@angular/core';

import jspdf from 'jspdf';
// import html2canvas from 'html2canvas'; //no longer using this

@Component({
  selector: 'app-loi-list',
  templateUrl: './loi-list.component.html',
  styleUrls: ['./loi-list.component.scss'],
})
export class LoiListComponent implements OnInit {
  @Input()
  lois: any;

  Loading: boolean;

  fullImagePath = '/assets/images/pdf.png';

  constructor(
  ) {
    // this.Loading = false;
    console.log('loi-list constructor');
  }

  ngOnInit() {
  }

  exportToPDF() {
    console.log('export to pdf pressed');

    this.Loading = true;

    const pdf = new jspdf('p', 'mm', 'a4');

    // this is the title
    // pdf.setFontSize(40) //maybe
    pdf.setFontSize(12);
    pdf.text('List of Letter of Intents', 75, 10);

    console.log('this.lois.length', this.lois.length);
    for (let i = 0; i < this.lois.length; i += 1) {
      const loiDoc = this.lois[i].id;
      console.log('loiDoc', loiDoc);
      console.log('this.lois[i]', this.lois[i]);

      let shift = 0;
      let vertical = 10;
      if (i === 0) {
        // first loi, shift everything down
        shift += 10;
      }

      // Output
      pdf.text(`LOI - ${i + 1} - ${loiDoc}`, 75, vertical + shift); // id
      vertical += 10;
      pdf.text(`LOI Name - ${this.lois[i].name}`, 75, vertical + shift); // id
      vertical += 10;

      // LOI Info
      if (this.lois[i].info && this.lois[i].info.length > 0) {
        pdf.text(`Project Title - ${this.lois[i].info[0].projectTitle}`, 75, vertical + shift); // projectTitle

        /* Purpose */
        vertical += 10;
        pdf.text('Purpose', 15, vertical + shift); // purpose
        const splitTitle = pdf.splitTextToSize(this.lois[i].info[0].purpose, 150);
        pdf.text(splitTitle, 35, vertical + shift);

        vertical += 150;
        pdf.text(`Project Start Date - ${this.lois[i].info[0].projectStartDate}`, 75, vertical + shift); // start date
        vertical += 10;
        pdf.text(`Project End Date - ${this.lois[i].info[0].projectEndDate}`, 75, vertical + shift); // end date
        vertical += 10;
        pdf.text(`Amount Requested - $${this.lois[i].info[0].amountRequested}`, 75, vertical + shift); // amount requested
        vertical += 10;
        pdf.text(`Total Project Cost - $${this.lois[i].info[0].totalProjectCost}`, 75, vertical + shift); // total project cost
      } else {
        // output no info
        pdf.text('No Info', 75, vertical + shift); // no info
      }

      if (i < this.lois.length - 1) {
        pdf.addPage();
      }
    }

    this.Loading = false;

    pdf.save('converteddoc.pdf');
  }
}
