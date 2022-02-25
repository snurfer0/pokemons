import React from 'react'

const Loading = () => {
  return (
		<div className='load-wrap'>
			<div className='load'>
				<div className='ring'>
					<div className='ball-holder'>
						<div className='ball'></div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default Loading