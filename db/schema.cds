namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';


entity Customer {

    key cID              : String @readonly;
        name             : String;

        @assert.format        : '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
        @assert.format.message: 'Provide a valid email address'
        email            : String;

        @assert.format        : '^[0-9]{10}$'
        @assert.format.message: 'Provide a valid 10 digit phone number'
        phone            : String;
        address          : String;
        customerToorders : Composition of many Order
                               on customerToorders.orderTocustomer = $self;
//  customerToissue : Composition of many Issue on customerToissue.issuesTocustomer = $self;
}

entity Order : managed {
    key oID             : String @readonly;
    key cID             : String @readonly;
        status          : String default 'Delivered';
        totalAmount     : Decimal(9, 2);
        orderTocustomer : Association to one Customer
                              on orderTocustomer.cID = cID;
        orderToissue    : Composition of many Issue
                              on orderToissue.issueToorders = $self;
        orderToapprovalHistory : Composition of many ApprovalHistory on orderToapprovalHistory.ApprovalHistoryToOrder = $self;
}

entity IssueTypes {
    key code : String(30);
        text : String(100);
}


entity RequestTypes {
    key code : String(30);
        text : String(100);
}

type IssueType   : Association to IssueTypes;

type RequestType : Association to RequestTypes;

entity Issue : managed {
    key iID               : String @readonly;
    key oID               : String @readonly;
        //  cID               : String;
        type              : IssueType;
        requestType       : RequestType;
        status            : String;
        // ApproveCmtBox     : String;
        instanceID        : String;
        issueToorders     : Association to one Order
                                on issueToorders.oID = oID;
        issueToattachment : Composition of many Attachment
                                on issueToattachment.attachmentToissue = $self;
        issueTocomments   : Composition of many Comment
                                on issueTocomments.commentToissue = $self;
//   issuesTocustomer : Association to one Customer on issuesTocustomer.cID=cID;
        issueToApprovalHistory : Composition of many ApprovalHistory on issueToApprovalHistory.ApprovalHistoryToIssue = $self;

}

entity Comment : cuid, managed {
    key iID            : String @readonly;
        description    : String;
        commentedBy    : String;
        commentToissue : Association to one Issue
                             on commentToissue.iID = iID;
}

entity Attachment : cuid, managed {
    key iID               : String;

        @Core.MediaType  : mediaType
        content           : LargeBinary;

        @Core.IsMediaType: true
        mediaType         : String;
        fileName          : String;
        size              : Integer;
        url               : String;
        attachmentToissue : Association to one Issue
                                on attachmentToissue.iID = iID;
}

entity Approver : cuid {
    ApproverName : String;
    Email        : String;
    Level        :Integer;
}

entity ApprovalHistory : cuid{
    key iID : String @readonly;
    key oID : String @readonly;
    level : Integer;
    approverName : String;
    email : String;
    status : String default 'Pending';
    started : DateTime;
    completed : DateTime;
    DaysTaken : String;
    ApprovalHistoryToIssue : Association to one Issue on ApprovalHistoryToIssue.iID = iID;
    ApprovalHistoryToOrder : Association to one Order on ApprovalHistoryToOrder.oID = oID;
}