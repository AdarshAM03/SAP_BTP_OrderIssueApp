using MyService as service from '../../srv/service';


annotate service.Customer with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Customer ID',
                Value : cID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Phone',
                Value : phone,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Address',
                Value : address,
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
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Orders',
            ID : 'Orders',
            Target : 'customerToorders/@UI.LineItem#Orders',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : cID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Email',
            Value : email,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Phone',
            Value : phone,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Address',
            Value : address,
        },
    ],
);

annotate service.Order with @(
    UI.LineItem #Orders : [
        {
            $Type : 'UI.DataField',
            Value : oID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : cID,
            Label : 'CustomerID',
        },
        {
            $Type : 'UI.DataField',
            Value : totalAmount,
            Label : 'Total Amount',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Order Details',
            ID : 'orderDetails',
            Target : '@UI.FieldGroup#orderDetails',
        },
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
    UI.UpdateHidden : false,
    UI.HeaderFacets : [
        
    ],
    UI.FieldGroup #OrderDetails1 : {
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
                Value : totalAmount,
                Label : 'totalAmount',
            },
            {
                $Type : 'UI.DataField',
                Value : createdAt,
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedBy,
            },
            {
                $Type : 'UI.DataField',
                Value : createdBy,
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedAt,
            },
        ],
    },
    UI.FieldGroup #orderDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : oID,
                Label : 'Order ID',
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
);

annotate service.Issue with @(
    UI.LineItem #Issues : [
        {
            $Type : 'UI.DataField',
            Value : iID,
            Label : 'iID',
        },
        {
            $Type : 'UI.DataField',
            Value : oID,
            Label : 'oID',
        },
        {
            $Type : 'UI.DataField',
            Value : requestType,
            Label : 'requestType',
        },
        {
            $Type : 'UI.DataField',
            Value : type,
            Label : 'type',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.Facets : [
        
    ],
    UI.FieldGroup #Issue : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : iID,
                Label : 'iID',
            },
            {
                $Type : 'UI.DataField',
                Value : oID,
                Label : 'oID',
            },
            {
                $Type : 'UI.DataField',
                Value : requestType,
                Label : 'requestType',
            },
            {
                $Type : 'UI.DataField',
                Value : type,
                Label : 'type',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
            },
        ],
    },
);

annotate service.Comment with @(
    UI.LineItem #Comments : [
        {
            $Type : 'UI.DataField',
            Value : commentToissue.issueTocomments.ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : commentToissue.issueTocomments.iID,
            Label : 'iID',
        },
        {
            $Type : 'UI.DataField',
            Value : commentToissue.issueTocomments.description,
            Label : 'description',
        },
        {
            $Type : 'UI.DataField',
            Value : commentToissue.issueTocomments.modifiedAt,
        },
    ]
);

annotate service.Order with {
    oID @Common.FieldControl : #ReadOnly
};

annotate service.Customer with {
    name @Common.FieldControl : #Mandatory
};

annotate service.Customer with {
    email @Common.FieldControl : #Mandatory
};

annotate service.Customer with {
    phone @Common.FieldControl : #Mandatory
};

annotate service.Customer with {
    address @Common.FieldControl : #Mandatory
};

