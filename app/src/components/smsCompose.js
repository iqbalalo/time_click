import React from "react";

class SmsCompose extends React.Component {
    state = {
    };

    smsSend = () => {
      alert("Not implemented yet!");
    };

    render() {
        return (
            <div style={{padding: "5em", width:"100%", height:"100%", position:"absolute", top:0, bottom:0, left:0, right:0, background:"#ffffff50"}}>
                <div className="p-5 d-flex flex-column start" style={{width: "50%", margin:"0 auto", borderRadius:6, background:"#fff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <div>
                        <h5>SMS</h5>
                    </div>
                    <div className="d-flex flex-column start" style={{marginTop:"1em"}}>
                    <input type="text" className="form-control" placeholder="Phone" defaultValue={this.props.user.phone}/>
                    <textarea name="message" className="form-control" placeholder="Type your message" rows="6" style={{marginTop: ".5em"}} value={this.state.message}/>
                    </div>
                    <div style={{marginTop:"1em", textAlign: "left"}}>
                    <button className="btn btn-success" onClick={this.smsSend}>Send</button>
                    <button className="btn btn-light" style={{marginLeft:".5em"}} onClick={()=>this.props.smsClick(false, this.props.user)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SmsCompose;
