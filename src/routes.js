import React from 'react'
const WHeader = React.lazy(() => import('./containers/home/Header'))
const WAboutMe = React.lazy(() => import('./containers/home/AboutMe'))
const WExperience = React.lazy(() => import('./containers/home/Experience'))
const WCreateService = React.lazy(() => import('./containers/services/CreateService'))
const WMyServiceList = React.lazy(() => import('./containers/services/MyServiceList'))
const WMyProjectList = React.lazy(() => import('./containers/home/Projects/MyProjectList'))
const WCreateProject = React.lazy(() => import('./containers/home/Projects/CreateProject'))
const WTestimonialList = React.lazy(() => import('./containers/Testimonial/TestimonialList'))
const WCraeteTestimonial = React.lazy(() => import('./containers/Testimonial/CreateTestmonial'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home-page', name: 'Home Page', element: WHeader },
  { path: '/my-profile', name: 'My Profile', element:WAboutMe},
  { path: '/my/experience', name: 'Experience And Education', element:WExperience},
  { path: '/my/services', name: 'My Services', element:WMyServiceList},
  { path: '/services/create', name: 'Create Service', element: WCreateService },
  { path: '/services/update/:uuid', name: 'Update Service', element: WCreateService },
  { path: '/about/experience', name: 'Experience And Education', element: WExperience },
  { path: '/my-projects', name: 'My Projects', element: WMyProjectList },
  { path: '/my-testimonials', name: 'My Projects', element: WTestimonialList },
  { path: '/testimonials/create', name: 'Create Testimonial', element: WCraeteTestimonial },
  { path: '/testimonials/update/:uuid', name: 'Update Testimonial', element: WCraeteTestimonial },
  { path: '/projects/create', name: 'Create Project', element: WCreateProject },
  { path: '/projects/update/:uuid', name: 'Update Project', element: WCreateProject },
]

export default routes
