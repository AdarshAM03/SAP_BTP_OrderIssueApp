using {db} from '../db/schema';

service MyService {
  @odata.draft.enabled
  entity Customer as projection on db.Customer;
  entity Order    as projection on db.Order;
}

service orderIssueService {
  @odata.draft.enabled
  entity Order        as projection on db.Order
                         where
                           status = 'Delivered';

  entity Issue        as projection on db.Issue;
  entity Comment      as projection on db.Comment;
  entity Attachment   as projection on db.Attachment;
  entity IssueTypes   as projection on db.IssueTypes;
  entity RequestTypes as projection on db.RequestTypes;
  entity Approver as projection on db.Approver;
  entity ApprovalHistory as projection on db.ApprovalHistory;
  action apiTrigger(oID:String,iID: String) returns String;
//  function test() returns 
}

annotate orderIssueService.apiTrigger with 
  @Common.SideEffects: {
    TargetEntities: [
      'ApprovalHistory',
      'Order'
    ]
  };

annotate orderIssueService.Order with
@Capabilities.InsertRestrictions: {Insertable: false};

annotate orderIssueService.Order with
@Capabilities.DeleteRestrictions: {Deletable: false};

service approvalService {
  //  entity Order as projection on db.Order;
  entity Issue      as projection on db.Issue where instanceID is not null;
  entity Comment    as projection on db.Comment;
  entity Attachment as projection on db.Attachment;
  entity Approver as projection on db.Approver;
  entity ApprovalHistory  as projection on db.ApprovalHistory;
  action approvalTrigger(oID:String,iID: String) returns String;
  action rejectTrigger(oID:String,iID: String) returns String;
}
annotate approvalService.approvalTrigger with 
  @Common.SideEffects: {
    TargetEntities: [
      'ApprovalHistory',
      'Issue'
    ]
  };

service ApproverLvlService {
  @odata.draft.enabled
  entity Approver as projection on db.Approver;
}