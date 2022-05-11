public class subjectDescriptionclass {
    @AuraEnabled
    public static string  getCases(String desci, String descp)
    {
       Case cs1 = new Case();
       cs1.Description = descp;
       cs1.Subject = desci;
       cs1.Status = 'Escalated';
       cs1.Origin = 'Email';
       system.debug(cs1);
       insert cs1;
       
       system.debug('is is>>>>' +cs1.id);
      string id1 = cs1.id;
      return id1;
    }

    
    @AuraEnabled
    public static list<case> getCases1(string ide)
    {
      list<case> cas =  [select Subject,Description from case where id =:ide];
      System.debug('case->'+cas);
      return cas;
    }
    
    @AuraEnabled
    public static void sendEmailToController(String Description, String toSend, String subject,String recordId){
      
      try{
          Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
          list<EmailTemplate> em =[SELECT Id From EmailTemplate where DeveloperName =: 'Case_Email' limit 1];
         
          String[] toAddresses = new String[] {toSend};
         // mail.setToAddresses(toAddresses);
          mail.setSubject(subject);
        //  mail.setHtmlBody('<h1>'+ Description + '</h1>');
          mail.setTemplateId(em[0].Id);
          System.debug('templateId->'+em[0].id);
          System.debug('recordId->'+recordId);
          list<Case> c1 = [Select id from Case where id =: recordId];
          System.debug('whatId->'+c1[0]);
          mail.setWhatId(c1[0].id);
          System.debug('whatid->'+c1[0].id);
          list<Contact> u1 = [Select id from Contact where 	LastName =: 'kaur' limit 1];
          System.debug('whoId->'+u1);
         mail.setTargetObjectId(u1[0].id);
        // mail.setTargetObjectId('0035j00000Kb1lXAAR');
         mail.saveAsActivity = false;
          System.debug('whoId-->'+u1[0].id);
          Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
      }catch(Exception ex){
          throw new AuraHandledException(ex.getMessage());
      }
  }
    
}
