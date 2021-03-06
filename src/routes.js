import React from 'react'
import HomePageAdded from './components/HomePage/HomePageAdded'
import HomePageAll from './components/HomePage/HomePageAll'
import HomePageEdit from './components/HomePage/HomePageEdit'
import HomePageDetails from './components/HomePage/HomePageDetails'
import CategoryAdded from './components/Category/CategoryAdded'
import CategoryAll from './components/Category/CategoryAll'
import CategoryEdit from './components/Category/CategoryEdit'
import CategoryDetails from './components/Category/CategoryDetails'
import AlbumAdded from './components/Album/AlbumAdded'
import AlbumAll from './components/Album/AlbumAll'
import AlbumEdit from './components/Album/AlbumEdit'
import AlbumDetails from './components/Album/AlbumDetails'
import ContactAll from './components/Contact/ContactAll'
import ContactDetails from './components/Contact/ContactDetails'
import AboutmeAdded from './components/AboutMe/AboutmeAdded'
import AboutmeAll from './components/AboutMe/AboumeAll'
import AboutmeEdit from './components/AboutMe/AboutmeEdit'
import AboutmeDetails from './components/AboutMe/AboutmeDetails'
import ClientAdded from './components/Clients/ClientAdded'
import ClientAll from './components/Clients/ClientAll'
import ClientEdit from './components/Clients/ClientEdit'
import ClientDetails from './components/Clients/ClientDetails'
import ImagesAll from './components/Images/ImagesAll'
import ImageDetails from './components/Images/ImageDetails'
import ImageAdded from './components/Images/ImageAdded'
import ImageEdit from './components/Images/ImageEdit'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  //homepage route
  { path: '/homepage/add', name: 'Homepage Add', element: HomePageAdded },
  { path: '/homepage/all', name: 'Homepage All', element: HomePageAll },
  { path: '/homepage/edit/:id', name: 'Homepage Edit', element: HomePageEdit },
  { path: '/homepage/details/:id', name: 'Details Data', element: HomePageDetails },
  //category route
  { path: '/category/add', name: 'Category Add', element: CategoryAdded },
  { path: '/category/all', name: 'Category All', element: CategoryAll },
  { path: '/category/edit/:id', name: 'Category Edit', element: CategoryEdit },
  { path: '/category/details/:id', name: 'Details Data', element: CategoryDetails },
  //album route
  { path: '/album/add', name: 'Album Add', element: AlbumAdded },
  { path: '/album/all', name: 'Album All', element: AlbumAll },
  { path: '/album/edit/:id', name: 'Album Edit', element: AlbumEdit },
  { path: '/album/details/:id', name: 'Details Data', element: AlbumDetails },
  //contact us route
  { path: '/contact/all', name: 'Contact All', element: ContactAll },
  { path: '/contact/details/:id', name: 'Details Data', element: ContactDetails },
  //aboutme route
  { path: '/aboutme/add', name: 'About Me Add', element: AboutmeAdded },
  { path: '/aboutme/all', name: 'About Me All', element: AboutmeAll },
  { path: '/aboutme/edit/:id', name: 'About Me Edit', element: AboutmeEdit },
  { path: '/aboutme/details/:id', name: 'Details Data', element: AboutmeDetails },
  //clients route
  { path: '/clients/add', name: 'Clients Add', element: ClientAdded },
  { path: '/clients/all', name: 'Clients All', element: ClientAll },
  { path: '/clients/edit/:id', name: 'Clients Edit', element: ClientEdit },
  { path: '/clients/details/:id', name: 'Details Data', element: ClientDetails },
  //images route
  { path: '/images/add', name: 'Images Add', element: ImageAdded },
  { path: '/images/all', name: 'Images All', element: ImagesAll },
  { path: '/images/edit/:id', name: 'Images Edit', element: ImageEdit },
  { path: '/images/details/:id', name: 'Details Data', element: ImageDetails },


  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
