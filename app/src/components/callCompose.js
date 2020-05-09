import React from "react";

class CallCompose extends React.Component {
    state = {
    };

    initiateCall = () => {
      alert("Not implemented yet!");
    };

    render() {
        return (
            <div style={{padding: "5em", width:"100%", height:"100%", position:"absolute", top:0, bottom:0, left:0, right:0, background:"#ffffff50"}}>
                <div className="p-5 d-flex flex-column start" style={{width: "50%", margin:"0 auto", borderRadius:6, background:"#fff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <div>
                        <h5>Phone Call</h5>
                    </div>
                    <div className="d-flex flex-column start" style={{marginTop:"1em"}}>
                        <h3>{this.props.user.phone}</h3>
                        <button className="btn btn-info">{this.props.user.first_name} {this.props.user.last_name}</button>
                    </div>
                    <div style={{marginTop:"5em", textAlign: "center"}}>
                    <button className="btn btn-success" onClick={this.initiateCall}>Call</button>
                    <button className="btn btn-danger" style={{marginLeft:".5em"}} onClick={this.initiateCall}>Record</button>
                    <button className="btn btn-light" style={{marginLeft:".5em"}} onClick={()=>this.props.phoneClick(false, this.props.user)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CallCompose;
