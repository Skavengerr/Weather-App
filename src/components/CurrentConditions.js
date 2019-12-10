import React, { Component } from "react";
import { Segment, Header, Statistic, Grid, List } from "semantic-ui-react";

export default class CurrentConditions extends Component {
  render() {
    const { currentConditions, location, isCelsius } = this.props;
    return (
      <Segment className="current__container">
        <Grid columns="equal" stackable>
          <Grid.Row stretched>
            <Grid.Column>
              <Header size="large">{location}</Header>
              <List>
                <List.Item>Today</List.Item>
                <List.Item>{currentConditions.condition.text}</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>
                  {currentConditions.condition.temperature}
                  {isCelsius ? <span>&#8451;</span> : <span>&#8457;</span>}
                </Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  Visibility: {currentConditions.atmosphere.visibility}miles
                </List.Item>
                <List.Item>
                  Humidity: {currentConditions.atmosphere.humidity}%
                </List.Item>
                <List.Item>Wind: {currentConditions.wind.speed}mph</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  Sunrise: {currentConditions.astronomy.sunrise}
                </List.Item>
                <List.Item>
                  Sunset: {currentConditions.astronomy.sunset}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
