'use strict';

const { BasicTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const {
  diag,
  trace,
  context,
  DiagConsoleLogger,
  DiagLogLevel,
} = require('@opentelemetry/api');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { NodeSDK } = require('@opentelemetry/sdk-node')

const asyncFun = async () => {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)
  
  const traceExporter = new OTLPTraceExporter()
  
  const sdk = new NodeSDK({
    traceExporter,
    spanProcessor: new SimpleSpanProcessor(traceExporter),
  });
  
  await sdk
    .start()
  
  const tracer = trace.getTracer('example-otlp-exporter-node');

  function doWork(parent) {
    // Start another span. In this example, the main method already started a
    // span, so that'll be the parent span, and this will be a child span.
    const ctx = trace.setSpan(context.active(), parent);
    const span = tracer.startSpan('doWork', undefined, ctx);
  
    // simulate some random work.
    for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
      // empty
    }
    // Set attributes to the span.
    span.setAttribute('key', 'value');
  
    span.setAttribute('mapAndArrayValue', [
      0, 1, 2.25, 'otel', {
        foo: 'bar',
        baz: 'json',
        array: [1, 2, 'boom'],
      },
    ]);
  
    // Annotate our span to capture metadata about our operation
    span.addEvent('invoking doWork');
  
    // end span
    span.end();
  }

  
  // Create a span. A span must be closed.
  const parentSpan = tracer.startSpan('main');
  for (let i = 0; i < 10; i += 1) {
    doWork(parentSpan);
  }
  // Be sure to end the span.
  parentSpan.end();
  
  setTimeout(() => {
    // flush and close the connection.
    sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.error('Error terminating tracing', error))
    .finally(() => console.log('Shutting down...'))
   }, 2000);
}
asyncFun()
