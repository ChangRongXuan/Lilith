import { utils } from '@mirrormedia/lilith-core'
import { list } from '@keystone-6/core';
import { relationship, checkbox, select, text, integer } from '@keystone-6/core/fields';

const {
  allowRoles,
  admin,
  moderator,
  editor,
  owner,
} = utils.accessControl

const listConfigurations = list({
  fields: {
    name: text({
      label: '名稱', validation: { isRequired: true }
    }),
    slug: text({
      label: 'slug',
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    order: integer({ 
      label: '排序', 
      validation: {
        min: 1,
        max: 9999,
      },
    }),
    state: select({
      options: [
        { label: 'active', value: 'active' },
        { label: 'inactive', value: 'inactive' },
      ],
      validation: { isRequired: true },
      ui: { displayMode: 'segmented-control' },
    }),
    heroImage: relationship({
      label: 'Banner圖片',
      ref: 'Photo',
    }),
    sections: relationship({
      ref: "Section.categories",
      many: false,
    }),
    posts: relationship({
      ref: "Post.categories",
      many: true,
      ui: {
        createView: { fieldMode: 'hidden'},
        itemView: { fieldMode: 'hidden' },
      }
    }),

  },
  access: {
    operation: {
      query: allowRoles(admin, moderator, editor),
      update: allowRoles(admin, moderator),
      create: allowRoles(admin, moderator),
      delete: allowRoles(admin),
    },
  },
})
export default utils.addTrackingFields(listConfigurations)