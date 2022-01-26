import React from 'react'
import './key.scss'

export const Key = ({children, displayValue, type, ...rest}) => {
	return (
		<div className={`key ${type}`} {...rest}>
			<span>{children}</span>
		</div>
	)
}