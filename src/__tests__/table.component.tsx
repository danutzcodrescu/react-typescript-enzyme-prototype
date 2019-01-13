import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TableComponent } from '../components/table.component';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom';

const testData = {
  id: '94659',
  color: 'blue',
  framework: 'react'
};

describe('Components: Table component', () => {
  let wrapper: ShallowWrapper;
  const mockRowClick = jest.fn(id => 'test');
  beforeEach(() => {
    wrapper = shallow(
      <TableComponent
        tableProps={['color', 'framework']}
        data={[testData]}
        page={1}
        count={10}
        rowsPerPage={10}
        onChangePage={() => 'test'}
        pathForDetails="/frameworks"
      />
    );
  });

  it('should display a table', async () => {
    expect(wrapper.find(Table)).toHaveLength(1);
    expect(wrapper.find(TableHead)).toHaveLength(1);
    expect(
      wrapper
        .find(TableHead)
        .dive()
        .find(TableRow)
    ).toHaveLength(1);
    expect(
      wrapper
        .find(TableHead)
        .dive()
        .find(TableCell)
    ).toHaveLength(Object.keys(testData).length - 1);
    expect(wrapper.find(TableBody)).toHaveLength(1);
    expect(
      wrapper
        .find(TableBody)
        .dive()
        .find(TableRow)
    ).toHaveLength(1);
    expect(
      wrapper
        .find(TableBody)
        .dive()
        .find(TableCell)
    ).toHaveLength(Object.keys(testData).length);
    expect(wrapper.find(TablePagination)).toHaveLength(1);
  });

  it('should display the Link to view', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Link).prop('to')).toEqual('/frameworks' + testData.id);
  });

  it('should display the Link to view', () => {
    wrapper.setProps({ pathForDetails: undefined, onRowClick: mockRowClick });
    expect(wrapper.find(Link)).toHaveLength(0);
    expect(
      wrapper
        .find(TableBody)
        .dive()
        .find(TableCell)
    ).toHaveLength(2);
    wrapper
      .find(TableBody)
      .dive()
      .find(TableRow)
      .simulate('click');
    expect(mockRowClick).toHaveBeenCalledWith(testData.id);
  });
});
