import { LightningElement,track,wire,api} from 'lwc';
import { CurrentPageReference } from "lightning/navigation";
import getcase1 from '@salesforce/apex/subjectDescriptionclass.getCases1'
import sendEmailToController from '@salesforce/apex/subjectDescriptionclass.sendEmailToController'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DetailPage extends LightningElement {
    @track displayValue;
    @api display;
    @track rsd = [];
    
    @track columns = [
        { label: 'Subject', fieldName: 'Subject' },
        { label: 'Description', fieldName: 'Description'}    
    ];
    
    @wire(CurrentPageReference)

getStateParameters(currentPageReference) {
 if (currentPageReference) {
   const urlValue = currentPageReference.state.c__recordId;
  // if (urlValue) {
     //this.displayValue = 'URL Value was: ${urlValue}';
console.log('value is ', urlValue );
this.display = urlValue;
   } else {
     this.displayValue = 'URL Value was not set';
   }

   getcase1({ide: this.display})
   .then(result =>{
       this.rsd = result;
       console.log('ggggg', this.rsd[0].Id);
       console.log('this.rsd',this.rsd);

       console.log('ggggg',result);
   })
   .catch(error =>{
       console.log(error);
   })
 }

 
 sendEmailAfterEvent(){
  const recordInput = {Description: this.Description, toSend: this.toSend, subject: this.subject, recordId: this.rsd[0].Id}  //You can send parameters
  sendEmailToController(recordInput)
  .then( () => {
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Email sent successfully',
            message: 'Email Sent Successfully',
            variant: 'success',
            
        }),
    );
   

      //If response is ok
  }).catch( error => {
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error creating record',
            message: error.body.message,
            variant: 'error',
        }),
    );
      //If there is an error on response
  })

}

}