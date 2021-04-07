/* eslint-disable new-cap */
import { Component, Input } from '@angular/core';

import jspdf from 'jspdf';

@Component({
  selector: 'app-director-fps-list',
  templateUrl: './director-fps-list.component.html',
  styleUrls: ['./director-fps-list.component.scss'],
})
export class DirectorFpsListComponent {
  fullImagePath = '/assets/images/pdf.png';

  Loading: boolean;

  // Descriptions - used in the html and in the export to pdf
  executiveSummaryDesc = 'Briefly explain why your agency is requesting this grant, what outcomes you hope to achieve, and how you will spend the funds if the grant is made (2000 characters max).';

  targetPopulationDesc = 'Describe the target population and how they will benefit (2000 characters max).';

  projectGoalsDesc = 'Describe the project goals, measurable objectives, and action plans (2000 characters max).';

  newOrOngoingDesc = 'Is this a new or ongoing activity for the organization?';

  // more like a question than a desc
  timeTableDesc = 'Provide a timetable for implementation: (2000 characters max)';

  partnersDesc = 'If there are any other partners in the project, describe them and indicate how you will cooperate on the project (2000 characters max).';

  diffDesc = 'How does your proposed project differ from the work of other existing projects (in your organization or in other similar organizations; 2000 characters max))?';

  involveDesc = 'Describe the active involvement of constituents in defining problems to be addressed, making policy, and planning the program (2000 characters max).';

  staffDesc = 'Describe the qualifications of key staff and volunteers that will ensure the success of the program, and any staff training that will be needed(2000 characters max).';

  strategyDesc = 'Describe your long-term strategies for funding this project at end of grant period (2000 characters max).';

  evaluationDesc = 'Describe your plans for evaluation of the project, including how success will be defined and measured (2000 characters max).';

  disseminationDesc = 'How will the evaluation results be used and/or disseminated? If appropriate, how will the project be replicated? (2000 characters max).';

  activeDesc = 'Describe the active involvement of constituents in evaluating the program, if any (2000 characters max).';

  priorityDesc = 'In the event that you are not able to secure full funding, what are the priority items in the budget above? (2000 characters max)';

  historyDesc = 'Provide a brief history and overview of your organization (2000 characters max).';

  websiteDesc = 'If your organization has a website, provide the link here:';

  @Input()
  fps: any

  constructor() {
    this.Loading = false;
  }

  // ngOnInit() {
  // }


  // pass in a full proposal field
  // returns the field length
  calculateLength(field) {
    return field.length;
  }

  getOutputActivity(activity) {
    // activity == 1
    let outputActivity = 'New';

    if (activity === 1) {
      outputActivity = 'Ongoing';
    }

    return outputActivity;
  }

  exportToPDF() {
    console.log('export to pdf pressed');

    this.Loading = true;

    const pdf = new jspdf('p', 'pt', 'a4'); // new jsPDF('p', 'pt', [ 595.28,  841.89])
    // const promises = [];

    // First Page
    // shows title
    // count of full proposals
    // potentially a TOC later

    /* Title */
    // this is the title
    // pdf.setFontSize(40) //maybe
    pdf.setFontSize(12);
    pdf.text('List of Full Proposals', 200, 40);

    pdf.text(`Number of Full Proposals - ${this.fps.length}`, 200, 60); // id

    pdf.addPage();

    // individual full proposals

    console.log('this.fps.length', this.fps.length);
    for (let i = 0; i < this.fps.length; i += 1) {
      // let i = 0;//for debugging


      const fpDoc = this.fps[i].id;
      console.log('fpDoc', fpDoc);
      console.log('this.fps[i]', this.fps[i]);

      let vertical = 40;

      //   //Output
      pdf.text(`Full Proposal - ${i + 1} - ${fpDoc}`, 30, vertical); // id
      vertical += 20;
      pdf.text(`Organization - ${this.fps[i].organization.name}`, 30, vertical); // org name
      vertical += 20;
      pdf.text(`Letter of Intent - ${this.fps[i].loi.name}`, 30, vertical); // id

      vertical += 20;
      pdf.text('Executive Sumnmary', 200, vertical); // executive summary title

      vertical += 20;
      // executive summary description
      const splitESDesc = pdf.splitTextToSize(this.executiveSummaryDesc, 525);
      pdf.text(splitESDesc, 30, vertical);// executiveSummaryDesc split - word wrap

      vertical += 40;
      const splitES = pdf.splitTextToSize(this.fps[i].executiveSummary, 525);
      console.log('splitES.length', splitES.length);
      pdf.text(splitES, 30, vertical);// executiveSummaryDesc split - word wrap

      pdf.addPage();


      // purpose page - reset back to 20
      vertical = 20;
      // vertical += 140;
      pdf.text('Purpose', 200, vertical); // purpose title
      vertical += 20;

      // purpose

      // target population
      const splitTargetPopulationDesc = pdf.splitTextToSize(this.targetPopulationDesc, 525);
      pdf.text(splitTargetPopulationDesc, 30, vertical);// targetPopulation split - word wrap

      vertical += 20;
      const splitTargetPopulation = pdf.splitTextToSize(this.fps[i].targetPopulation, 525);
      console.log('splitTargetPopulation.length', splitTargetPopulation.length);
      pdf.text(splitTargetPopulation, 30, vertical);// executiveSummaryDesc split - word wrap

      // project goals

      vertical += 300;

      // project goals
      const splitProjectGoalsDesc = pdf.splitTextToSize(this.projectGoalsDesc, 525);
      pdf.text(splitProjectGoalsDesc, 30, vertical);

      vertical += 20;
      const splitprojectGoals = pdf.splitTextToSize(this.fps[i].goals, 525);
      console.log('splitprojectGoals.length', splitprojectGoals.length);
      pdf.text(splitprojectGoals, 30, vertical);

      vertical += 375;
      // new or ongoing
      const splitNewOrOngoingDesc = pdf.splitTextToSize(this.newOrOngoingDesc, 525);
      pdf.text(splitNewOrOngoingDesc, 30, vertical);//

      vertical += 20;
      const splitNewOrOngoing = pdf.splitTextToSize(
        this.getOutputActivity(this.fps[i].activity), 525,
      );
      pdf.text(splitNewOrOngoing, 30, vertical);// executiveSummaryDesc split - word wrap

      pdf.addPage();

      // reset the vertical
      vertical = 40;
      // timetable
      const splitTimeTableDesc = pdf.splitTextToSize(this.timeTableDesc, 525);
      pdf.text(splitTimeTableDesc, 30, vertical);// targetPopulation split - word wrap

      vertical += 20;
      const splitTimeTable = pdf.splitTextToSize(this.fps[i].timeTable, 525);
      console.log('splitTimeTable.length', splitTimeTable.length);
      pdf.text(splitTimeTable, 30, vertical);// executiveSummaryDesc split - word wrap

      vertical += 400;


      // partners
      const splitPartnersDesc = pdf.splitTextToSize(this.partnersDesc, 525);
      pdf.text(splitPartnersDesc, 30, vertical);

      vertical += 40;
      const splitPartners = pdf.splitTextToSize(this.fps[i].partners, 525);
      console.log('splitPartners.length', splitPartners.length);
      pdf.text(splitPartners, 30, vertical);


      pdf.addPage();
      // reset the vertical
      vertical = 40;
      // differ
      const splitDiffDesc = pdf.splitTextToSize(this.diffDesc, 525);
      pdf.text(splitDiffDesc, 30, vertical);// targetPopulation split - word wrap

      vertical += 40;
      const splitDiff = pdf.splitTextToSize(this.fps[i].differ, 525);
      console.log('splitDiff.length', splitDiff.length);
      pdf.text(splitDiff, 30, vertical);// executiveSummaryDesc split - word wrap

      vertical += 350;


      // involvement
      const splitInvolveDesc = pdf.splitTextToSize(this.involveDesc, 525);
      pdf.text(splitInvolveDesc, 30, vertical);

      vertical += 40;
      const splitInvolvement = pdf.splitTextToSize(this.fps[i].involve, 525);
      console.log('splitInvolvement.length', splitInvolvement.length);
      pdf.text(splitInvolvement, 30, vertical);


      pdf.addPage();
      // reset the vertical
      vertical = 40;
      // staff
      const splitStaffDesc = pdf.splitTextToSize(this.staffDesc, 525);
      pdf.text(splitStaffDesc, 30, vertical);

      vertical += 40;
      const splitStaff = pdf.splitTextToSize(this.fps[i].staff, 525);
      console.log('splitStaff.length', splitStaff.length);
      pdf.text(splitStaff, 30, vertical);

      vertical += 350;


      // strategy
      const splitStrategyDesc = pdf.splitTextToSize(this.strategyDesc, 525);
      pdf.text(splitStrategyDesc, 30, vertical);

      vertical += 40;
      const splitStrategy = pdf.splitTextToSize(this.fps[i].strategy, 525);
      console.log('splitStrategy.length', splitStrategy.length);
      pdf.text(splitStrategy, 30, vertical);

      pdf.addPage();


      // evaluation page - reset back to 20
      vertical = 20;
      // vertical += 140;
      pdf.text('Evaluation', 200, vertical); // evaluation title
      vertical += 20;

      // evaluation
      const splitEvaluationDesc = pdf.splitTextToSize(this.evaluationDesc, 525);
      pdf.text(splitEvaluationDesc, 30, vertical);

      vertical += 40;
      const splitEvaluation = pdf.splitTextToSize(this.fps[i].evaluation, 525);
      console.log('splitEvaluation.length', splitEvaluation.length);
      pdf.text(splitEvaluation, 30, vertical);

      vertical += 350;


      // dissemination
      const splitDisseminationDesc = pdf.splitTextToSize(this.disseminationDesc, 525);
      pdf.text(splitDisseminationDesc, 30, vertical);

      vertical += 40;
      const splitDissemination = pdf.splitTextToSize(this.fps[i].dissemination, 525);
      console.log('splitDissemination.length', splitDissemination.length);
      pdf.text(splitDissemination, 30, vertical);


      pdf.addPage();
      // reset the vertical
      vertical = 40;
      // active
      const splitActiveDesc = pdf.splitTextToSize(this.activeDesc, 525);
      pdf.text(splitActiveDesc, 30, vertical);

      vertical += 40;
      const splitActive = pdf.splitTextToSize(this.fps[i].active, 525);
      console.log('splitActive.length', splitActive.length);
      pdf.text(splitActive, 30, vertical);

      pdf.addPage();

      // budget page - reset back to 20
      vertical = 20;
      // vertical += 140;
      pdf.text('Budget Narrative/Justification', 200, vertical); // budget title
      vertical += 20;

      // skip for the items


      vertical += 400;

      // priority
      const splitPriorityDesc = pdf.splitTextToSize(this.priorityDesc, 525);
      pdf.text(splitPriorityDesc, 30, vertical);

      vertical += 40;
      const splitPriority = pdf.splitTextToSize(this.fps[i].priority, 525);
      console.log('splitPriority.length', splitPriority.length);
      pdf.text(splitPriority, 30, vertical);

      pdf.addPage();


      // your organization page - reset back to 20
      vertical = 20;
      // vertical += 140;
      pdf.text('Your Organization', 200, vertical); // your organization title
      vertical += 20;

      // evaluation
      const splitHistoryDesc = pdf.splitTextToSize(this.historyDesc, 525);
      pdf.text(splitHistoryDesc, 30, vertical);

      vertical += 40;
      const splitHistory = pdf.splitTextToSize(this.fps[i].history, 525);
      console.log('splitHistory.length', splitHistory.length);
      pdf.text(splitHistory, 30, vertical);

      vertical += 350;


      // website
      const splitWebsiteDesc = pdf.splitTextToSize(this.websiteDesc, 525);
      pdf.text(splitWebsiteDesc, 30, vertical);

      vertical += 40;
      const splitWebsite = pdf.splitTextToSize(this.fps[i].website, 525);
      console.log('splitWebsite.length', splitWebsite.length);
      pdf.text(splitWebsite, 30, vertical);


      if (i < this.fps.length - 1) {
        pdf.addPage();
      }
    }

    this.Loading = false;

    pdf.save('converteddoc.pdf');
  }
}
