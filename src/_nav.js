import {
  cilBell, cilBorderAll, cilCalculator, cilCaretBottom, cilChartPie,
  cilCursor,
  cilDrop, cilHome, cilNotes,
  cilPencil, cilPlus, cilPuzzle,
  cilSpeedometer,
  cilStar
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavGroup,
    name: 'Home Page',
    // to: '/homepage',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All HomePage',
        to: '/homepage/all',
        icon: <CIcon icon={cilBorderAll} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Add HomePage',
        to: '/homepage/add',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Delete HomePage',
      //   to: '/homepage/delete',
      //   icon: <CIcon icon={cilDelete} customClassName="nav-icon" />,
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Category',
    icon: <CIcon icon={cilCaretBottom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Category',
        to: '/category/all',
        icon: <CIcon icon={cilBorderAll} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Add Category',
        to: '/category/add',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Album',
    icon: <CIcon icon={cilCaretBottom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Album',
        to: '/album/all',
        icon: <CIcon icon={cilBorderAll} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Add Album',
        to: '/album/add',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Images',
    icon: <CIcon icon={cilCaretBottom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Images',
        to: '/images/all',
        icon: <CIcon icon={cilBorderAll} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Add Images',
        to: '/images/add',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'About Me',
    icon: <CIcon icon={cilCaretBottom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All About Me',
        to: '/aboutme/all',
        icon: <CIcon icon={cilBorderAll} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Add About Me',
        to: '/aboutme/add',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Contact Us',
    icon: <CIcon icon={cilCaretBottom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Contact Data',
        to: '/contact/all',
        icon: <CIcon icon={cilBorderAll} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Clients',
    icon: <CIcon icon={cilCaretBottom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Clients',
        to: '/clients/all',
        icon: <CIcon icon={cilBorderAll} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Add Client',
        to: '/clients/add',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
 
]

export default _nav
