export default {
  name: 'timeline',
  title: 'Timeline Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date (e.g., April 2025)',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string'
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string'
    },
    {
      name: 'order',
      title: 'Order (for sorting)',
      type: 'number',
      initialValue: 0
    }
  ]
}
