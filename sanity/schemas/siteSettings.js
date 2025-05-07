export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2
        },
        {
          name: 'instagram',
          title: 'Instagram Handle',
          type: 'string'
        },
        {
          name: 'instagramUrl',
          title: 'Instagram URL',
          type: 'url'
        }
      ]
    },
    {
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string'
        },
        {
          name: 'menuItems',
          title: 'Menu Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string'
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string'
                },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string'
        },
        {
          name: 'socialMedia',
          title: 'Social Media',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string'
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url'
                },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string'
                }
              ]
            }
          ]
        },
        {
          name: 'quickLinks',
          title: 'Quick Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string'
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
