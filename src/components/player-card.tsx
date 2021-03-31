import React from "react"
import { PlayerInfo } from "../stores/roster-store";
import styled from 'styled-components';

export interface PlayerCardProps {
    player: PlayerInfo;
    editable?:boolean;
    onUpdate?: ()=>void;
}

export interface PlayerCardState {
    value: string;
}

const Container = styled.div`
  display:flex;
`;

const Name = styled.div`
  width: 10rem;
  height: 2rem;
  color: #a51d49;
  display: flex;
  align-items: flex-end;
`;

const Input = styled.input`
width:2rem;
`;

const AcqDate = styled.div`
  width: 10rem;
  height: 2rem;
  text-align: center;
  display: flex;
  align-items: flex-end;
`;

export default class PlayerCard extends React.Component<PlayerCardProps,PlayerCardState> {
    constructor(props) {
      super(props);
      const value = props.player.keeperInfo?.keeperYears || '';
      this.state = {value};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
        const value = event.target.value;
      this.setState({value});
      const {keeperInfo} = this.props.player;
      if(keeperInfo) {
        keeperInfo.keeperYears = value;
        this.props.player.keeperInfo = Object.assign({}, keeperInfo);
      } else {
        this.props.player.keeperInfo = {
          acquisitionDate: new Date().getTime(),
          acquisitionType: 'MAGIC',
          keeperYears: value
        }
      }
      this.props.onUpdate();
    }

  
    render() {
        const {player,editable} = this.props;
      return (
          <Container>
              <Name>{player.name}</Name>
              <AcqDate>{player.keeperInfo? new Date(player.keeperInfo.acquisitionDate).toLocaleDateString() : ''}</AcqDate>
                {editable ? <Input type="text" value={this.state.value} onChange={this.handleChange} /> : <div>{player.keeperInfo?.keeperYears}</div>}
          </Container>
      );
    }
  }