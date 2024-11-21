import React from 'react'
import Page from './Page'

export const PagesList = ({ pages, onViewDetails }) => {
  return (
	<ul>
		{
			pages.map((page) => {
				return <Page key={page.id} page={page} onViewDetails={onViewDetails} />
			})
		}
	</ul>
  )
}

export default PagesList;