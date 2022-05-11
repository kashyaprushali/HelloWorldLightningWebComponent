public class fetchAccount
 {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
    return[Select id,Name,Phone,Industry,Status__c from Account Limit 100];
}

 }