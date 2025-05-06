export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string'
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    },
    {
      name: 'order',
      title: 'Order (for sorting)',
      type: 'number',
      initialValue: 0
    }
  ]
}
