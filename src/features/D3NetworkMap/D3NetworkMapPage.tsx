import { useLayoutEffect, useRef } from 'react';
import { select as d3select, path as d3path, arc, type Selection } from 'd3';
import { data } from './D3NetworkMap.data';

function paintPath(
  svg: Selection<SVGSVGElement, unknown, null, undefined>,
  path: string,
  color: string,
  extraAttributes?: [string, string][]
) {
  const paintedSVG = svg
    .append('path')
    .attr('d', path)
    .attr('stroke', color)
    .attr('stroke-width', 2)
    .attr('fill', color);

  extraAttributes?.forEach(([attributeName, attributeValue]) =>
    paintedSVG.attr(attributeName, attributeValue)
  );
}

export default function D3NetworkMapPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    mapRef.current!.innerHTML = '';

    const svg = d3select(mapRef.current)
      .append('svg')
      .attr('width', 1200)
      .attr('height', 800);

    const path = d3path();

    /*
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
    */

    const nodes = data.nodes;

    nodes.forEach((node) => {
      path.moveTo(node.x, node.y);

      if (node.type === 'server') {
        const path = d3path();

        path.rect(node.x - 20, node.y - 20, 40, 40);

        paintPath(svg, path.toString(), 'green');
      }

      if (node.type === 'router') {
        const circlePath = arc();

        circlePath
          .innerRadius(0)
          .outerRadius(20)
          .startAngle(0)
          .endAngle(2 * Math.PI);

        paintPath(svg, circlePath as unknown as string, 'red', [
          ['transform', `translate(${node.x}, ${node.y})`],
        ]);
      }

      if (node.type === 'switch') {
        const path = d3path();

        path.rect(node.x - 20, node.y - 10, 40, 20);

        paintPath(svg, path.toString(), 'orange');
      }

      if (node.type === 'client') {
        const path = d3path();

        path.moveTo(node.x, node.y - 20);
        path.lineTo(node.x + 20, node.y + 10);
        path.lineTo(node.x - 20, node.y + 10);
        path.closePath();

        paintPath(svg, path.toString(), 'purple');
      }

      node.connections.forEach((connection) => {
        const connectionNode = nodes.find((node) => node.id == connection.to);

        if (connectionNode) {
          path.moveTo(node.x, node.y);
          path.lineTo(connectionNode.x, connectionNode.y);
        }
      });
    });

    // Append the path to the SVG
    svg
      .append('path')
      .attr('d', path.toString())
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .lower();

    window.scrollTo({
      top: window.scrollTo({ top: document.body.scrollHeight })!,
    });
  }, []);

  return (
    <div>
      <h1>D3 Network Map</h1>
      <p>This is the D3 Network Map page.</p>
      <div ref={mapRef} />
    </div>
  );
}
