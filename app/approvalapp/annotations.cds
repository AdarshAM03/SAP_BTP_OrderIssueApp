using approvalService as service from '../../srv/service';
annotate service.Issue with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Issue ID',
                Value : iID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Order ID',
                Value : oID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Value : createdAt,
            },
            {
                $Type : 'UI.DataField',
                Value : createdBy,
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedAt,
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedBy,
            },
            {
                $Type : 'UI.DataField',
                Value : requestType_code,
                Label : 'Issue Type',
            },
            {
                $Type : 'UI.DataField',
                Value : type_code,
                Label : 'Action Request',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Order ID',
            Value : oID,
            @UI.Hidden,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Issue ID',
            Value : iID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'ApproveCmtBox',
            Value : ApproveCmtBox,
            @UI.Hidden,
        },
        {
            $Type : 'UI.DataField',
            Value : requestType_code,
            Label : 'Issue Type',
        },
        {
            $Type : 'UI.DataField',
            Value : type_code,
            Label : 'Action Request',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : status,
        },
    ],
);

annotate service.Comment with @(
    UI.LineItem #Comments : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'Comment ID',
            @UI.Hidden,
        },
        {
            $Type : 'UI.DataField',
            Value : iID,
            Label : 'Issue ID',
            @UI.Hidden,
        },
        {
            $Type : 'UI.DataField',
            Value : description,
            Label : 'Comment',
        },
    ]
);

annotate service.Attachment with @(
    UI.LineItem #Attachments : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
            @UI.Hidden,
        },
        {
            $Type : 'UI.DataField',
            Value : iID,
            Label : 'iID',
            @UI.Hidden,
        },
        {
            $Type : 'UI.DataField',
            Value : fileName,
            Label : 'File Name',
        },
        {
            $Type : 'UI.DataField',
            Value : content,
            Label : 'Content',
        },
        {
            $Type : 'UI.DataField',
            Value : mediaType,
            Label : 'File Type',
        },
        {
            $Type : 'UI.DataField',
            Value : size,
            Label : 'size',
            @UI.Hidden,
        },
        {
            $Type : 'UI.DataField',
            Value : url,
            Label : 'url',
            @UI.Hidden,
        },
    ]
);

