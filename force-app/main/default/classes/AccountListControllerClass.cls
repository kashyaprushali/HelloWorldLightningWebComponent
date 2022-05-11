public class AccountListControllerClass 
    {
    @AuraEnabled
    Public static List<Account> AccountRecord()
    {
        return [Select Id,Name From Account];
    }
    
    @AuraEnabled
    public static List<Contact> ContactRecords(String recordId)
    {
        System.debug('Hello');
        List<Contact> conlist = [Select id,FirstName,LastName,Email,Phone From Contact Where AccountId=:recordId];
        return conlist;
    }
    @AuraEnabled
    public static string FeedItemmethod(String str,Id conId )
    {
        system.debug('check apex call' + conId);
        FeedItem Post=New FeedItem();
        Post.ParentId=conId;
        Post.Body=str;
        Post.Type='LinkPost';
         system.debug('str-->'+str);
        insert Post;
        string Postid=Post.Id;
        system.debug('PostId-->' +Postid );
        return Postid;
     }
    @AuraEnabled
    public static void postLike(string FeedId)
    {
        ConnectApi.ChatterLike chatterLike = ConnectApi.ChatterFeeds.likeFeedElement(null,FeedId);
        system.debug('Done' +FeedId);
    }
    @AuraEnabled
    public static string postComment(string str,string feedId )
    {
         ConnectApi.Comment Chattercomment = ConnectApi.ChatterFeeds.postCommentToFeedElement(null,feedId,str);
        string comId= Chattercomment.id;
        system.debug('comId-->' +comId);
        return comId;
        
        
    }
    @AuraEnabled
    public static void cl(string comId)
    {
        System.debug('In commet Like');
        ConnectApi.ChatterLike chatterLike= ConnectApi.ChatterFeeds.likeComment(null,comId);
    }

}