import { LightningElement,track,wire} from 'lwc';
import getContacts from '@salesforce/apex/ContactControllerClass.getContacts';
import updateContacts from '@salesforce/apex/ContactControllerClass.updateContacts';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LwcContactController extends LightningElement {
    records;
    wiredRecords;
    error;
 columns = [
        { label: 'FirstName', fieldName: 'FirstName', editable: true },
        { label: 'LastName', fieldName: 'LastName', editable: true },
        { label: 'Email', fieldName: 'Email', editable: true} ,
        { label: 'Phone', fieldName: 'Phone', editable:true}
    ];
    draftValues = [];

    @wire( getContacts )  
    wiredAccount( value ) {

        this.wiredRecords = value; // track the provisioned value
        const { data, error } = value;

        if ( data ) {
                            
            this.records = data;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.records = undefined;

        }

    }  

    async handleSave( event ) {

        const updatedFields = event.detail.draftValues;

        await updateContacts( { data: updatedFields } )
        .then( result => {

            console.log( JSON.stringify( "Apex update result: " + result ) );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account(s) updated',
                    variant: 'success'
                })
            );
            
            refreshApex( this.wiredRecords ).then( () => {
                this.draftValues = [];
            });        

        }).catch( error => {

            console.log( 'Error is ' + JSON.stringify( error ) );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );

        });

    }
}
