import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Planet } from '../models/planet.model';
import { PlanetService } from '../services/planet.service';
import { TableComponent } from '../components/table.component';
import { RouteComponentProps, withRouter } from 'react-router';
import { ErrorComponent } from '../components/error.component';
import * as vars from '../config/variables.json';
import { LoadingComponent } from '../components/loading.component';

interface State {
  planets: Planet[];
  loading: boolean;
  error: boolean;
  count: number;
  page: number;
}

interface Props extends RouteComponentProps {}

export class PlanetsContainer extends React.Component<Props, State> {
  state: State = {
    count: 0,
    planets: [],
    loading: true,
    error: false,
    page: 1
  };

  private _tableProps = ['name', 'climate', 'gravity', 'terrain', 'population'];
  async componentDidMount() {
    this.getPlanets();
  }

  changePage = (page: number) => {
    this.getPlanets(page + 1);
  };

  rowClick = (id: string) => {
    this.props.history.push(`/planets/${id}`);
  };

  async getPlanets(page = 1) {
    try {
      const result = await PlanetService.getPlanets(page);
      this.setState({
        planets: result.planets,
        loading: false,
        count: result.count,
        page
      });
    } catch {
      this.setState({ error: true });
    }
  }
  render() {
    const { loading, error, planets, count, page } = this.state;
    if (error) {
      return <ErrorComponent message={vars.apiErrorMessage} />;
    }
    if (loading) {
      return <LoadingComponent />;
    }
    return (
      <Paper>
        <h1>Planets</h1>
        <TableComponent
          tableProps={this._tableProps}
          data={planets}
          count={count}
          page={page}
          onChangePage={this.changePage}
          pathForDetails="/planets/"
        />
      </Paper>
    );
  }
}

export const Planets = withRouter(PlanetsContainer);

export default PlanetsContainer;
