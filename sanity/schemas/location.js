export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    {
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'mapUrl',
      title: 'Google Maps Embed URL',
      type: 'url'
    },
    {
      name: 'locationName',
      title: 'Location Name',
      type: 'string'
    },
    {
      name: 'fullAddress',
      title: 'Full Address',
      type: 'text',
      rows: 2
    },
    {
      name: 'directionsUrl',
      title: 'Directions URL',
      type: 'url'
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'string'
        }
      ]
    }
  ]
}
