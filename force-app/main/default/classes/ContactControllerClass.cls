public with sharing class ContactControllerClass {
   @AuraEnabled(cacheable=true)
  
      public static List<Contact> getContacts()
      {
          return[Select id,FirstName,LastName,Phone,Email from Contact];
      }
      @AuraEnabled
      public static string updateContacts( Object data ) {
          
          List < Contact > accsForUpdate = ( List < Contact > ) JSON.deserialize(
              JSON.serialize( data ),
              List < Contact >.class
          );
          try {
              update accsForUpdate;
              return 'Success: Contact(s) updated successfully';
          }
          catch (Exception e) {
              return 'The following exception has occurred: ' + e.getMessage();
          }

}
}
