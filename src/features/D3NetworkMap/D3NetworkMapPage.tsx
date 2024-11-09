import { useLayoutEffect, useRef } from 'react';
import { select as d3select, path as d3path } from 'd3';

export default function D3NetworkMapPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    mapRef.current!.innerHTML = '';

    const svg = d3select(mapRef.current)
      .append('svg')
      .attr('width', 1200)
      .attr('height', 800);

    const path = d3path();
    path.moveTo(600, 50);
    path.lineTo(1200, 800);
    path.moveTo(600, 50);
    path.lineTo(0, 800);

    // Append the path to the SVG
    svg
      .append('path')
      .attr('d', path.toString())
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

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
