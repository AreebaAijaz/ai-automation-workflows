import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        defineField({
            name: 'firstName',
            title: 'First Name',
            type: 'string',
        }),
        defineField({
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
        }),
        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
        }),
        defineField({
            name: 'zipCode',
            title: 'Zip Code',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'cartItems',
            title: 'Cart Items',
            type: 'array',
            of: [{
                type: 'reference', to: [{ type: 'product' }],
            }],
        }),
        defineField({
            name: 'total',
            title: 'Total',
            type: 'number',
        }),
        defineField({
            name: 'status',
            title: 'Order Status',
            type: 'string',
            options: {
                list: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
                layout: 'radio'
            },
            initialValue: 'Pending',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: new Date().toISOString(),
        }),
    ],
});
