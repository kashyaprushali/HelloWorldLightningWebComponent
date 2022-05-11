import { LightningElement, track} from 'lwc';
import getcase from '@salesforce/apex/subjectDescriptionclass.getCases';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


export default class SubjectDescription extends NavigationMixin (LightningElement) {
   @track subject;
   @track description;
   @track  res;

  
   handleCreate(event){
        this.subject= this.template.querySelector(".sub").value;
        this.description= this.template.querySelector(".desc").value;
      // console.log('blablablabla', this.subject);
     
      getcase({desci: this.subject, descp: this.description})
      .then((result) => {
          console.log('succedeed');
          console.log('final',result);
          this.res = result;
          this.dispatchEvent(
            new ShowToastEvent({
                title: 'success creating record',
                message: 'Case Created',
                variant: 'success',
                
            }),
        );
       
        eval("$A.get('e.force:refreshView').fire();");
        console.log('ttyyyttt');
        this[NavigationMixin.Navigate]({
        
          type: 'comm__namedPage',
          attributes: {
            pageName: 'detail'
          },
          state: {
            c__recordId: this.res,
            
          }

        });
      })
      .catch((error) => {
          console.log(error);
          this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating record',
                message: error.body.message,
                variant: 'error',
            }),
        );
      })
      
      
    }
}