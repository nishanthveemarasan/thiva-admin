import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home Page',
    to: '/home-page',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Profile',
    to: '/my-profile',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Experience And Education',
    to: '/my/experience',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Services',
    to: '/my/services',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  
  {
    component: CNavItem,
    name: 'My Projects',
    to: '/my-projects',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Testimonials',
    to: '/my-testimonials',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  
]

export default _nav
