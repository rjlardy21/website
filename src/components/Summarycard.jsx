import React, {Component} from 'react'

class SummaryCard extends Component {
  render() {
    return (
      <div className="summarycard">
        <div className="compdet">
          <h3>{this.props.title}</h3>
          <h3
            className="secondtext">{this.props.company} | {this.props.from} - {this.props.to} | {this.props.city}, {this.props.state}</h3>
          <h4 className="summarytext">{this.props.summary}.</h4>
        </div>
      </div>
    )
  }
}

export default SummaryCard
