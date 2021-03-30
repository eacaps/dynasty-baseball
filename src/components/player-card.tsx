import React from "react"
import { PlayerInfo } from "../stores/roster-store";
import styled from 'styled-components';

export interface PlayerCardProps {
    player: PlayerInfo;
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

export default class NameForm extends React.Component<PlayerCardProps,PlayerCardState> {
    constructor(props) {
      super(props);
      const value = props.player.keeperInfo?.keeperYears || '';
      this.state = {value};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }

  
    render() {
        const {player} = this.props;
      return (
          <Container>
              <Name>{player.name}</Name>
              <AcqDate>{player.keeperInfo? new Date(player.keeperInfo.acquisitionDate).toDateString() : ''}</AcqDate>
         <Input type="text" value={this.state.value} onChange={this.handleChange} />
          </Container>
      );
    }
  }