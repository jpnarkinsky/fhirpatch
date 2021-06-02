const Operation = require('./operation');

describe('Operation', function() {
  it('should be possible to apply a boolean replace', function() {
    const op = new Operation({
      type: 'replace',
      path: `Organization.active`,
      value: true,
      valueType: 'valueBoolean',
    });

    result = op.apply({
      active: false,
      resourceType: 'Organization',
      name: 'Test',
    });

    expect(result).to.eql({
      active: true,
      resourceType: 'Organization',
      name: 'Test',
    });
  });

  it('Should be possible to create a delete operation with the API and render it to JSON', function() {
    operation = new Operation({
      type: 'delete',
      path: 'Practitioner.telecom.where(value="6564664444")',
    });

    expect(operation.toJSON()).to.eql({
      name: 'operation',
      parameter: [
        {name: 'type', valueCode: 'delete'},
        {
          name: 'path',
          valueString: 'Practitioner.telecom.where(value="6564664444")',
        },
      ],
    });
  });

  it('Should be possible to create an insert operation with the API and render it to JSON', function() {
    operation = new Operation({
      type: 'insert',
      value: {
        system: 'phone',
        value: '7577467896',
      },
      valueType: 'valueContactPoint',
      path: 'Practitioner.telecom',
      index: 0,
    });

    expect(operation.toJSON()).to.eql({
      name: 'operation',
      parameter: [
        {name: 'type', valueCode: 'insert'},
        {name: 'path', valueString: 'Practitioner.telecom'},
        {
          name: 'value',
          valueContactPoint: {
            system: 'phone',
            value: '7577467896',

          },
        },
        {name: 'index', valueInteger: 0},
      ],
    });
  });

  it('should be possible to delete using a where clause @operation.4', async function() {
    const op = new Operation({
      path: `Organization.alias.where($this = 'foo')`,
      type: 'delete',
    });

    result = op.apply({
      resourceType: 'Organization',
      alias: ['foo'],
      name: 'bar',
    });

    expect(result).to.eql({
      resourceType: 'Organization',
      name: 'bar',
      alias: [],
    });
  });

  it('should correctly parse the tail on a path with a where claus @operation.5', async function() {
    const op = new Operation({
      path: `Organization.alias.where($this = 'foo')`,
      type: 'delete',
    });
    expect(op.tail.path).not.to.be.undefined;
  });
});
