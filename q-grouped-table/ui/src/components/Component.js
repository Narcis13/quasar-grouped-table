import { QBadge } from 'quasar'

export default {
  name: 'QGroupedTable',

  render (h) {
    return h(QBadge, {
      staticClass: 'QGroupedTable',
      props: {
        label: 'QGroupedTable'
      }
    })
  }
}
