import React from 'react';

const Projects = props => {
    const routeToProj = (e, item) => {
        e.preventDefault();
        props.history.push(`/${item.id}`);
      }
    return (
        <div className='projects'><h1>Here are some sweet projects you gotta do some work on.</h1>

        {props.projects.map(project => <div className="project" onClick={e => routeToProj(e, project)} key={project.id}>
            <h2>{project.name}</h2>
             <p>{project.description}</p>
            </div>)}
        </div>
    )
}

export default Projects