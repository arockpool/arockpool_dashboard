import Vue from 'vue'

import {
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Collapse,
  CollapseItem,
  Pagination,
  Select,
  Option,
  Popover,
  Carousel,
  CarouselItem,
} from 'element-ui'

export default () => {
  Vue.use(Input)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Pagination)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Popover)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
}
