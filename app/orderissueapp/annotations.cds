using orderIssueService as service from '../../srv/service';
annotate service.Order with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : oID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'cID',
                Value : cID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalAmount',
                Value : totalAmount,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Order Details',
            ID : 'OrderDetails',
            Target : '@UI.FieldGroup#OrderDetails1',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Issues',
            ID : 'Issues',
            Target : 'orderToissue/@UI.LineItem#Issues',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Customer ID',
            Value : cID,
        },
        {
            $Type : 'UI.DataField',
            Value : oID,
            Label : 'Order ID',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Total Amount',
            Value : totalAmount,
        },
    ],
    UI.HeaderFacets : [
        
    ],
    UI.FieldGroup #OrderDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : oID,
            },
            {
                $Type : 'UI.DataField',
                Value : cID,
                Label : 'cID',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
            },
            {
                $Type : 'UI.DataField',
                Value : totalAmount,
                Label : 'totalAmount',
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
        ],
    },
    UI.FieldGroup #OrderDetails1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : oID,
                Label : 'ID',
            },
            {
                $Type : 'UI.DataField',
                Value : cID,
                Label : 'Customer ID',
            },
            {
                $Type : 'UI.DataField',
                Value : totalAmount,
                Label : 'Total Amount',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'Status',
            },
        ],
    },
);

annotate service.Issue with @(
    UI.LineItem #Issues : [
        {
            $Type : 'UI.DataField',
            Value : iID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : oID,
            Label : 'Order ID',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'Status',
        },
        {
            $Type : 'UI.DataField',
            Value : requestType_code,
            Label : 'Issue',
        },
        {
            $Type : 'UI.DataField',
            Value : type_code,
            Label : 'Request Action',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'IssuesDetails',
            ID : 'IssuesDetails',
            Target : '@UI.FieldGroup#IssuesDetails',
        },
    ],
    UI.FieldGroup #IssuesDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : iID,
                Label : 'ID',
            },
            {
                $Type : 'UI.DataField',
                Value : oID,
                Label : 'Order ID',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'Status',
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedAt,
            },
            {
                $Type : 'UI.DataField',
                Value : requestType_code,
                Label : 'Issue',
            },
            {
                $Type : 'UI.DataField',
                Value : type_code,
                Label : 'Request Action',
            },
        ],
    },
);

annotate service.Issue with {
    requestType @(
       
)};

annotate service.Issue with {
    type @(
        
)};

annotate service.Order with {
    totalAmount @Common.FieldControl : #ReadOnly
};

annotate service.Order with {
    status @Common.FieldControl : #ReadOnly
};

annotate service.Issue with {
    requestType @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'RequestTypes',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : requestType_code,
                    ValueListProperty : 'text',
                },
            ],
            Label : 'Issue',
        },
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
)};

annotate service.Issue with {
    type @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'IssueTypes',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : type_code,
                    ValueListProperty : 'code',
                },
            ],
            Label : 'Action',
        },
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
)};

annotate service.Issue with {
    status @Common.FieldControl : #ReadOnly
};

annotate service.ApprovalHistory with @(
    UI.LineItem #ApprovalHistory : [
        {
            $Type : 'UI.DataField',
            Value : ApprovalHistoryToOrder.orderToapprovalHistory.level,
            Label : 'level',
        },
        {
            $Type : 'UI.DataField',
            Value : ApprovalHistoryToOrder.orderToapprovalHistory.approverName,
            Label : 'approverName',
        },
        {
            $Type : 'UI.DataField',
            Value : ApprovalHistoryToOrder.orderToapprovalHistory.email,
            Label : 'email',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
        {
            $Type : 'UI.DataField',
            Value : ApprovalHistoryToOrder.orderToapprovalHistory.started,
            Label : 'started',
        },
        {
            $Type : 'UI.DataField',
            Value : ApprovalHistoryToOrder.orderToapprovalHistory.completed,
            Label : 'completed',
        },
        {
            $Type : 'UI.DataField',
            Value : ApprovalHistoryToOrder.orderToapprovalHistory.iID,
            Label : 'iID',
            @UI.Hidden,
        },
    ],
    UI.SelectionPresentationVariant #ApprovalHistory : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#ApprovalHistory',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : level,
                    Descending : false,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    },
);

