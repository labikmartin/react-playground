export const data = {
  nodes: [
    {
      id: '1',
      name: 'Router',
      type: 'router',
      x: 100,
      y: 100,
      connections: [
        { to: '2', type: 'ethernet', status: 'active' },
        { to: '3', type: 'ethernet', status: 'active' },
      ],
    },
    {
      id: '2',
      name: 'Switch 1',
      type: 'switch',
      x: 200,
      y: 200,
      connections: [{ to: '4', type: 'ethernet', status: 'inactive' }],
    },
    {
      id: '3',
      name: 'Switch 2',
      type: 'switch',
      x: 300,
      y: 200,
      connections: [
        { to: '5', type: 'ethernet', status: 'active' },
        { to: '6', type: 'wifi', status: 'active' },
      ],
    },
    {
      id: '4',
      name: 'Server A',
      type: 'server',
      x: 200,
      y: 300,
      connections: [],
    },
    {
      id: '5',
      name: 'Server B',
      type: 'server',
      x: 300,
      y: 300,
      connections: [],
    },
    {
      id: '6',
      name: 'Client Device',
      type: 'client',
      x: 400,
      y: 100,
      connections: [],
    },
  ],
};
