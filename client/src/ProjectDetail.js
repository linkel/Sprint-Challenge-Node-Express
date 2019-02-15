import React from 'react';
import axios from 'axios';

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project : null
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:4000/api/projects/${this.props.match.params.id}`)
        .then(response => {
          console.log(response.data)
          this.setState({project: response.data})})
        .catch(err => console.log(err))
    }
    render () { 
        return (
            <div className='project-item'>
                {this.state.project ?  <div><h1>{this.state.project.name}</h1>
                <h2>Description: {this.state.project.description}</h2>
                {this.state.project.actions.map(action =>
                    <div className="action"><h3>{action.description}</h3><p>{action.notes}</p></div>
                )}</div> : <div></div>}
            </div>
        )
    }
}

export default ProjectDetail;