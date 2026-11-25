import { defineArrayMember, defineField, defineType } from 'sanity'

export const order = defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      description: 'Update this status to notify the customer and update their dashboard tracker.',
      options: {
        list: [
          { title: '🟡 Pending (Awaiting review)', value: 'pending' },
          { title: '🔵 Confirmed (Approved for production)', value: 'confirmed' },
          { title: '🟣 In Production (Garments being printed/customized)', value: 'in_production' },
          { title: '🟠 Dispatched (Shipped with courier)', value: 'dispatched' },
          { title: '🟢 Delivered (Order complete)', value: 'delivered' },
          { title: '🔴 Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount (₹)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'totalQuantity',
      title: 'Total Units',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      readOnly: true,
      initialValue: 'INR',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Contact Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone Number',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'companyName',
      title: 'Company / Brand Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'deliveryAddress',
      title: 'Delivery Address',
      type: 'text',
      rows: 3,
      readOnly: true,
    }),
    defineField({
      name: 'orderNotes',
      title: 'Customer Special Instructions / Notes',
      type: 'text',
      rows: 2,
      readOnly: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Order Date',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'supabaseId',
      title: 'Supabase Order ID',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'items',
      title: 'Customized Garment Items',
      type: 'array',
      readOnly: true,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'orderItem',
          title: 'Garment Item',
          readOnly: true,
          fields: [
            defineField({ name: 'productName', title: 'Product Name', type: 'string', readOnly: true }),
            defineField({ name: 'quantity', title: 'Quantity', type: 'number', readOnly: true }),
            defineField({ name: 'unitPrice', title: 'Unit Price (₹)', type: 'number', readOnly: true }),
            defineField({ name: 'totalPrice', title: 'Total Price (₹)', type: 'number', readOnly: true }),
            defineField({ name: 'shirtColor', title: 'Body Color', type: 'string', readOnly: true }),
            defineField({ name: 'collarColor', title: 'Collar Color', type: 'string', readOnly: true }),
            defineField({ name: 'fabric', title: 'Fabric Type', type: 'string', readOnly: true }),
            defineField({ name: 'previewUrl', title: 'Design Preview URL', type: 'url', readOnly: true }),
          ],
          preview: {
            select: {
              title: 'productName',
              subtitle: 'fabric',
              qty: 'quantity',
              price: 'totalPrice',
            },
            prepare({ title, subtitle, qty, price }) {
              return {
                title: `${title || 'Custom Apparel'} (Qty: ${qty || 1})`,
                subtitle: `${subtitle ? `${subtitle} • ` : ''}₹${price || 0}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      customer: 'customerName',
      status: 'status',
      amount: 'totalAmount',
    },
    prepare({ orderNumber, customer, status, amount }) {
      const statusIcons: Record<string, string> = {
        pending: '🟡',
        confirmed: '🔵',
        in_production: '🟣',
        dispatched: '🟠',
        delivered: '🟢',
        cancelled: '🔴',
      }
      const icon = statusIcons[status || 'pending'] || '⚪'
      return {
        title: `${icon} ${orderNumber || 'Order'} - ${customer || 'Guest'}`,
        subtitle: `Status: ${(status || 'pending').toUpperCase()} • ₹${amount || 0}`,
      }
    },
  },
})
