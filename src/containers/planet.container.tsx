import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../models/planet.model';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ErrorComponent } from '../components/error.component';
import * as vars from '../config/variables.json';

interface Props extends RouteComponentProps<{ id: string }> {}

interface State {
  loading: boolean;
  error: boolean;
  planet: Planet | null;
}

export class PlanetContainer extends React.Component<Props, State> {
  state: State = {
    loading: true,
    error: false,
    planet: null
  };

  private _displayedProps = [
    'diameter',
    'rotation_period',
    'orbital_period',
    'gravity',
    'population',
    'climate',
    'terrain',
    'surface_water'
  ];
  async componentDidMount() {
    try {
      const result = await PlanetService.getPlanet(this.props.match.params.id);
      this.setState({
        loading: false,
        planet: result
      });
    } catch {
      this.setState({ error: true });
    }
  }
  render() {
    const { loading, error, planet } = this.state;
    if (error) {
      return <ErrorComponent message={vars.apiErrorMessage} />;
    }
    if (loading) {
      return <CircularProgress />;
    }
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.history.push('/')}
          style={{ marginBottom: '10px' }}
        >
          Back to table
        </Button>
        <Card style={{ padding: '10px' }}>
          <Typography variant="h1">{planet!.name}</Typography>
          {this._displayedProps.map(key => (
            <>
              <Typography component="p">
                {key}:{' '}
                {typeof planet![key] === 'number'
                  ? planet![key].toLocaleString()
                  : planet![key]}
              </Typography>
              <br />
            </>
          ))}
          <Typography>
            Created: {planet!.created.toLocaleDateString()}
          </Typography>
          <br />
          <Typography>Edited: {planet!.edited.toLocaleDateString()}</Typography>
          <br />
        </Card>
      </div>
    );
  }
}